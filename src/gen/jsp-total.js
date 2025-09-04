const setctrl = function(payload) {

  let r = `
  <template>
    <div class="subwrap">
      <div class="banner-comp">
          <div class="sub_visual usagestatusBg" style="margin-bottom: 50px; height: 165px;">
              <h1 style="padding-top: 30px; font-size: 34px; font-weight: bold;">${payload.codedirTitle}</h1>
              <div class="sub_visual_text">
                설명문구
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
                  페이징
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
                            <li class="breadcrumb-item"><a href="javascript: void(0);">{{pageinfo.title}}</a></li>
                            <li class="breadcrumb-item active" v-if="pageinfo.pageLocation !==''">{{pageinfo.location}}</li>
                        </ol>
                    </div>
                    <h4 class="page-title">{{pageinfo.title}}</h4>
                </div>
            </div>
        </div>
        <!-- end page title -->
        <!-- content page -->
        <!-- 검색영역 --> 
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-white text-dark" id="inputGroup-sizing-sm">{{pageinfo.title}}</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                        <div class="input-group-append" id="button-addon4">
                            <button class="btn btn-purple" type="button" @click="searchBoxShowHide()">{{searchBoxShowHideModelText}}</button>
                            <button class="btn btn-white" type="button" @click="searchBoxReset()">초기화</button>
                            <button class="btn btn-info" type="button" @click="select${payload.Sample}ListAllJson()">검색</button>
                        </div>
                    </div>
                </div>
                
                <div class="card" v-if="searchBoxShowHideModel">
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
        <!-- 데이타영역 --> 
        <div class="row">
            <div class="col-xl-8 col-md-6">
                <div class="card">
                    <div class="float-right">
                        총 {{items.resultList.totCnt}} 개
                    </div>
                    <h4 class="header-title">{{pageinfo.title}} 목록</h4>
                    <p class="header-docs" v-if="pageinfo.docs">{{pageinfo.docs}}</p>

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
                                    <td><button type="button" class="btn btn-primary btn-xs " style="padding:2px 4px" @click="select${payload.Sample}Detail(item)">보기</button></td><!-- 상세보기 -->
                                    ${payload.vueCommentBody}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <!-- paging navigation -->
                    <nav aria-label="Page navigation example" v-if="items.resultList.paginationInfo.totalPageCount">
                        <v-pagination v-model="searchVO.pageIndex" :page-count="items.resultList.paginationInfo.totalPageCount"></v-pagination>
                    </nav>
                    <!-- paging navigation END-->
                </div>

            </div>
            <!-- 등록, 수정, 삭제영역 -->
            <div class="col-xl-4 col-md-6">
                <div class="card text-center " v-bind:class="[msgClass, msgClassColor]" v-if="msg">
                    {{msg}}
                    <!-- <div class="float-right" @click="msg=''">닫기</div> -->
                </div>
                <div class="card" style="overflow-y: scroll;max-height: 900px;">
                    <div class="float-right">
                        <button type="button" class="btn btn-success btn-xs " @click="insert${payload.Sample}()"
                        v-if="${payload.Sample}Chk('insert')">등록</button>
                        <button type="button" class="btn btn-primary btn-xs " @click="update${payload.Sample}()"
                        v-if="${payload.Sample}Chk('update')">수정</button>
                        <button type="button" class="btn btn-danger btn-xs " @click="delete${payload.Sample}()"
                        v-if="${payload.Sample}Chk('delete')">삭제</button>
                    </div>
                    <h4 class="mt-0 header-title">{{pageinfo.title}} 관리</h4>

                    <p class="text-muted font-14 pt-2" v-if="pageinfo.docs">
                        {{pageinfo.docs}}
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
import vPagination from 'vue-plain-pagination'
import api from "@/api";
// import gCode from "@/config/gCode.js"

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
const ${payload.Sample}VOReset = { 
    ${payload.vueVo},
    pageIndex: 1,
    pageUnit: 10,
    pageSize: 10,
    recordCountPerPage: 10,
}

@Component({
    components: {
      vPagination
    }
})  
export default class ${payload.Sample} extends Vue {

    private msg = "";
    private servicUrl = "";
    private loading = false;
    private searchBoxShowHideModel = false;
    
    private msgClass = "bg-info";
    private msgClassColor = "";
    private openSearchBox  = '펼치기';
    private closeSearchBox  = '닫기';
    private searchBoxShowHideModelText = "펼치기";

    private pageinfo: any = {
        title: "${payload.pageTitle}",
        subtitle: "${payload.pageLocation}",
        docs:  "${payload.pageDocs}",
    };
    
    private gCode: any = [];
    private selectBoxitems: any = [];
    private selectBoxitem: any = {};
    private teamList: any = [];
    private items = {
        ${payload.Sample}VO : ${payload.Sample}VO,
        searchVO: ${payload.Sample}VO,
        data: [{${payload.Sample}VO}],
        results: "",
        msg: "",
        keyId:"",
        resultList: { body: [], bodyCnt:0, paginationInfo: ${payload.Sample}PageVO, totCnt: 0 },
        paginationInfo:${payload.Sample}PageVO,
    };
    private item: any = ${payload.Sample}VO;
    private selectItems: any = [];
    private setSelectItems: any = "";
    private searchVO: any = ${payload.Sample}VO;

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
       const url = '/${payload.SampleUrl}/select${payload.Sample}ListJson';
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
   ${payload.Sample}Chk(type) {
        const params = this.items.${payload.Sample}VO;
        let result= false;
        if(type==="insert"){
            if (${payload.notNulls}) result = true;
            return result;
        }else if(type==="update") {
            if (${payload.notNullsEdit}) result = true;
            return result;
        }else if(type==="delete") {
            if (${payload.deletekeys}) result = true;
            return result;
        }
   }
   async insert${payload.Sample} () {
       const params = this.items.${payload.Sample}VO;
       const url = '/${payload.SampleUrl}/insert${payload.Sample}Json';
       const result = await this.${payload.Sample}Chk("insert");
       
       if (result===false) {
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
               //this.items.${payload.Sample}VO = ${payload.Sample}VOReset;
               this.searchBoxReset();
               this.select${payload.Sample}ListAllJson();
           })
           .catch(error => {
               console.error(error);
               this.msg = "저장에 실패 하였습니다."
           });
       }
   };
   async update${payload.Sample} () {
      
       const url = '${payload.SampleUrl}/update${payload.Sample}Json';
       const params = this.items.${payload.Sample}VO;
       const result = await this.${payload.Sample}Chk("update");
       
       if (result===false) {
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
               //this.items.${payload.Sample}VO = ${payload.Sample}VOReset;
               this.searchBoxReset();
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
       const url = '${payload.SampleUrl}/delete${payload.Sample}Json';
       const params = this.items.${payload.Sample}VO;
       const result = await this.${payload.Sample}Chk("delete");
       
       if (result===false) {
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
       const url ='/${payload.SampleUrl}/select${payload.Sample}Detail';
       this.item = await obj;
   }
}
</script>`;

    return r;
}
module.exports = {
  getCtrl : setctrl2,
  getCtrl2 : setctrl
}