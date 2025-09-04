
/**
 * 
 * @param {*} item : payload.items 의 element
 * @param {*} type : ["create","update","search"]
 * @param {*} optionType ["Input","Search"]
 * @returns {params 에 부합하는 selectbox/input/useYn selectbox 중 1개}
 */
function inputDataFormat(payload, item, type, optionType) {
    let vHtml;
    let divClass;
    if (type === "search") {
        divClass = "col-sm-6 col-md-3 mt-2";
    } else if (type === "create") {
        divClass = "form-group mb-3 row";
    } else if (type === "update") {
        divClass = "form-group mb-3 row";
    }else if (type === "detail") {
        divClass = "form-group mb-3 row";
    }

    if (type !== "search" && isFileSelector(item.column_name)) {
        return (
`         <file-upload 
            ref="${type}FileModal"
            :fileSelector="${type}Obj.value.fileSelector"
            table-name="${toCamelCase(item.table_name)}"
            type="${type}"
          />`
        )
    }

    if (needSelectBox(item.column_name)) {
        vHtml = (
`
          <!--일반 텍스트 입력-->
          <input ${type==='detail'?'readonly':''} v-model="${type}Obj.value.${toCamelCase(item.column_name)}" type="text" class="form-control" placeholder="${item.column_comment}을(를) 입력해주세요" />  `)
    } else if (item.column_name === payload.useAtColumn) {
        vHtml = (
`       
          <!--사용여부-->
          <select v-model="${type}Obj.value.${toCamelCase(item.column_name)}" class="form-select">
              <option value="" disabled selected>사용여부를 선택해주세요</option>
              <option value="N">N</option>
              <option value="Y">Y</option>
          </select>`)
    } else {
        const columnType=item.data_type.toLowerCase();
        if ( columnType === "date") {
            vHtml = (
`
          <!--일반 날짜 입력-->
          <!--el-date-picker 텍스트 입력-->
          <el-date-picker ${type==='detail'?':readonly="true"':''} style="width: 100%;"
          v-model="${type}Obj.value.${toCamelCase(item.column_name)}"
          type="date" 
          value-format="yyyy-MM-dd"
          placeholder="${item.column_comment}을(를) 입력해주세요"
          />`)
        } else if (columnType === "datetime" ) {
            vHtml = (
`
          <!--el-date-picker 텍스트 입력-->
          <el-date-picker ${type==='detail'?':readonly="true"':''} style="width: 100%;"
          v-model="${type}Obj.value.${toCamelCase(item.column_name)}"
          type="datetime" 
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="${item.column_comment}을(를) 입력해주세요"
          />`)
        } else if(right(columnType,4).toLowerCase() === "text"){
            vHtml = 
`
          <textarea ${type==='detail'?'readonly':''} v-model="${type}Obj.value.${toCamelCase(item.column_name)}" type="text" class="form-control" placeholder="${item.column_comment}을(를) 입력해주세요" />  
`
        }
        else {
            vHtml = 
`             
          <!--일반 텍스트 입력-->
          <input ${type==='detail'?'readonly':''} v-model="${type}Obj.value.${toCamelCase(item.column_name)}" type="text" class="form-control" placeholder="${item.column_comment}을(를) 입력해주세요" />`
        }

    }
    return (
`
      <!-- ${item.column_comment} 입력 in ${type} -->
      <div class="${divClass}">
        ${type === "search" ?`<!--<label class="form-label col-form-label">${item.column_comment}</label>-->`:
        `<label class="form-label col-form-label">${item.column_comment}</label>`}
        <div class="col">${vHtml}
        </div>
      </div>
`)
}
function isEditable(payload,column) {
  return payload.updateTabledobj.map(item=>item.column_name).includes(column)
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
function inputForm(payload, pkList, type) {
    let target;
    let optionType;
    let header;
    let footer;

    /**
     * header와 footer 생성
     */
    if (type === "update") {
        target = payload.updateTabledobj;
        optionType = "Input";
        header = 
`     <!--update 영역 시작 -->
      <div
        class="offcanvas offcanvas-end cmp-udpate"
        tabindex="-1"
        id="updateModal"
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
            ref="closeModal"
          ></button>
        </div>
        <div v-if="!loading" class="offcanvas-body">
          <div class="cmp-update">
          <!-- update form -->
            <div class="card">
              <div class="card-body">
      `;
        // <form> ... </form> 
        footer =
`             </div>  
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
    }else if (type === "detail") {
        target = payload.selectedObj;
        optionType = "Input";
        header = 
`     <!--detail 영역 시작 -->
      <div
        class="offcanvas offcanvas-end cmp-udpate"
        tabindex="-1"
        id="detailModal"
        aria-labelledby="offcanvasStartLabel"
      >
        <div class="offcanvas-header btn-list">
          <h2 class="offcanvas-title" id="offcanvasStartLabel">
          <!-- {{detailObj.value.xxxTitle}} -->
          </h2>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            ref="closeModal"
          ></button>
        </div>
        <div v-if="!loading" class="offcanvas-body">
          <div class="cmp-update">
          <!-- searchProps 로 import 한 aggrid 사용 (searchProps 는 AgGridPage 에 있는 searchObj 를 따른다)-->
          <!-- <AgGridPage :searchProps="{value:{}}"/> -->
          <!-- update form -->
            <div class="card">
              <div class="card-body">
`;
        // <form> ... </form> 
        footer =
`             </div>  
            </div>
          </div>
        </div>
        <div class="form-footer btn-list  justify-content-center" style="margin-bottom: 2rem">
            <button v-on:click=" selectUpdateItem(detailObj.value)" type="submit" class="btn btn-outline-info">
                수정하기
            </button>
        </div>
      </div>
      <!--update 영역 끝-->
`
    }  
    else if (type === "create") {
        target = payload.insertTabledobj;
        optionType = "Input";
        header =
`     <!--생성 영역 시작-->
      <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="createModal"
      aria-labelledby="offcanvasEndLabel"
      >
        <div class="offcanvas-header">
          <h2 class="offcanvas-title" id="offcanvasEndLabel">생성</h2>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            ref="closeModal"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="cmp-create">
            <div class="card">
                <div class="card-body">
`;
        // <form> ... </form>
        footer =
`               </div> 
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

    } else if (type == "search") {
        target = payload.selectedSearchobj;
        optionType = "Search";
        header =
`
      <!--검색영역 시작-->
    <div v-if="searchOpen" class="cmp-search row mb-3">`;
        footer =
`
    </div>
        <!--검색영역 끝-->`;
    }
    /**
     * body 위 아래에 에 전처리 된 header , footer
     */
    return (
`
      ${header}
        ${type !== "search" ? `<form class="cmp-${type}-form" >` : ``}                       
            ${(target.map((item) => {return (inputDataFormat(payload, item, type, optionType))})).join("")}
        ${type !== "search" ? "</form>" : ""}
      ${footer}
`)
}




function toCamelCase(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}
function right(s, c) {
    return s.substr(-c);
}//right("abcd",2) = "cd"
function needSelectBox(column_name) {
    if (column_name === "FRST_REGISTER_ID" || column_name === "LAST_UPDUSR_ID") {
        return false;
    }
    return right(column_name, 3) === "_id" || right(column_name, 3) === "_ID";
}
function isFileSelector(column_name) {
    if (column_name === "FILE_SELECTOR" || column_name === "file_selector") {
        return true;
    }
}
function needFileUpload(items) {
    let ret;
    items.forEach(item => {
        if (isFileSelector(item.column_name)) {
            ret = true;
            return false;
        }
    });
    return ret;
}
function needModalLink(column_name) {
    if (right(column_name, 5) === "_name" || right(column_name, 5) === "_NAME") {
        return true;
    }
    if (right(column_name, 6) === "_title" || right(column_name, 6) === "_TITLE") {
        return true;
    } else {
        return false;
    }
}
function toInputModule(column_name) {
    return toCamelCase(column_name) + "Input";
}
function toSearchModule(column_name) {
    return toCamelCase(column_name) + "Search";
}
function removeID(str) {
    str = str.replace("_id", "");
    str = str.replace("_ID", "");
    str = (toCamelCase(str));
    return str;
}
function RemoveID(str) {
    str = str.replace("_id", "");
    str = str.replace("_ID", "");
    str = (toCamelCase(str));
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function table(payload) {
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
                            <select v-on:change="pageUtils.setRecordSize" class="form-select">
                                <option selected value="5">record size</option>
                                <option v-for="(item, index) in pageUtils.recordSizeOption" :key="index" :value="item">
                                {{ item }}
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
                    ${payload.selectedObj.map((item) => {
            if (needModalLink(item.column_name)) {
                return (
                    `
                                      <td class="text-muted"><a href="#" v-on:click="selectItem(item)">{{ item.${toCamelCase(item.column_name)} }}</a></td>
                          `
                )
            } else if (isFileSelector(item.column_name)) {
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
            else {
                return (
                    `
                                      <td class="text-muted">{{ item.${toCamelCase(item.column_name)} }}</td>
                          `
                )
            }
        }).join("")}
                  <td>
                  <!-- <a href="#" class="btn" v-on:click="selectItem(item)">
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
                  <!-- <a href="#" class="btn" v-on:click="selectItem(item)">
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
function agGridDefaultColumnDefs(payload){
  return (
    `{
            resizable: true,
            editable: (params) => {
            // 제너레이터의 기본 설정을 따를수 있습니다
            // return [${payload.updateTabledobj.map(item=>`"${item.column_name}"`).join(",")}].includes(params.column.colId)

            /** 
              ${payload.items.map((item,idx)=>{
               return `${item.column_name} ${item.column_comment}${idx!==0&&((idx+1)%3)==0 ? "\n\t\t\t\t\t\t\t":" /"}`
              }).join("")}
            */
            // 특정 셀에 대해서만 편집을 허용합니다.
            return (params.column.colId === 'CHANGE_ME' || params.column.colId === 'CHANGE_ME') && (params.node.rowIndex >= 1 && params.node.rowIndex <= 5);
      }
    }
    `)
}

function agGridColumnDefs(payload){
  return payload.selectedObj.map((item) => {
    if (isFileSelector(item.column_name)) {
      return (
  `
              {
                headerName: '${item.column_comment}',
                field: '${toCamelCase(item.column_name)}',
                editable: ${isEditable(payload,item.column_name)},
                sortable: true,
                cellRenderer: this.fileSelectorRenderer,
                comparator: () => 0, //block ag-grid sort (only sorted by server)
                colId: '${item.column_name}',
              },
  `)          }
  else if (item.column_name === payload.useAtColumn) {
    return (
  `
              {
                headerName: '${item.column_comment}',
                field: '${toCamelCase(item.column_name)}',
                editable: ${isEditable(payload,item.column_name)},
                sortable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                  values: ['Y', 'N'],
                },
                colId: '${item.column_name}',
                comparator: () => 0, //block ag-grid sort (only sorted by server)
              },
  `)   
  }
  else {
    return (
  `
              {
                headerName: '${item.column_comment}',
                field: '${toCamelCase(item.column_name)}',
                editable: ${isEditable(payload,item.column_name)},
                sortable: true,
                colId: '${item.column_name}',
                comparator: () => 0, //block ag-grid sort (only sorted by server)
              },
  `)   
  }
  }).join("")
}


export default {
    inputDataFormat: inputDataFormat,
    inputForm: inputForm,
    toCamelCase: toCamelCase,
    right: right,
    needSelectBox: needSelectBox,
    isFileSelector: isFileSelector,
    needFileUpload: needFileUpload,
    needModalLink: needModalLink,
    toInputModule: toInputModule,
    toSearchModule: toSearchModule,
    removeID: removeID,
    RemoveID: RemoveID,
    table: table,
    agGridColumnDefs:agGridColumnDefs,
    agGridDefaultColumnDefs: agGridDefaultColumnDefs
}