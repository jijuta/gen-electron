String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function toCamelCase(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}
function right(s, c) {
  return s.substr(-c);
}//right("abcd",2) = "cd"
function needSelectBox(column_name){
  if(column_name==="FRST_REGISTER_ID"||column_name==="LAST_UPDUSR_ID"){
    return false;
  }
  return right(column_name,3)==="_id"||right(column_name,3)==="_ID";
}
function isFileSelector(column_name){
  if(column_name==="FILE_SELECTOR"||column_name==="file_selector"){
    return true;
  }
}
function needFileUpload(items){
  let ret;
  items.forEach(item => {
    if(isFileSelector(item.column_name)){
      ret=true;
      return false;
    }
  });
  return ret;
}
function needModalLink(column_name){
  if(right(column_name,5)==="_name"||right(column_name,5)==="_NAME"){
    return true;
  }
  if(right(column_name,6)==="_title"||right(column_name,6)==="_TITLE"){
    return true;
  }else{
    return false;
  }
}
function toInputModule(column_name){
  return toCamelCase(column_name)+"Input";
}
function toSearchModule(column_name){
  return toCamelCase(column_name)+"Search";
}
function removeID(str){
  str=str.replace("_id","");
  str=str.replace("_ID","");
  str=(toCamelCase(str));
  return str;
}
function RemoveID(str){
  str=str.replace("_id","");
  str=str.replace("_ID","");
  str=(toCamelCase(str));
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function table(payload){
  return (
    `
          <table class="table card-table ">
              <thead>
                  <tr>
                      <th>
                          <input
                            type="checkbox"
                            value="all"
                            v-model="allSelected"
                          />
                        <!-- <a v-on:click="setSortCondition('TEST_TS_ID')">▼</a> -->
                      </th>
                      ${payload.selectedObj.map((item) => (
                      `

                        <th>
                        <div style="display: flex; justify-content: center; align-items: center; border-bottom: 0px;">
                          <span>${item.column_comment}</span>
                            <a v-on:click="setSortCondition('${item.column_name}')">
                              <Sortsvg />
                            </a>
                          </div>
                        </th>
                        `
                      )).join("")}
                      <th class="text-muted"> 사용여부 </th>

                      <th class="text-muted">  
                        <select v-model="recordSize" class="form-select">
                          <option selected value="5">record size</option>
                          <option v-for="(item, index) in recordSizeOption" :key="index" :value="item">
                          {{item}}
                          </option>
                        </select>
                      </th>
                  </tr>
              </thead>
              <tr v-for="(item,index) in tableData" :key="index">
                  <td class="text-muted">
                    <input
                      type="checkbox"
                      :id="index"
                      :value="getPKObj(item)"
                      v-model="checkedItems"
                      :key="index"
                    />
                  </td>
                  ${ payload.selectedObj.map((item) => {
                    if(needModalLink(item.column_name)){
                      return (
                        `
                                    <td class="text-muted"><a href="#" v-on:click="selectUpdateItem(item)">{{ item.${toCamelCase(item.column_name)} }}</a></td>
                        `
                      )
                    }else if(isFileSelector(item.column_name)){
                      return (`
                      <td>
                                    <div v-if="hasFile(item)"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                    class="bi bi-file-earmark-check" viewBox="0 0 16 16" style="fill: rgb(100 100 100)">
                                    <path
                                      d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                    <path
                                      d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                    </svg>
                                    </div>
                                    <div v-else>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16" style="fill: #bbb">
                                      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                                      </svg>
                                    </div>
                      </td>
                      `)
                    }
                    else{
                      return (
                        `
                                    <td class="text-muted">{{ item.${toCamelCase(item.column_name)} }}</td>
                        `
                      )
                    } 
                }).join("")}
                <td>
                <!-- <a href="#" class="btn" v-on:click="selectUpdateItem(item)">
                  수정
                </a> -->
                <div class="btn-list justify-content-center">
                  <div v-if="item.${toCamelCase(payload.useAtColumn)}=='Y'" class="form-check form-switch" style="margin-bottom: 0;">
                    <input class="form-check-input" type="checkbox" v-on:change="setUseAt(item,'N')" role="switch" checked>
                  </div>
                  <div v-else class="form-check form-switch" style="margin-bottom: 0;">
                    <input class="form-check-input" type="checkbox" v-on:change="setUseAt(item,'Y')" role="switch" unchecked>
                  </div>
                </div>
              </td>
              <td>
                <!-- <a href="#" class="btn" v-on:click="selectUpdateItem(item)">
                  수정
                </a> -->
                <div class="btn-list">
                  <button class="btn btn-sm btn-outline-danger" v-on:click="deleteItem(item)" 
                   style="min-width: 46px;">
                    삭제
                  </button>
                </div>
              </td>
              </tr>
          </table>
    `
    )
}
/**
 * 
 * @param {*} item : payload.items 의 element
 * @param {*} type : ["create","update","search"]
 * @param {*} optionType ["Input","Search"]
 * @returns {params 에 부합하는 selectbox/input/useYn selectbox 중 1개}
 */
function inputDataFormat(payload,item,type,optionType){
  let vHtml;
  let divClass;
  if(type==="search"){
    divClass="col-sm-6 col-md-3 mt-2";
  }else if(type==="create"){
    divClass="form-group mb-3 row";
  }else if(type==="update"){
    divClass="form-group mb-3 row";
  }

  if(type!=="search"&&isFileSelector(item.column_name)){
    return (
    `
      <file-upload 
        ref="${type}FileModal"
        :fileSelector="${type}Obj.value.fileSelector"
        table-name="${toCamelCase(item.table_name)}"
        type="${type}"
      />
    `
    )
  }

  if(needSelectBox(item.column_name)){
    vHtml=`
                <!-- ${item.column_comment} 셀렉트박스 - 주석 해재하여 사용
                <select v-model="${type}Obj.value.${toCamelCase(item.column_name)}" class="form-select">
                    <option value="" disabled selected>{{${item.column_comment}}}을(를) 선택해주세요</option>
                    <option v-for="(item, index) in ${toCamelCase(item.column_name)}${optionType}Options" :key="index" :value="item.value">
                    (ID:{{item.value}}) {{item.label}}
                    </option>
                </select>
                -->

                    <!--일반 텍스트 입력-->
                    <input v-model="${type}Obj.value.${toCamelCase(item.column_name)}" type="text" class="form-control" placeholder="${item.column_comment}을(를) 입력해주세요" />  

    `
  }else if(item.column_name===payload.useAtColumn){
    vHtml= `
                <!--사용여부-->
                <select v-model="${type}Obj.value.${toCamelCase(item.column_name)}" class="form-select">
                    <option value="" disabled selected>사용여부를 선택해주세요</option>
                    <option value="N">N</option>
                    <option value="Y">Y</option>
                </select>
    `
  }else{
    const date=right(item.column_name,5);
    const pnttm=right(item.column_name,6);

    if(date==="_DATE"||date==="_date"){
      vHtml= `
      <!--일반 날짜 입력-->
      <!--el-date-picker 텍스트 입력-->
      <el-date-picker style="width: 100%;"
      v-model="${type}Obj.value.${toCamelCase(item.column_name)}"
      type="date" 
      value-format="yyyy-MM-dd"
      placeholder="${item.column_comment}을(를) 입력해주세요"
      />
    `
    }else if(date==="_TIME"||date==="_time"||pnttm==="_pnttm"||pnttm==="_PNTTM"){
      vHtml= `
      <!--el-date-picker 텍스트 입력-->
      <el-date-picker style="width: 100%;"
      v-model="${type}Obj.value.${toCamelCase(item.column_name)}"
      type="datetime" 
      value-format="yyyy-MM-dd hh:mm:ss"
      placeholder="${item.column_comment}을(를) 입력해주세요"
      />
    `
    }else{
      vHtml= `
          <!--일반 텍스트 입력-->
          <input v-model="${type}Obj.value.${toCamelCase(item.column_name)}" type="text" class="form-control" placeholder="${item.column_comment}을(를) 입력해주세요" />  
    `
    }
    
  }
 return `
          <!-- ${item.column_comment} 입력 in ${type} -->
          <div class="${divClass}">
              ${type==="search"?
              `<!--<label class="form-label col-form-label">${item.column_comment}</label>-->`:
              `<label class="form-label col-form-label">${item.column_comment}</label>`}
                <div class="col">
                    ${vHtml}
                </div>
          </div>
`
}
/**
 * 
 * @param {*} payload 
 * @param {*} pkList setctrl 에서 만들어지는 pkList (pkList : 테이블에 pk 에 해당하는 column)
 * @param {*} type : ["create","update","search"]
 * @returns {타입에 따른 분기처리로 만든 header , footer , return 부에 있는 body와 결합한 inputForm
 *           create , update , search 에 사용됨
 * }
 */
function inputForm(payload,pkList,type){
  let target;
  let optionType;
  let header;
  let footer;

  /**
   * header와 footer 생성
   */
  if(type==="update"){
    target=payload.updateTabledobj;
    optionType="Input";
    header=`  
    <!--update 영역 시작 -->
    <div
      class="offcanvas offcanvas-start cmp-udpate"
      tabindex="-1"
      id="offcanvasStart"
      aria-labelledby="offcanvasStartLabel"
    >
      <div class="offcanvas-header btn-list">
        <h2 class="offcanvas-title" id="offcanvasStartLabel">
        <!-- {{updateObj.value.xxxTitle}} -->
        </h2>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="cmp-update">
        <!-- update form -->
          <div class="card">
            <div class="card-body">
    `;
    // <form> ... </form> 
    footer=
    `       
            
            </div>  
          </div>
        </div>
      </div>
      <div class="form-footer btn-list  justify-content-center" style="margin-bottom: 2rem">
                <button
                  v-on:click="updateItem()"
                  type="submit"
                  class="btn btn-outline-info"
                >
                  수정
                </button>
                <button type="button"  v-on:click="initUpdateObj()"
                  class="btn btn-outline-danger" data-bs-dismiss="offcanvas" aria-label="Close">
                  취소
                </button>
              </div>
    </div>
    <!--update 영역 끝-->
    `      


  }else if(type==="create"){
    target=payload.insertTabledobj;
    optionType="Input";
    header=
    ` 
    <!--생성 영역 시작-->
    <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasEnd"
    aria-labelledby="offcanvasEndLabel"
    >
      <div class="offcanvas-header">
        <h2 class="offcanvas-title" id="offcanvasEndLabel">생성</h2>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="cmp-create">
          <div class="card">
              <div class="card-body">
    `;
    // <form> ... </form>
    footer=
    `         
            </div> 
          </div>
        </div>
      </div>
      <div class="form-footer btn-list  justify-content-center" style="margin-bottom: 2rem">
                <button
                  v-on:click="createItem()"
                  type="submit"
                  class="btn btn-outline-info"
                >
                  생성
                </button>
                <button
                  v-on:click="toggleCreateForm()"
                  type="submit"
                  class="btn btn-outline-danger"
                >
                  취소
                </button>
              </div> 
    </div>
    <!--생성 영역끝-->
    `// for class "card"

  }else if(type=="search"){
    target=payload.selectedSearchobj;
    optionType="Search";
    header=
    `
    <!--검색영역 시작-->
      <div v-if="searchOpen" class="cmp-search row mb-3">
    `;
    footer=
    `
      </div>
      <!--검색영역 끝-->        
    `;
  }
  /**
   * body 위 아래에 에 전처리 된 header , footer
   */
  return `
  
      ${header}
          ${type!=="search"?`<form class="cmp-${type}-form" >`:``}                       
            ${(
              target.map((item) => {
                return (
                  inputDataFormat(payload,item,type,optionType)
                )
              })
            ).join("")}
          ${type!=="search"?"</form>":""}
      ${footer}
  `
}

function setctrl(payload,utils) {
  console.log(utils);
  console.log(payload);
  const pkList = payload.items.filter((item) => item.pk_flag === "Y").map((item) => toCamelCase(item.column_name));
  const projectName=toCamelCase(payload.tb.table_name);
  const tableName=payload.tb.table_comment;
  console.log(pkList);
  const vhtml=`
  <template>
  <div class="container mt-3">
    <div style="text-align: center; align-items: center;" class="d-flex justify-content-between mb-1">
      <h3 style="margin: 0;">테이블 검색</h3>
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
    ${inputForm(payload,pkList,"search")}
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title" style="width: 100%">
              ${tableName}
              <div style="float: right" class="btn-list justify-content-center">
              <!-- 체크박스 관련 함수들을 호출하게되는 버튼들 입니다 , 필요없는건 주석해재 해서 사용해주세요 -->
                <button v-on:click="callAPIWithCheckedItems('delete')" type="button" class="btn btn-outline-info">
                  선택삭제
                </button>
                <button v-on:click="callAPIwithAllItems('delete')" type="button" class="btn btn-outline-info">
                  전체삭제
                </button>                
                <button v-on:click="callAPIWithCheckedItems('toggle-using')" type="button" class="btn btn-outline-info">
                  선택 사용여부 전환
                </button>
                <button v-on:click="callAPIwithAllItems('toggle-using')" type="button" class="btn btn-outline-info">
                  전체 사용여부 전환
                </button>
                <button
                  v-on:click="toggleCreateForm()"
                  type="button"
                  class="btn btn-outline-success"
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
              ${table(payload)}
          </div>
          <!--페이징-->
          <nav v-if='tableData.length>0' aria-label="..." class="mx-auto">
            <ul class="pagination ">
  
            <!--노출하고싶은 페이지 개수만 노출 ex_) 총 30페이지 , 5개씩 노출 -> >>버튼 5번 누르기 -->
              <li class="page-item ">
                <a class="page-link" v-if="pageInfo.existPrevPage" v-on:click="prevPage()">&laquo;</a>
                <!-- <a class="page-link" v-else>&laquo;</a> -->
              </li>
              <li v-for="pi in Number(pageInfo.endPage - pageInfo.startPage + 1)" :key="pi"
                v-on:click="setPageNum(pageInfo.startPage + pi - 1)"
                :class="\`page-item \${isActivePage(pageInfo.startPage + pi - 1)}\`">
                <a class="page-link" >{{ pageInfo.startPage + pi - 1 }}</a>
              </li>
              <li class="page-item">
                <a class="page-link" v-if="pageInfo.existNextPage" v-on:click="nextPage()">&raquo;</a>
                <!-- <a class="page-link" v-else>&raquo;</a> -->
              </li>
            </ul>
          </nav>
          <div v-else>
            <p style="text-align: center; height: 61px; line-height: 61px; font-size: 16px; font-weight: 600; margin-bottom: 0;">
              No result
            </p>
          </div>
          
        </div>
      </div>
    </div>
    <!-- 상세 및 수정 -->
    ${inputForm(payload,pkList,"update")}
    <!-- 생성 -->
    ${inputForm(payload,pkList,"create")}
    <!-- 여러 가이드 및 공통 사용코드 -->
    ${etcCode()}
  </div>
</template>

<script>
${
needFileUpload(payload.items)?(
`
import FileUpload from "@/components/file/FileUpload.vue";
import utils from "@/components/file/utils.js"
`):(
``
)
}
import { besigMixin } from '../Utils.js';
import Sortsvg from '../components/comp/Sortsvg.vue';
export default {
  mixins: [besigMixin],
  data() {
    return {
        searchOpen: false,
        createFormVisible:false,
        updateFormVisible:false,
        detailFromVisible:false,
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
              `${toCamelCase(item.column_name)} : "" \n\t\t\t\t`
              ))}
          }
        },
        createObj:{ 
            ${pkList[0]}:"",
            value:{
              ${payload.insertTabledobj.map((item) => (
              `${toCamelCase(item.column_name)} : "" \n\t\t\t\t`
               ))}
            }
        }
        ,
        updateObj:{ 
            ${pkList[0]}:"",
            value:{
              ${payload.updateTabledobj.map((item) => (
              `${toCamelCase(item.column_name)} : "" \n\t\t\t\t`
            ))}
          }
        }
      }
    }
  
  ,
  components: {
    Sortsvg,
    ${
      needFileUpload(payload.items)?(
      `
      FileUpload
      `):(
      ``
      )
      }      
  },
  mounted() {
      this.searchItems();
      ${payload.items.map((item) => {
        if(needSelectBox(item.column_name)){
          return (
            `
            //this.$store.dispatch("${toInputModule(item.column_name)}/initOptions");
            //this.$store.dispatch("${toSearchModule(item.column_name)}/initOptions");
          `
          )
        }else{
          return ""
        }
      }).join('')
      }

  },
  methods: {
      toggleSearchOpen(){
        this.searchOpen=!this.searchOpen;
      },
      ${
        needFileUpload(payload.items)?(
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
              var field=toCamelCase(elem.column_name);
              return( 
`            ${field}:item.${field}              
`)
            }).join(",")
          }
        }
      },
      /**
      * @description : 생성폼 노출 여부 toggle
      */
      toggleCreateForm(){
        const elem = this.$refs.getviewContentoffcanvas; 
        elem.click();
        if(!this.createFormVisible){
          this.initUpdateObj();
        }
        this.createFormVisible=!this.createFormVisible;
      },
      /**
      * @description : 수정 오브젝트 초기화 , 값의 여부가 수정폼의 노출 여부를 결정
      */
      initUpdateObj: function (){
        this.updateObj.value={
          ${payload.updateTabledobj.map((item) => (
            ` 
            ${toCamelCase(item.column_name)} : "" `
        ))}
        };
        this.updateObj.${pkList[0]}=""; 
        this.searchItems();
      },
      /**
       * @description : 생성 오브젝트 초기화
       */
      initCreateObj: function (){
        this.createObj.value={
          ${payload.insertTabledobj.map((item) => (
            ` 
            ${toCamelCase(item.column_name)} : ""`
          ))}
        };
        this.createObj.${pkList[0]}="";
        this.initSearchObj();

      },
      /**
       * @description : 생성 오브젝트 초기화
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
       * @description : 검색 오브젝트 초기화
       */
      initSearchObj: function(){
        this.searchObj.value={
          ${payload.selectedSearchobj.map((item) => (
            `
             ${toCamelCase(item.column_name)} : ""`
          ))}
        };
        this.startSearchItems();
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
      //~end

      /**
       * @description : 상세보기버튼으로 수정 오브젝트 세팅
       * @param {*} item : 리스트의 row data
       */
      selectUpdateItem:function (item){
        const elem = this.$refs.offcanvasStart; 
        elem.click();
        this.updateObj.${pkList[0]}=item.${pkList[0]};
        ${payload.updateTabledobj.map((item) =>
              `this.updateObj.value.${toCamelCase(item.column_name)}=item.${toCamelCase(item.column_name)};
              `
        ).join("")
    }},


      /**
       * @description : 세팅되고 수정 폼에서 변경된 오브젝트로 수정 api 호출
       */
      updateItem:function() {
              console.log("update form",this.updateObj);
              const params=this.updateObj.value;
              ${
                needFileUpload(payload.updateTabledobj)?(
              `
              if(this.hasFile(params)&&this.$refs.updateFileModal.readyFileCount===0){
                //파일 셀렉터가 있는데 파일이 없을경우
                params.fileSelector="NONE";
              }else if(!this.hasFile(params)&&this.$refs.updateFileModal.readyFileCount!==0){
                //파일 셀렉터가 없는데 파일이 생길 경우
                params.fileSelector=utils.randomUUID();
              }
              `
                ):(
                  ``
                )
              }
              this.$axios.put(this.apiUrl, params,{
                params:{
                  ${pkList[0]}:this.updateObj.${pkList[0]}
                }
              })
                  .then((response)=> {
                      console.log(response);
                      ${
                        needFileUpload(payload.updateTabledobj)?(
                      `
                      if(this.hasFile(params)){
                        this.$refs.updateFileModal.uploadAllFiles();
                      }
                      `
                        ):(
                          ``
                        )
                      }
                      alert("success update");
                      this.initUpdateObj();
                      const elem = this.$refs.offcanvasStart;
                      elem.click();
                  })
                  .catch(function (error) {
                      console.log(error);
                      alert(error.response.data.message);
                  });
              // location.reload();
      },

      /**
       * @description : 생성 폼에서 변경된 오브젝트로 생성 api 호출
       */
      createItem:function() {
        console.log("create form",this.createObj);
        const params=this.createObj.value;
        let $this=this;
        ${
          needFileUpload(payload.insertTabledobj)?(
        `
        if(this.$refs.createFileModal.readyFileCount!==0){
          params.fileSelector=utils.randomUUID();
        }else{
          params.fileSelector="NONE";
        }
        `
          ):(
            ``
          )
        }
        this.$axios.post(this.apiUrl, params)
            .then((response)=> {
                console.log(response,this);
                ${
                  needFileUpload(payload.insertTabledobj)?(
                `
                if(this.hasFile(params)){
                  this.$refs.createFileModal.uploadAllFiles();
                }
                `
                  ):(
                    ``
                  )
                }
                alert("success createObj");
                $this.initCreateObj();
                const elem = this.$refs.getviewContentoffcanvas;
                elem.click();
            })
            .catch(function (error) {
              alert(error.response.data.message);
            });
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
                  this.searchItems();
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
            this.searchItems();
            this.checkedItems=[];
          }).catch(function (response) {
            console.log(response)
            $this.checkedItems=[];
          });
        
      },
      /**
     * @description : 리스트에서 받아온 객체로 update 호출 (${toCamelCase(payload.useAtColumn)} N->Y)
     */
     setUseAt: function (item,${toCamelCase(payload.useAtColumn)}) {
          if (confirm(${toCamelCase(payload.useAtColumn)}==='Y'?"사용하시겠습니까?":"미사용하시겠습니까?")) {
            item.${toCamelCase(payload.useAtColumn)}=${toCamelCase(payload.useAtColumn)};
            const params = item;
            const itemId = item.${pkList[0]};
          
            this.$axios.put(this.apiUrl, params, {
              params: {
                ${pkList[0]}: itemId
              }
            })
              .then((response) => {
                console.log(response);
                this.initUpdateObj();
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
      editSelected() {
        //true : update form 
        //false : create form
          return this.updateObj.${pkList[0]} !== "";
      },
      ${payload.items.map((item) => {
      if(needSelectBox(item.column_name)){
        return (
            `
            //${item.column_comment} selectbox  for input
            /*

          1) ../store/index.js 에 선언
            const ${toInputModule(item.column_name)}={
              tableName: "cmp${RemoveID(item.column_name)}",
              columnName: "${removeID(item.column_name)}",
              child: null,
              parent: []
            };
          2) ../store/index.js:143 근처에 있는 모듈에 추가
              modules:{
                ...
                ${toInputModule(item.column_name)} : dynamicTemplate.genModule(${toInputModule(item.column_name)}),
                ...
              }
            */
            ${toCamelCase(item.column_name)}CreateForm(){
              return this.createObj.value.${toCamelCase(item.column_name)};
            },
            ${toCamelCase(item.column_name)}UpdateForm(){
              return this.updateObj.value.${toCamelCase(item.column_name)};
            },

            //store의 module 에 저장된 옵션들을 불러온다
            ${toCamelCase(item.column_name)}InputOptions(){
              if (!this.$store.state.${toInputModule(item.column_name)}) return [{ label: 0 }, { value: 0 }];
              return this.$store.state.${toInputModule(item.column_name)}.options;
            },

            //${item.column_comment} selectbox  for search
            /*

          1) ../store/index.js 에 선언
            const ${toSearchModule(item.column_name)}={
              tableName: "cmp${RemoveID(item.column_name)}",
              columnName: "${removeID(item.column_name)}",
              child: null,
              parent: []
            };
          2) ../store/index.js:143 근처에 있는 모듈에 추가
              modules:{
                ...
                ${toSearchModule(item.column_name)} : dynamicTemplate.genModule(${toSearchModule(item.column_name)}),
                ...
              }

            */
            ${toCamelCase(item.column_name)}SearchForm(){
              return this.searchObj.value.${toCamelCase(item.column_name)};
            },
            //store의 module 에 저장된 옵션들을 불러온다
            ${toCamelCase(item.column_name)}SearchOptions(){
              if (!this.$store.state.${toSearchModule(item.column_name)}) return [{ label: 0 }, { value: 0 }];
              return this.$store.state.${toSearchModule(item.column_name)}.options;
            },

            `
          )
      }
      else{
        return "";
      }
      }).join('\n')
    }   
  }
,
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
    ${payload.items.map((item) => {
      if(needSelectBox(item.column_name)){
        return (
          `
        //${item.column_comment} selectbox

        //this.createObj.value.${toCamelCase(item.column_name)} 가 바뀔때 store 의 action 호출 (본인 값 세팅 및 자식이 있는경우 자식의 options 변경)
        ${toCamelCase(item.column_name)}CreateForm(newVal){
          //this.createObj.value.{child}=""; //부모의 선택값 변경시 바로 아래 자식의 값 초기화
          this.$store.dispatch("${toInputModule(item.column_name)}/setSelectedAction", newVal);
        },
        //this.updateObj.value.${toCamelCase(item.column_name)} 가 바뀔때 store 의 action 호출 (본인 값 세팅 및 자식이 있는경우 자식의 options 변경)
        ${toCamelCase(item.column_name)}UpdateForm(newVal){
          //this.update.value.{child}=""; //부모의 선택값 변경시 바로 아래 자식의 값 초기화
          this.$store.dispatch("${toInputModule(item.column_name)}/setSelectedAction", newVal);
        },
        //this.searchObj.${toCamelCase(item.column_name)} 가 바뀔때 store 의 action 호출 (본인 값 세팅 및 자식이 있는경우 자식의 options 변경)
        ${toCamelCase(item.column_name)}SearchForm(newVal){
          //this.searchObj.{child}=""; //부모의 선택값 변경시 바로 아래 자식의 값 초기화
          this.$store.dispatch("${toSearchModule(item.column_name)}/setSelectedAction", newVal);
        },
        `
        )
      }else{
        return ""
      }
    }).join('\n')
    } 
    editSelected(){
      //at toggle createForm <--> updateForm (2 ways)
      //this.$store.commit("{!store module name!}/setSelected",null);// - 모든 options 초기화 (다른 값에 종속되는 경우 옵션 초기화 ex. 회사의 '부서')
      ${payload.items.map((item) => {
        if(needSelectBox(item.column_name)){
          return (
          `this.$store.commit("${toInputModule(item.column_name)}/setSelected",null);
          `
          )
        }else{
          return ""
        }
      }).join('')
      } 
    }
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
