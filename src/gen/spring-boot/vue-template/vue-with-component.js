String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
import vueUtils from './utils.js';
function setctrl(payload,utils) {
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
    <!-- 테이블 컴포넌트 : 상세보기 모달과 수정 모달을 분리 -->
    <TableComponent :tableData="tableData" :pageUtils="getPageUtils()" :apiUrl="apiUrl"
      :selectItem="selectDetailItem" :setSortCondition="setSortCondition" :refreshTable="searchItems"
      :toggleCreateForm="toggleCreateForm" />

      <!-- 테이블 컴포넌트 : 상세보기 모달과 수정 모달을 통일 , 주석 해재 후 상세 컴포넌트 부분 주석하여 사용
      <TableComponent :tableData="tableData" :pageUtils="getPageUtils()" :apiUrl="apiUrl"
        :selectItem="selectUpdateItem" :setSortCondition="setSortCondition" :refreshTable="searchItems"
        :toggleCreateForm="toggleCreateForm" />
        -->
    <!-- 수정 컴포넌트-->
    <UpdateModal ref="updateModalComponent" :apiUrl="apiUrl" :resourceId="updateResourceId"  :onSuccess="searchItems" :onLoadItem="onLoadUpdateItem"/>
    <!-- 상세 컴포넌트-->
    <DetailModal ref="detailModalComponent" :apiUrl="apiUrl" :resourceId="detailResourceId" :selectUpdateItem="selectUpdateItem"  :onSuccess="searchItems" :onLoadItem="onLoadDetailItem"/>
    <!-- 생성 컴포넌트-->
    <CreateModal ref="createModalComponent" :apiUrl="apiUrl" :onSuccess="searchItems" />
  </div>
</template>

<script>
import {
  DetailModal,
  UpdateModal,
  CreateModal,
  TableComponent
} from './components'
import { besigMixin } from '../../Utils.js';
export default {
  mixins: [besigMixin],
  components: {
    DetailModal,
    UpdateModal,
    CreateModal,
    TableComponent
  },
  data() {
    return {
        searchOpen: false,
        updateResourceId: "",
        detailResourceId: "",
        tableData: [],
        apiUrl: '/api/${projectName}s',
        pageSize: 5,
        recordSize: 5,
        currentPage: 1,
        sortColumn: "",
        sortType:"ASC",
        recordSizeOption:[
          10,50,500, 1000, 2000, 3000, 10000
        ],
        //체크여부 저장 , 체크된 row 의 pk 구성 집합이 들어간다.
        checkedItems: [],
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
      this.searchItems();
  },
  methods: {
    /**
     * @description : 검색폼 노출 여부 toggle
     */
      toggleSearchOpen(){
        this.searchOpen=!this.searchOpen;
      },
      /**
      * @description : 생성폼 노출 여부 toggle
      */
      toggleCreateForm(){
        this.$refs.createModalComponent.clickModal();
      },
      /* @description : 상세보기 링크로 수정 오브젝트 세팅 및 모달 열기
      * @param {*} item : 리스트의 row data
      */
     selectUpdateItem: function (item) {
       console.log(this.$refs.updateModalComponent);
       this.$refs.updateModalComponent.clickModal();
       this.updateResourceId = item.${pkList[0]};
     },
      onLoadUpdateItem: function(){
      this.updateResourceId='';
     },
     /* @description : 상세보기 링크로 상세 오브젝트 세팅 및 모달 열기
     * @param {*} item : 리스트의 row data
     */
     selectDetailItem: function(item){
       this.$refs.detailModalComponent.clickModal();
       this.detailResourceId = item.${pkList[0]};
     },
      onLoadDetailItem: function(){
      this.detailResourceId='';
     },
      /**
       * @description : 정렬 필드 설정 클릭할때마다 오름차순 내림차순 바뀜 
       * @param {*} sortColumn : 정렬할 column , 같은거 누를시 오름차순/내림차순 토글
       */
      setSortCondition: function(sortColumn){
        if(this.sortColumn===sortColumn){
          this.sortType=(this.sortType==="ASC"?"DESC":"ASC");
        }else{
          this.sortColumn=sortColumn;
          this.sortType="ASC";
        }
      },


      //검색관련 Method~

      /**
       * @description : 검색 오브젝트 초기화
       */
      initSearchObj: function(){
        this.searchObj.value={
          ${payload.selectedSearchobj.map((item) => (
            `${vueUtils.toCamelCase(item.column_name)} : ""
            `
          ))}
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
        this.currentPage=this.pageInfo.startPage;
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

function etcCode(){
  return (
    `
    <!-- 위로 -->
    <div
      class="offcanvas offcanvas-top"
      tabindex="-1"
      id="offcanvasTop"
      aria-labelledby="offcanvasTopLabel"
    >
      <div class="offcanvas-header">
        <h2 class="offcanvas-title" id="offcanvasTopLabel">Top offcanvas</h2>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda
          ea est, eum exercitationem fugiat illum itaque laboriosam magni
          necessitatibus, nemo nisi numquam quae reiciendis repellat sit soluta
          unde. Aut!
        </div>
        <div class="mt-3">
          <button class="btn" type="button" data-bs-dismiss="offcanvas">
            Close offcanvas
          </button>
        </div>
      </div>
    </div>
    <!-- 밑으로 -->
    <div
      class="offcanvas offcanvas-bottom"
      tabindex="-1"
      id="offcanvasBottom"
      aria-labelledby="offcanvasBottomLabel"
    >
      <div class="offcanvas-header">
        <h2 class="offcanvas-title" id="offcanvasBottomLabel">
          Bottom offcanvas
        </h2>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda
          ea est, eum exercitationem fugiat illum itaque laboriosam magni
          necessitatibus, nemo nisi numquam quae reiciendis repellat sit soluta
          unde. Aut!
        </div>
        <div class="mt-3">
          <button class="btn" type="button" data-bs-dismiss="offcanvas">
            Close offcanvas
          </button>
        </div>
      </div>
    </div>
    <!-- ref 버튼 클릭 트리서를 이용하여 페이지 열기 -->
    <div style="display:none">
        <a data-bs-toggle="modal" data-bs-target="#getviewContentmodal" ref="getviewContent" style="display:none">상세보기용 모달</a>
        <a data-bs-toggle="offcanvas" href="#offcanvasEnd"   ref="getviewContentoffcanvas" aria-controls="offcanvasTop">상세보기용 offcanvas</a>
        <a data-bs-toggle="offcanvas" href="#offcanvasStart" ref="offcanvasStart" aria-controls="offcanvasStart" >생성 offcanvas</a>
    </div>
    <!-- 샘플모달 -->
    <div class="modal modal-blur fade" id="modal-simple" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae delectus deleniti dolorem eveniet facere fuga iste nemo nesciunt nihil odio perspiciatis, quia quis reprehenderit sit tempora totam unde.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    `
  )
}
export default { getCtrl: setctrl };
