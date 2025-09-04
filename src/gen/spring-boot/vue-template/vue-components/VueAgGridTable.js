String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
import vueUtils from '../utils.js';


function genAgGrid(payload,utils) {
 
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
                <select v-on:change="pageUtils.setRecordSize" class="">
                  <option selected value="5">record size</option>
                  <option v-for="(item, index) in pageUtils.recordSizeOption" :key="index" :value="item">
                    {{ item }}
                  </option>
                </select>
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
                  v-on:click="addRow()"
                  type="button"
                  class="btn btn-outline-success"
                  style="height: 30px; padding: 0.1rem 0.5rem;"
                >
                  행추가
                </button>
              </div>
            </h4>
          </div>

          <div v-if="isTableLoading">
          loading
          </div>
          <div v-else style="display: block; overflow-x: scroll; overflow-y: clip;">
            <div style="display: block; overflow-x: scroll; overflow-y: clip;">
              <ag-grid-vue style="width: 100%; height: 70vh; min-height: 300px" class="ag-theme-alpine"
                :gridOptions="gridOptions" :columnDefs="columnDefs" @grid-ready="onGridReady" rowSelection="multiple"
                @selection-changed="onSelectionChanged" @onCellClicked="onCellClicked" editType='fullRow'
                @sortChanged="onSortChanged" :rowData="tableData" @rowEditingStopped="onRowChanged"
               />
            </div>
          </div>
          
          <!--페이징 필요시 주석 해재해서 사용-->
         <!-- <nav v-if='!isTableLoading && tableData.length > 0' aria-label="..." class="mx-auto">
          <ul class="pagination "> -->
            <!--노출하고싶은 페이지 개수만 노출 ex_) 총 30페이지 , 5개씩 노출 -> >>버튼 5번 누르기 -->
            <!-- 
            <li class="page-item ">
              <a class="page-link" v-if="pageUtils.pageInfo.existPrevPage" v-on:click="pageUtils.prevPage()">&laquo;</a> 
            -->
              <!-- <a class="page-link" v-else>&laquo;</a> -->
            <!--  
            </li>
            <li v-for="pi in Number(pageUtils.pageInfo.endPage - pageUtils.pageInfo.startPage + 1)" :key="pi"
              v-on:click="pageUtils.setPageNum(pageUtils.pageInfo.startPage + pi - 1)"
              :class="\`page-item \${pageUtils.isActivePage(pageUtils.pageInfo.startPage + pi - 1)}\`">
              <a class="page-link">{{ pageUtils.pageInfo.startPage + pi - 1 }}</a>
            </li>
            <li class="page-item">
              <a class="page-link" v-if="pageUtils.pageInfo.existNextPage" v-on:click="pageUtils.nextPage()">&raquo;</a> -->
              <!-- <a class="page-link" v-else>&raquo;</a> -->
        <!--   
            </li>
          </ul>
        </nav 
        --> 

        <!-- 페이징 컴포넌트 주석 해재하여 사용 -->
        <!-- <PageComp :rowLength="tableData.length" :activePage="activePage" :pageUtils="pageUtils" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'

// import PageComp from '@/components/PageComp.vue'; //주석 해재하여 사용
import { besigMixin } from '../../../Utils.js';
export default {
  mixins: [besigMixin],
  components: {
    AgGridVue,
 // PageComp //주석 해재하여 사용
  },
  props: {
    pageUtils: Object,
    selectItem: Function,
    tableData: Array,
    apiUrl: String,
    setSortCondition: Function,
    refreshTable: Function,
    toggleCreateForm: Function,
    isTableLoading: Boolean,
  },
  data() {
      return {
        selectedRows: [],
        gridOptions: {
          animateRows: false,
          rowSelection: 'multiple',
          resizable: true,
        },
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

          // 사용자 정의 셀 렌더러 (파일)
          fileSelectorRenderer(params) {
            if (params.value === 'Y') {
              return '<div><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark-check" viewBox="0 0 16 16" style="fill: rgb(100 100 100)"><path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" /><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" /></svg></div>';
            } else {
              return '<div><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16" style="fill: #bbb"><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/></svg></div>';
            }
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
          ${
            payload.pkObjList.map(elem=>{
              var field=vueUtils.toCamelCase(elem.column_name);
              return( 
`            if(!item.${field}) return null              
`)
            }).join(",")
          }
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
        onSortChanged(event) {
          const srtmd = event.columnApi.getColumnState().find(col => Boolean(col.sort));
          if(srtmd == undefined) {
            return 
          }
          this.setSortCondition(srtmd.colId, srtmd.sort)
        },
        onSelectionChanged({ api }) {
          this.selectedRows = api.getSelectedRows();
        },
        getSelectedRowsByKey() {
          return this.selectedRows.map(this.getPKObj)
        },
    
        onGridReady(params) {
          this.gridApi = params.api;
        },
        addRow() {
          const newObject = {
            /**필수 입력값 */
            ${payload.insertTabledobj.filter(item=>item.validNotNull).map(item=>{

              return `${vueUtils.toCamelCase(item.column_name)} : ${utils.dataTypeFnc(item.data_type)==="String"?"'default'":0},
              `
            }
              ).join("")}
          }
          this.gridApi.applyTransaction({
            add: [newObject],
          });
          console.log(this.params)
          this.createItem(newObject).then(res => {
            console.log("create succ", res)
            this.pageUtils.setPageNum(1)
            this.setSortCondition("", "desc")
            this.refreshTable()
          }).catch(error => {
            if(error.response?.data?.error_message){
              alert(error.response.data.error_message);
            }
            console.log("error at create",error);
          })
        },
        onCellClicked: (params) => {
          console.log(params)
          if (params.column.colId == 'action') {
            const cellRendererInstances = params.api.getCellRendererInstances({
              rowNodes: [params.node],
              columns: [params.column],
            });
            if (cellRendererInstances.length > 0) {
              const instance = cellRendererInstances[0];
              // 상황에 따라서 action 리스트 조절 가능
              instance.togglePopup(['Create', 'Edit']);
            }
          }
        },
        updateItem: function (data) {
          return this.$axios.put(this.apiUrl, data, {
            params: {
              ...this.getPKObj(data)
            }
          })
          // location.reload();
        },
        onRowChanged(event) {
          if (this.getPKObj(event.data) == null) {
            this.createItem(event.data).then(res => {
              console.log("create succ", res)
              this.pageUtils.setPageNum(1)
              this.setSortCondition("", "desc")
              this.refreshTable()
            }).catch(error => {
              if(error.response?.data?.error_message){
                alert(error.response.data.error_message);
              }
              console.log("error at create",error);
            })
          } else {
            this.updateItem(event.data).then(res => {
              this.refreshTable()
              console.log("update succ", res)
            }).catch(error => {
              this.refreshTable()
              if(error.response?.data?.error_message){
                alert(error.response.data.error_message);
              }
              console.log("error at create",error);
            })
          }
        },
        createItem: function (params) {
          return this.$axios.post(this.apiUrl, params)
            .then((response) => {
              console.log(response, this);
            })
        },
        /**
          * @description : 페이지에 보이는 모든 데이터 (this.tableData 에 있는 데이터)를 가지고 action 수행
          * @param {*} actionType :  action 의 타입 ( 삭제:delete | 사용여부 변경:toggle-using)
        */
        callAPIwithAllItems: function (actionType) {
          this.allSelected = true; // compute 함수에 의해 모든 row 들이 체크된다
          this.callAPIWithCheckedItems(actionType);
        },
        /**
          * @description : 페이지에 보이는 체크된 데이터 (this.tableData 에 있는 데이터)를 가지고 action 수행
          * @param {*} actionType :  action 의 타입 ( 삭제:delete | 사용여부 변경:toggle-using)
        */
        callAPIWithCheckedItems: function (actionType) {
          if (!["toggle-using", "delete"].includes(actionType)) {
            this.selectedRows = [];
            console.log("예상치 못한 오류");// "toggle-using" 또는 "delete" 를 받지 못했을때
            return;
          }
    
          const $this = this;
          this.$axios.post(\`$\{this.apiUrl\}/$\{actionType\}-items\`, this.getSelectedRowsByKey())
            .then((response) => {
              console.log(response);
              this.refreshTable();
              this.selectedRows = [];
            }).catch(function (response) {
              console.log(response)
              $this.selectedRows = [];
            });
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
            this.selectedRows=checkAll?this.tableData:[];
          }
        }, 
        // ag-grid column defs
        columnDefs() {
          return [
            {
              headerCheckboxSelection: true,
              headerName: '',
              checkboxSelection: true,
              width: 30, 
            },
            ${vueUtils.agGridColumnDefs(payload)}
          ]
        },
        // ag-grid column defs
        defaultColumnDefs() {
          return ${vueUtils.agGridDefaultColumnDefs(payload)}
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
  export default { genAgGrid: genAgGrid };
