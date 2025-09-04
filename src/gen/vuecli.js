const setctrl = function(payload) {

  let r = `
  <template>
    <div class="subwrap">
      <div class="banner-comp">
          <div class="sub_visual usagestatusBg" style="margin-bottom: 50px; height: 165px;">
              <h1 style="padding-top: 30px; font-size: 34px; font-weight: bold;">${payload.codedirTitle}</h1>
              <div class="sub_visual_text">
                  <p>"더 발전되고 안정된 어촌어항시스템을 꿈꾸는 희망발전소"</p>
                  <p>지역별 어촌, 어항 상세 정보를 검색해보세요.</p>
              </div>
          </div>
      </div>
      <div class="container px-0">
          <div class="${payload.Sample}">
              <div class="row">
                  <div class="col-12 p-2">
                      <h3> ${payload.codedirTitle} 
                          <span class="pull-right actionButtonBox">
                              <button type="button" class="btn btn-outline-primary" @click="select${payload.Sample}ListAllJson()">조회</button>
                              <button type="button" class="btn btn-outline-secondary" @click="insert${payload.Sample}()">등록</button>
                          </span>
                      </h3>
                  </div>
              </div>
              
              <div class="searchBox">
                  <div class="row">
                      ${payload.insertBox}
                  </div>    
              </div>
              
              <div class="table-responsive listBox">
                  <table class="table table-striped ">
                      <thead>
                          <tr>
                              ${payload.columnComment}
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in items.resultList.body" :key="item.${payload.PriKeyNmCamel}"> 
                              ${payload.vueCommentBody}
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div class="pageBox">
                  <nav aria-label="Page navigation example">
                      <ul class="pagination">
                          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                          <li class="page-item"><a class="page-link" href="#">1</a></li>
                          <li class="page-item"><a class="page-link" href="#">2</a></li>
                          <li class="page-item"><a class="page-link" href="#">3</a></li>
                          <li class="page-item"><a class="page-link" href="#">Next</a></li>
                      </ul>
                  </nav>
              </div>
              
          </div>
      </div>
  </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  // import ${payload.Sample}Component from '@/components/${payload.Sample}Component.vue' // @ is an alias to /src
  import loading from "@/components/loading.vue";
  import api from "@/api";
  
  @Component({
    components: {
      // ${payload.Sample}Component,
       loading
    }
  })
  export default class ${payload.Sample} extends Vue {
    page: number = 1;
    loading: boolean = false;
    spinning: boolean = false;
  
    items: any = {
      ${payload.Sample}VO: [{
          ${payload.vueVo}
      }],
      searchVOL: [{
          ${payload.vueVo}
      }],
      data: [{ ${payload.vueVo}}],
      result: [],
      msg: ""
    };

    lists: any = this.items;

    
  
    async mounted() {
      await this.select${payload.Sample}ListAllJson()
      //await this.getTopics();
      //await this.$nextTick();
    }
    async select${payload.Sample}ListAllJson() {
      const topics: Array<any> | undefined = [];
      const page: number = 1;
      this.loading = true;
      const items = await api.get('/${payload.SampleUrl}/select${payload.Sample}ListJson', this.items.${payload.Sample}VO);
  
      this.lists = { data: items.data.resultList.body, results: "success" };
      console.log("### items ", this.items);
    }

    async insert${payload.Sample} () {
      const items = await api.post('/${payload.SampleUrl}/insert${payload.Sample}Json', this.items.${payload.Sample}VO);
      console.log("### items ", this.items);
    }
    async handleLoadMore() {
      this.spinning = true;
      // await this.getTopics();
      this.spinning = false;
    }
  }
  </script>
  
  <style lang="less" scoped>
      .actionButtonBox button{
          margin-left:10px;
      }
  </style>
  `;

  return r;
}
// 나라포트 6차 VUE CLI
function setctrl2(payload) {
    let r = `
<template>
    <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">{{title}}</a></li>
                            <li class="breadcrumb-item"><a href="javascript: void(0);">{{parentTitle}}</a>
                            <li class="breadcrumb-item active" v-if="menuTitle !==''">{{menuTitle}}</li>
                        </ol>
                    </div>
                    <h4 class="page-title">{{title}}</h4>
                </div>
            </div>
        </div>
        <!-- end page title -->
        <!-- content page -->

        <div class="row">
            <div class="col-12">
                <div class="card-box">
                    <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-white text-dark" id="inputGroup-sizing-sm">{{title}}</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                        <div class="input-group-append" id="button-addon4">
                            <button class="btn btn-purple" type="button" @click="searchBoxShowHide()">{{searchBoxShowHideModelText}}</button>
                            <button class="btn btn-white" type="button" @click="searchBoxReset()">초기화</button>
                            <button class="btn btn-info" type="button" @click="select${payload.Sample}ListAllJson()">검색</button>
                        </div>
                    </div>
                </div>
                
                <div class="card-box" v-if="searchBoxShowHideModel">
                    <!-- Form row -->
                    <div class="row">
                        <div class="col-md-12">

                            <form>
                                <div class="form-row">
                                    ${payload.insertBox}
                                </div>
                            </form>

                        </div>
                    </div>
                    <!-- end row -->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-8 col-md-6">
                <div class="card-box">
                    <div class="float-right">
                        총 {{items.resultList.totCnt}} 개
                    </div>
                    <h4 class="mt-0 header-title">{{codePageItem.label}} 목록
                    </h4>
                    <p class="text-muted font-14 mb-3" v-if="pageDataDoc">
                       {{pageDataDoc}}
                    </p>

                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th class="thlen-60">작업</th>
                                    ${payload.columnComment}
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in items.resultList.body" :key="item.${payload.PriKeyNmCamel}"> 
                                    <td><button type="button" class="btn btn-primary btn-xs " style="padding:2px 4px" @click="select${payload.Sample}Detail(item)">보기</button></td><!--  -->
                                    ${payload.vueCommentBody}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <!-- paging navigation -->
                    <nav aria-label="Page navigation example" v-if="items.resultList.paginationInfo.totalPageCount">
                        <v-pagination v-model="searchVO.pageIndex"
                            :page-count="items.resultList.paginationInfo.totalPageCount">
                        </v-pagination>
                    </nav>
                    <!-- paging navigation END-->
                </div>

            </div>
            <div class="col-xl-4 col-md-6">
                <div class="card-box text-center " v-bind:class="[msgClass, msgClassColor]" v-if="msg">
                    {{msg}}
                    <!-- <div class="float-right" @click="msg=''">닫기</div> -->
                </div>
                <div class="card-box" style="overflow-y: scroll;max-height: 900px;">
                    <div class="float-right">
                        <button type="button" class="btn btn-success btn-xs " @click="insert${payload.Sample}()"
                        v-if="items.${payload.Sample}VO.${payload.SampleSmIdxNm} && items.${payload.Sample}VO.${payload.SampleSmIdx}===0">등록</button>
                        <button type="button" class="btn btn-primary btn-xs " @click="update${payload.Sample}()"
                        v-if="items.${payload.Sample}VO.${payload.SampleSmIdxNm} && items.${payload.Sample}VO.${payload.SampleSmIdx}">수정</button>
                        <button type="button" class="btn btn-danger btn-xs " @click="delete${payload.Sample}()"
                        v-if="items.${payload.Sample}VO.${payload.SampleSmIdxNm} && items.${payload.Sample}VO.${payload.SampleSmIdx}">삭제</button>
                    </div>
                    <h4 class="mt-0 header-title">{{codePageItem.label}} 관리</h4>

                    <p class="text-muted font-14 pt-2" v-if="pageDoc">
                        {{pageDoc}}
                    </p>
                    <div class="row" style="">
                        ${payload.insertBox2}
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- content end -->
    </div><!-- end container -->
</template>
<script  lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Pagination from "@/components/Reqres.vue";
import api from "@/api";

@Component({
  components: {
    Pagination
  }
})

const ${payload.Sample}PageVO = {
    currentPageNo: 1,
    firstPageNo: 1,
    firstPageNoOnPageList: 1,
    firstRecordIndex: 0,
    lastPageNo: 1,
    lastPageNoOnPageList: 1,
    lastRecordIndex: 10,
    pageSize: 10,
    recordCountPerPage: 10,
    totalPageCount: 1,
    totalRecordCount: 4,
}
const ${payload.Sample}VO = { 
    ${payload.vueVo},
    pageIndex: 1,
    pageUnit: 10,
    pageSize: 10,
    recordCountPerPage: 10,
}
const ${payload.Sample}VOReset =  { 
    ${payload.vueVo},
    pageIndex: 1,
    pageUnit: 10,
    pageSize: 10,
    recordCountPerPage: 10,
}
export default class ${payload.Sample} extends Vue {

    msg: "";
    msgClass: "bg-info";
    msgClassColor: "";
    openSearchBox : '펼치기';
    closeSearchBox : '닫기';
    title: '${payload.codedirTitle}';
    parentTitle: 'parentTitle';
    menuTitle: 'menuTitle';
    pageDoc: 'pageDoc';
    pageDataDoc: 'pageDataDoc';
    searchBoxShowHideModel: false;
    searchBoxShowHideModelText: "펼치기";
    gCode: gCode;
    selectBoxitems: selectBoxitems;
    selectBoxitem: selectBoxitem;
    safeteamList: [];
    items: {
        ${payload.Sample}VO : ${payload.Sample}VO;
        searchVO: ${payload.Sample}VO;
        data: [{${payload.Sample}VO}];
        results: "";
        msg: "";
        keyId:"";
        resultList: { body: [], bodyCnt:0, paginationInfo: ${payload.Sample}PageVO, totCnt: 0 };
        paginationInfo:${payload.Sample}PageV;
    };
    item: {};
    selectItems: [];
    setSelectItems: "";
    searchVO: ${payload.Sample}VO;

    mounted() {
        this.select${payload.Sample}ListAllJson();
    };
    
   
   searchBoxShowHide() {
       this.searchBoxShowHideModel = this.searchBoxShowHideModel === false ? true : false;
       this.searchBoxShowHideModelText = this.searchBoxShowHideModel === false ? this.openSearchBox : this.closeSearchBox;
   };
   searchBoxReset() {
       this.items.${payload.Sample}VO = this.searchVO = ${payload.Sample}VOReset;
       //this.searchVO =${payload.Sample}VOReset;
       //this.select${payload.Sample}ListAllJson();
       console.log("insertVO",this.items.${payload.Sample}VO);
       console.log("searchVO",this.searchVO);
   };
   async select${payload.Sample}ListAllJson() {
       const page = 1;
       this.loading = true;
       const url = servicUrl + '/${payload.SampleUrl}/select${payload.Sample}ListJson';
       const params = this.searchVO;
       api.post(url, params)
       .then(response => {
           console.log('성공');
           this.items = response;
       })
       .catch(error => {
           console.error(error);
       });
   };
   async insert${payload.Sample} () {
       const params = this.items.${payload.Sample}VO;
       const url = servicUrl + '/${payload.SampleUrl}/insert${payload.Sample}Json';
       
       if (${payload.notNulls}) {
           this.msg = "필수값이 없습니다.";
           this.msgClass = "bg-danger";
           this.msgClassColor = "text-light"
           this.searchBoxReset();
           return false;
       } else {
           api.post(url, params)
           .then(response => {
               console.log('성공');
               this.msg = "저장에 성공 하였습니다.";
               this.msgClass = "bg-success";
               this.msgClassColor = "text-light"
               this.items.${payload.Sample}VO.code = "";
               this.items.${payload.Sample}VO.codeNm = "";
               this.items.${payload.Sample}VO.codeDc = "";
               this.select${payload.Sample}ListAllJson();
           })
           .catch(error => {
               console.error(error);
               this.msg = "저장에 실패 하였습니다."
           });
       }
   };
   async update${payload.Sample} () {
      
       const url = servicUrl + '${payload.SampleUrl}/update${payload.Sample}Json';
       const params = this.items.${payload.Sample}VO;
       if (${payload.notNulls}) {
           this.msg = "필수값이 없습니다.";
           this.msgClass = "bg-danger";
           this.msgClassColor = "text-light"
           this.searchBoxReset();
           return false;
       } else {
           api.post(url, params)
           .then(response => {
               console.log('수정 성공');
               this.msg = "수정에 성공 하였습니다.";
               this.msgClass = "bg-success";
               this.msgClassColor = "text-light"
               this.items.${payload.Sample}VO.code = "";
               this.items.${payload.Sample}VO.codeNm = "";
               this.items.${payload.Sample}VO.codeDc = "";
               this.select${payload.Sample}ListAllJson();
           })
           .catch(error => {
               console.log('실패');
               this.msg = "수정에 실패 하였습니다."
               this.msgClass = "bg-danger";
               this.msgClassColor = "text-light"
               console.error(error);
           });
       }
       
   };
   async delete${payload.Sample} () {
       const url = servicUrl + '${payload.SampleUrl}/delete${payload.Sample}Json';
       const params = this.items.${payload.Sample}VO;
       if (${payload.notNulls}) {
           this.msg = "필수값이 없습니다.";
           this.msgClass = "bg-danger";
           this.msgClassColor = "text-light"
           this.searchBoxReset();
           return false;
       } else {
           api.post(url, params)
           .then(response => {
               console.log('삭제 성공');
               this.msg = "삭제에 성공 하였습니다.";
               this.msgClass = "bg-success";
               this.msgClassColor = "text-light"
               this.searchBoxReset();
           })
           .catch(error => {
               console.log('실패');
               this.msg = "삭제에 실패 하였습니다."
               this.msgClass = "bg-danger";
               this.msgClassColor = "text-light"
               console.error(error);
           });
       }
   };
   async select${payload.Sample}Detail(obj) {
       const url = servicUrl + '/${payload.SampleUrl}/select${payload.Sample}Detail';
       const item = this.items.resultList.body.filter(function (str) {
           return str.${payload.PriKeyNmCamel} === obj.${payload.PriKeyNmCamel}
       });
       console.log(item);
       if (item) {
           this.items.${payload.Sample}VO = item[0];
       }
   }
}
</script>`;

    return r;
}
module.exports = {
  getCtrl : setctrl,
  getCtrl2 : setctrl2
}