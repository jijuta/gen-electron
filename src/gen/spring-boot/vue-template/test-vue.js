function updateForm(payload,pkList,type){
  
  return ( 
  `
  <div v-if="editSelected" class="card">
      <div class="card-header">
          <h3 class="card-title">상세보기 [${payload.items[0].table_comment}ID :: {{updateObj.${pkList[0]}}} ]</h3>
      </div>
      <div class="card-body">
      <!-- update form -->
          <form>
             
          <!--
          selectbox : text input 으로 입력받지 않고 , 기존 값을 이용하여 입력하고 싶을때
          // {!props for selectBox!} : component 의 data에 선언된 필드
          //{!compute option List!} : component 에서 사용하는 selectbox의 option list
    
          <div class="form-group mb-3 row">
              <label class="form-label col-3 col-form-label">회사</label>
              <div class="col">
                  <select v-model="updateObj.value.{!props for selectBox!}" class="form-select">
                      <option v-for="(item, index) in {!compute option List!}" :key="index" :value="item.value">
                          {{ item.label }}
                      </option>
                  </select>

              </div>
          </div> 
          -->                       
          ${(
            payload.updateTabledobj.map((item) => {
              return (
                `
                                  <div class="form-group mb-3 row">
                                      <label class="form-label col-3 col-form-label">${item.column_comment}</label>
                                        <div class="col">
                `
                + ((item.column_name !== "USE_AT" && item.column_name !== "use_at") ?
                  `                           <input v-model="updateObj.value.${toCamelCase(item.column_name)}" type="text" class="form-control" placeholder="${item.column_comment} 입력란" />
                                            <!--  셀렉트 박스 사용시 input 에 disabled 추가                           
                                            <select v-model="updateObj.value.${toCamelCase(item.column_name)}" class="form-select">
                                                    <option v-for="(item, index) in ${toCamelCase(item.column_name)}InputOptions" :key="index" :value="item.value">
                                                        {{ item.label }}
                                                    </option>
                                            </select>
                                            -->                              
                `
                  :
                  `                           <select v-model="updateObj.value.${toCamelCase(item.column_name)}" class="form-select">
                                                    <option value="N">N</option>
                                                    <option value="Y">Y</option>
                                            </select>
                ` )
                +
                `   
                                        </div>
                                  </div>
                `
              )
            })
          ).join("")}
              <div class="form-footer">
                  <button v-on:click="updateItem()" type="submit" class="btn btn-primary">수정</button>
                  <button v-on:click="initUpdateObj()" type="cancle" class="btn btn-danger ml-2">취소</button>

              </div>
          </form>
      </div>
  </div>
  `)
}
function createForm(payload) {

  return (
    `
    <div v-if="createFormVisible">
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">생성</h3>
        </div>
        <div class="card-body">
        <!-- create form -->
            <form>
              <!--
                selectbox : text input 으로 입력받지 않고 , 기존 값을 이용하여 입력하고 싶을때
                // {!props for selectBox!} : component 의 data에 선언된 필드
                //{!compute option List!} : component 에서 사용하는 selectbox의 option list
      
                <div class="form-group mb-3 row">
                    <label class="form-label col-3 col-form-label">회사</label>
                    <div class="col">
                        <select v-model="createObj.value.{!props for selectBox!}" class="form-select">
                            <option v-for="(item, index) in {!compute option List!}" :key="index" :value="item.value">
                                {{ item.label }}
                            </option>

                        </select>

                    </div>
                </div> 
              -->  
                
              ${(payload.insertTabledobj.map((item) => {
                return (
                  `
                                      <div class="form-group mb-3 row">
                                          <label class="form-label col-3 col-form-label">${item.column_comment}</label>
                                            <div class="col">
                    `
                  + ((item.column_name !== "USE_AT" && item.column_name !== "use_at") ?
                    `                           <input v-model="createObj.value.${toCamelCase(item.column_name)}" type="text" class="form-control" placeholder="${item.column_comment} 입력란" />
                                                <!-- 셀렉트 박스 사용시 input 에 disabled 추가                           
                                                <select v-model="createObj.value.${toCamelCase(item.column_name)}" class="form-select">
                                                        <option v-for="(item, index) in ${toCamelCase(item.column_name)}InputOptions" :key="index" :value="item.value">
                                                            {{ item.label }}
                                                        </option>
                                                </select>
                                                -->
                    `
                    :
                    `                           <select v-model="createObj.value.${toCamelCase(item.column_name)}" class="form-select">
                                                        <option value="N">N</option>
                                                        <option value="Y">Y</option>
                                                </select>
                    ` )
                  +
                  `   
                                            </div>
                                      </div>
                    `
                )
              })
            ).join("")}
                <div class="form-footer">
                    <button v-on:click="createItem()" type="submit" class="btn btn-primary">생성</button>
                    <button v-on:click="toggleCreateForm()" type="submit" class="btn btn-danger ml-2">취소</button>
                    <button v-on:click="searchItems()" type="submit" class="btn btn-primary">검색</button>
                    <button v-on:click="initSearchObj()" type="submit" class="btn btn-danger">초기화</button>
                </div>
            </form>
        </div>
    </div>
</div> 
    `)
    

}
function searchForm(payload) {

  return (
    `
    <form>
    <!--
      selectbox : text input 으로 입력받지 않고 , 기존 값을 이용하여 입력하고 싶을때
      // {!props for selectBox!} : component 의 data에 선언된 필드
      //{!compute option List!} : component 에서 사용하는 selectbox의 option list
      <div class="form-group mb-3 row">
          <label class="form-label col-3 col-form-label">회사</label>
          <div class="col">
              <select v-model="createObj.value.{!props for selectBox!}" class="form-select">
                  <option v-for="(item, index) in {!compute option List!}" :key="index" :value="item.value">
                      {{ item.label }}
                  </option>
              </select>
          </div>
      </div> 
    -->  
    `
    +
    payload.selectedSearchobj.map((item) => {
      return (
        `
                          <div class="form-group mb-3 row">
                              <label class="form-label col-3 col-form-label">${item.column_comment}</label>
                                <div class="col">
        `
        + ((item.column_name !== "USE_AT" && item.column_name !== "use_at") ?
          `                           <input v-model="searchObj.${toCamelCase(item.column_name)}" type="text" class="form-control" placeholder="${item.column_comment} 입력란" />
                                    <!--  셀렉트 박스 사용시 input 에 disabled 추가                           
                                    <select v-model="searchObj.${toCamelCase(item.column_name)}" class="form-select">
                                            <option v-for="(item, index) in ${toCamelCase(item.column_name)}SearchOptions" :key="index" :value="item.value">
                                                {{ item.label }}
                                            </option>
                                    </select>
                                    -->                              
        `
          :
          `                           <select v-model="searchObj.${toCamelCase(item.column_name)}" class="form-select">
                                            <option value="N">N</option>
                                            <option value="Y">Y</option>
                                    </select>
        ` )
        +
        `   
                                </div>
                          </div>


                          
        `
      )
    })
  .join("")
  +
  `
  <div class="form-footer">
                          <button v-on:click="searchItems()" type="submit" class="btn btn-primary">검색</button>
                          <button v-on:click="initSearchObj()" type="submit" class="btn btn-danger">초기화</button>
                      </div>
                </form>
                  <!--
                    searchItems() : state 와 컴포넌트에 있는 검색 form 을 이용하여 검색 request
                  -->
  `
  )

}

// selectedSearchobj
// const arr=[
//   {
//     pl:company,
//     label:"Company",
//     label2:"company"
//   },
//   {
//     pl:tenant,
//     label:"Tenant",
//     label2:"tenant"
//   },
//   {
//     pl:part,
//     label:"Part",
//     label2:"part"

//   },
//   {
//     pl:user,
//     label:"User",
//     label2:"user"

//   },
//   {
//     pl:team,
//     label:"Team",
//     label2:"team"

//   },
// ]

// const fs = require("fs");
// arr.forEach((item)=>{
//   fs.writeFile(`/Users/taesung/dev/saesol/cmppotal/frontend/src/views/Cmp${item.label}Vue.vue`, gen(item.pl), (err) => console.log(err));
// })

// arr.forEach((item)=>{
//   console.log(`
  
//   {
//     path: '/${item.label2}',
//     name: '${item.label2}',
//     component: () => import(/* webpackChunkName: "about" */ '../views/Cmp${item.label}Vue.vue')
//   },`)
// })

let str="COMPANY_ID";
console.log(str.replace("_ID",""));