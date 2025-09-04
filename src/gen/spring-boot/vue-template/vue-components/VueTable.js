String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
import vueUtils from '../utils.js';


function setctrl(payload,utils) {
 
  console.log(utils);
  console.log(payload);
  const pkList = payload.items.filter((item) => item.pk_flag === "Y").map((item) => vueUtils.toCamelCase(item.column_name));
  const projectName=vueUtils.toCamelCase(payload.tb.table_name);
  const tableName=payload.tb.table_comment;
  console.log(pkList);
  const vhtml=`
  <template>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title" style="width: 100%">
              ${tableName}
              <div style="float: right" class="btn-list justify-content-center">
              <!-- 체크박스 관련 함수들을 호출하게되는 버튼들 입니다 , 필요없는건 주석해재 해서 사용해주세요 -->
                <button v-on:click="callAPIWithCheckedItems('delete')" type="button" class="btn btn-outline-info" style="height: 30px; padding: 0.1rem 0.5rem;">
                  선택삭제
                </button>
                <button v-on:click="callAPIwithAllItems('delete')" type="button" class="btn btn-outline-info" style="height: 30px; padding: 0.1rem 0.5rem;">
                  전체삭제
                </button>                
                <button v-on:click="callAPIWithCheckedItems('toggle-using')" type="button" class="btn btn-outline-info" style="height: 30px; padding: 0.1rem 0.5rem;">
                  선택 사용여부 전환
                </button>
                <button v-on:click="callAPIwithAllItems('toggle-using')" type="button" class="btn btn-outline-info" style="height: 30px; padding: 0.1rem 0.5rem;">
                  전체 사용여부 전환
                </button>
                <button
                  v-on:click="toggleCreateForm()"
                  type="button"
                  class="btn btn-outline-success"
                  style="height: 30px; padding: 0.1rem 0.5rem;"
                >
                  생성
                </button>

<!--
                <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modal-simple">
                    Simple modal
                </a>
                
                <a
                  class="btn"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasTop"
                  role="button"
                  aria-controls="offcanvasTop"
                >
                  위로
                </a>
                <a
                  class="btn"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasBottom"
                  role="button"
                  aria-controls="offcanvasBottom"
                >
                  아래
                </a>
-->
              </div>
            </h4>
          </div>

          <div style="display: block; overflow-x: scroll; overflow-y: clip;">
              ${vueUtils.table(payload)}
          </div>
          <!--페이징-->
          <nav v-if='tableData.length > 0' aria-label="..." class="mx-auto">
          <ul class="pagination ">
            <!--노출하고싶은 페이지 개수만 노출 ex_) 총 30페이지 , 5개씩 노출 -> >>버튼 5번 누르기 -->
            <li class="page-item ">
              <a class="page-link" v-if="pageUtils.pageInfo.existPrevPage" v-on:click="pageUtils.prevPage()">&laquo;</a>
              <!-- <a class="page-link" v-else>&laquo;</a> -->
            </li>
            <li v-for="pi in Number(pageUtils.pageInfo.endPage - pageUtils.pageInfo.startPage + 1)" :key="pi"
              v-on:click="pageUtils.setPageNum(pageUtils.pageInfo.startPage + pi - 1)"
              :class="\`page-item \${pageUtils.isActivePage(pageUtils.pageInfo.startPage + pi - 1)}\`">
              <a class="page-link">{{ pageUtils.pageInfo.startPage + pi - 1 }}</a>
            </li>
            <li class="page-item">
              <a class="page-link" v-if="pageUtils.pageInfo.existNextPage" v-on:click="pageUtils.nextPage()">&raquo;</a>
              <!-- <a class="page-link" v-else>&raquo;</a> -->
            </li>
          </ul>
        </nav>
        <div v-else>
          <p
            style="text-align: center; height: 61px; line-height: 61px; font-size: 16px; font-weight: 600; margin-bottom: 0;">
            No result
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { besigMixin } from '../../../Utils.js';
import Sortsvg from '@/components/comp/Sortsvg.vue';
export default {
  mixins: [besigMixin],
  components: {
    Sortsvg,   
  },
  props: {
    pageUtils: Object,
    selectItem: Function,
    tableData: Array,
    apiUrl: String,
    setSortCondition: Function,
    refreshTable: Function,
    toggleCreateForm: Function,
  },
  data() {
      return {
        checkedItems: [],
      }
    },
    mounted() {
    },
    methods: {
        ${
          vueUtils.needFileUpload(payload.items)?(
          `
          hasFile(item){
            return item.fileSelector!==""&&item.fileSelector!=="NONE";
          },
          `
          ):(
          ``
          )
        }
        /**
         * @param {*} item 
         * @return item's primary key obj
         */
        getPKObj(item){
          return {
            ${
              payload.pkObjList.map(elem=>{
                var field=vueUtils.toCamelCase(elem.column_name);
                return( 
  `            ${field}:item.${field}              
  `)
              }).join(",")
            }
          }
        },
        /**
         * @description : 리스트의 row data 의 key 를 추출하여 삭제 api 호출
         * @param {*} item :  리스트의 row data
         */
        deleteItem: function (item) {
            if (confirm("삭제하시겠습니까?")) {
                const itemId = item.${pkList[0]};
                this.$axios.delete(this.apiUrl, {
                    params: {
                      ${pkList[0]}: itemId
                    }
                }).then((response) => {
                    console.log(response);
                    this.refreshTable();
                }).catch(function (response) {
                    console.log(response)
                });
            } else {
                return;
            }
        },
        /**
          * @description : 페이지에 보이는 모든 데이터 (this.tableData 에 있는 데이터)를 가지고 action 수행
          * @param {*} actionType :  action 의 타입 ( 삭제:delete | 사용여부 변경:toggle-using)
        */
        callAPIwithAllItems: function (actionType) {
          this.allSelected=true; // compute 함수에 의해 모든 row 들이 체크된다
          this.callAPIWithCheckedItems(actionType);
        },
        /**
          * @description : 페이지에 보이는 체크된 데이터 (this.tableData 에 있는 데이터)를 가지고 action 수행
          * @param {*} actionType :  action 의 타입 ( 삭제:delete | 사용여부 변경:toggle-using)
        */
        callAPIWithCheckedItems: function (actionType) {
          if(!["toggle-using","delete"].includes(actionType)){
            this.checkedItems=[];
            console.log("예상치 못한 오류");// "toggle-using" 또는 "delete" 를 받지 못했을때
            return ;
          }
          const $this=this;
          this.$axios.post(\`\${this.apiUrl}/\${actionType}-items\`, this.checkedItems)
            .then((response) => {
              console.log(response);
              this.refreshTable();
              this.checkedItems=[];
            }).catch(function (response) {
              console.log(response)
              $this.checkedItems=[];
            });
          
        },
        /**
       * @description : 리스트에서 받아온 객체로 update 호출 (${vueUtils.toCamelCase(payload.useAtColumn)} N->Y)
       */
      setUseAt: function (item,${vueUtils.toCamelCase(payload.useAtColumn)}) {
            if (confirm(${vueUtils.toCamelCase(payload.useAtColumn)}==='Y'?"사용하시겠습니까?":"미사용하시겠습니까?")) {
              const itemId = item.${pkList[0]};
              this.$axios.put(this.apiUrl, {
                ${vueUtils.toCamelCase(payload.useAtColumn)}: ${vueUtils.toCamelCase(payload.useAtColumn)}
              }, {
                params: {
                  ${pkList[0]}: itemId
                }
              })
                .then((response) => {
                  console.log(response);
                  this.refreshTable();
                })
                .catch(function (error) {
                  console.log(error);
                });
            } else {
                return;
            }
      },
    },
    computed: {
        /**
        전체선택 여부
        */    
        allSelected: {
          get: function () {
            //체크된 리스트와 전체리스트의 길이 비교
            return this.checkedItems.length === this.tableData.length;
          },
          set: function (checkAll) {
            //allSelected 값이 set 될때 checkAll(단일 체크박스값 -> true/false)
            //console.log("select all changed", checkAll);
            //true일 경우 전체 세팅 전체데이터 (this.tableData row 마다 getPKObj 를 타고 리턴) 
            this.checkedItems=checkAll?this.tableData.map(this.getPKObj):[];
          }
        },  
    },
    watch:{
      
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
  export default { getCtrl: setctrl };
