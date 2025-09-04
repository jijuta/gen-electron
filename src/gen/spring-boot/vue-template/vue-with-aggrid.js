String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
import vueUtils from './utils.js';
function genAgGrid(payload,utils) {
  // console.log(utils);
  // console.log(payload);
  const pkList = payload.items.filter((item) => item.pk_flag === "Y").map((item) => vueUtils.toCamelCase(item.column_name));
  const projectName=vueUtils.toCamelCase(payload.tb.table_name);
  const tableName=payload.tb.table_comment;
  console.log(pkList);
  const vhtml=`
  <template>
  <div class="container mt-3">
    <div style="text-align: center; align-items: center; padding-left: 20px; padding-right: 20px;" class="d-flex justify-content-between mb-1">
      <h3 style="margin: 0;"></h3>
      <div class="btn-list justify-content-end ">
        <button v-on:click="startSearchItems()" type="submit" class="btn btn-info"
          style="height: 30px; padding: 0.1rem 0.5rem;">
          검색
        </button>
        <button v-on:click="toggleSearchOpen()" type="submit" class="btn btn-outline-info" id="openCloseBtn"
          style="height: 30px; padding: 0.1rem 0.5rem;">
          <span v-if="searchOpen == true">닫기</span>
          <span v-else>펼치기</span>
        </button>
        <button v-on:click="initSearchObj()" type="submit" class="btn btn-outline-info"
          style="height: 30px; padding: 0.1rem 0.5rem;">
          초기화
        </button>
      </div>
    </div>
    ${vueUtils.inputForm(payload,pkList,"search")}
    <!-- 테이블 컴포넌트 -->
    <AgGridComp :tableData="tableData" :pageUtils="getPageUtils()" :apiUrl="apiUrl"
      :setSortCondition="setSortCondition" :refreshTable="searchItems" :setTableLoading="setTableLoading"
      :isTableLoading="isTableLoading"  />
  </div>
</template>

<script>
import AgGridComp from './components/AgGridComponent.vue'
import { besigMixin } from '../../Utils.js';
export default {
  mixins: [besigMixin],
  components: {
    AgGridComp
  },
  props : {
    searchProps : Object
  },
  data() {
    return {
        isTableLoading: false,
        searchOpen: false,
        tableData: [],
        apiUrl: '/api/${projectName}s',
        pageSize: 5,
        recordSize: 5,
        currentPage: 1,
        sortColumn: "",
        sortType:"asc",
        recordSizeOption:[
          10,50,500, 1000, 2000, 3000, 10000
        ],
        //체크여부 저장 , 체크된 row 의 pk 구성 집합이 들어간다.
        pageInfo: {
          endPage: 6,
          existNextPage: false,
          existPrevPage: false,
          limitStart: 0,
          startPage: 1,
          totalPageCount: 6,
          totalRecordCount: 52
        },
        //
        searchObj:{
          value:{
              ${payload.selectedSearchobj.map((item) => (
              `${vueUtils.toCamelCase(item.column_name)} : ""
              `
              ))}
          }
        },
      }
    }
  
  ,
  mounted() {
      console.log("mounted tsud",this.searchProps)
      if (this.searchProps !== undefined) {
        this.searchObj.value=JSON.parse(JSON.stringify(this.searchProps.value))
      }
      this.searchItems();
  },
  methods: {
    setTableLoading(val) {
      this.isTableLoading = val
    },
    /**
     * @description : 검색폼 노출 여부 toggle
     */
      toggleSearchOpen(){
        this.searchOpen=!this.searchOpen;
      },
      /**
       * @description : 정렬 필드 설정 클릭할때마다 오름차순 내림차순 바뀜 
       * @param {*} sortColumn : 정렬할 column , 같은거 누를시 오름차순/내림차순 토글
       */
      setSortCondition: function(sortColumn){
        if(this.sortColumn===sortColumn){
          this.sortType=(this.sortType==="asc"?"desc":"asc");
        }else{
          this.sortColumn=sortColumn;
          this.sortType="asc";
        }
      },

      //검색관련 Method~

      /**
       * @description : 검색 오브젝트 초기화
       */
      initSearchObj: function(){
        this.searchObj.value={
          ${payload.selectedSearchobj.map((item) => (
`         ${vueUtils.toCamelCase(item.column_name)} : "",\n`
          )).join("")}
        };
        this.startSearchItems();
      },

      /**
       * @description : 검색 버튼을 눌러 검색 시작
       */
      startSearchItems: function(){
        if(this.currentPage===1){
          this.searchItems();
        }else{
          this.currentPage=1; // watch에서 currentPage의 변화를 감지후 아래 searchItems 호출
        }
      },
      /**
       * @description : 검색 폼에서 조작된 오브젝트로 생성 api 호출
       */
      searchItems: function () {
        const requestBody=this.searchObj.value;
        this.$axios.post(\`\${this.apiUrl}/search\`, requestBody,{
          params: {
            sortColumn:this.sortColumn,
            sortType:this.sortType,
            pageNum: this.currentPage,
            recordSize: this.recordSize,
            pageSize: this.pageSize
          }
        }).then((response) => {
            //result
            this.tableData = response.data.result
            //paging info
            this.pageInfo=response.data.pageInfo;
            console.log(response.data);
        }).catch(function (response) {
            console.log(response)
        });
      },
      //~end

      //페이징관련 method~
      /**
       * @description : 현재 페이지 변경 (watch 에서 변경될때 새로 api 호출)
       * @param {*} pageIdx : 설정할 현재 페이지
       */
      setPageNum(pageIdx) {
        this.currentPage = pageIdx;
        console.log("call select all api");
      },

      /**
       * @description : 뒤로 페이지 묶음 이동 (1,2,3,4,5) => (6,7,8,9,10)
       */
      prevPage: function () {
        this.pageInfo.endPage -= this.pageSize;
        this.pageInfo.startPage -= this.pageSize;
        this.currentPage = this.pageInfo.endPage
      },
      /**
       * @description : 앞으로 페이지 묶음 이동 (1,2,3,4,5) <= (6,7,8,9,10)
       */
      nextPage: function () {
        this.pageInfo.endPage += this.pageSize;
        this.pageInfo.startPage += this.pageSize;
        this.currentPage = this.pageInfo.startPage;
      },
      /**
       * @description : 해당 페이지가 현재 페이지(atcitve page)인지 return
       * @return : "active" , ""
       */
      isActivePage(pageIdx) {
        if (pageIdx == this.currentPage) {
          return "active";
        }
        return "";
      },
      setRecordSize: function (event) {
        this.setPageNum(1)
        this.recordSize = event.target.value
      },
      getPageUtils() {
        return {
          pageInfo: this.pageInfo,
          setPageNum: this.setPageNum,
          isActivePage: this.isActivePage,
          prevPage: this.prevPage,
          nextPage: this.nextPage,
          recordSizeOption: this.recordSizeOption,
          setRecordSize: this.setRecordSize
        }
      },
      //~end
  },
  computed: {
        
  },
  watch:{
    currentPage() {
      this.searchItems();
    },
    sortType(){
      this.searchItems();
    },
    recordSize(){
      this.searchItems();
    },
  },
}
</script>

<style>

.pagination {
margin-top: 10px;
float: right;
}
.${projectName}{

}
.cmp-list{

}
.cmp-update{

}
.cmp-create{
  
}
.cmp-search{
  
}
.cmp-update-form{

}
.cmp-create-form{
  
}
.cmp-search-form{
  
}
</style>
`
  return vhtml;
}
export default { genAgGrid: genAgGrid };
