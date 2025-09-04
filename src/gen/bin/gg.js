const fs = require("fs");
const shell = require("shelljs");
const camelCase = require("camelcase");
const res = require("../config/db.js");
const sqls = require("../config/mapper.js");
const config = require("../config/config.js");
const cTrl = require("../tpl/egovWeb.js");
const cTBL = require("../tpl/tbl.js");
const utils = require("../tpl/utils.js");
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
/**
 * 코드제너레이터 전자정부 오라클, 티베로 
 * @param {타이틀} payload.codedirTitle 
 * @param {프라이머리 키} payload.SampleSmIdx 
 * @param {프라이머리키 데이타 형} payload.ControllerDataTypeName 
 * @param {서비스명} payload.Sample 
 * @param {페키지명} payload.codedir 
 * @param {테이블명} payload.table_name 
 * @param {프라이머리 키 디비필드명} payload.PriKeyNm 
 * @param {셀렉트} payload.selected 
 * @param {셀렉트조건} payload.searchConditionMapper 
 * @param {인서트문} payload.inserted 
 * @param {업데이트문} payload.updated
 * @param {resultMap} payload.resultMap 
 * @param {private} payload.SampleVoPrivate 
 * @param {public} payload.SampleVoPublic 
 */

/**
 * 
 * @param {쿼리 조회 데이타} datas 
 * @param {생성할 디렉토리} dir 
 * @param {*} item 
 */
let setJavaGen = function (payLoad, endfilename, moduleDir, item, callback) {

  let items = payLoad.data.rows;
  let tb = items[0];
  let tablename = config.tablename ? config.tablename : tb.TABLE_NAME;
  let codedirTitle = config.codedirTitle ? config.codedirTitle : tb.TABLE_COMMENTS;
  let SampleSmIdx = config.SampleSmIdx ? config.SampleSmIdx : "";
  let ControllerDataTypeName = config.ControllerDataTypeName ? config.ControllerDataTypeName : "";
  let Sample = config.Sample ? camelCase(config.Sample) : camelCase(tablename);
  let codedir = config.codedir ? config.codedir : "ect";
  let SampleUrl = codedir + '/' + Sample.toLowerCase();
  let PriKeyNm = config.PriKeyNm ? config.PriKeyNm : "ect";
  let SampleSmIdxUcfirst = utils.camalFirst(SampleSmIdx); //config.SampleSmIdx.capitalizeFirstLetter();
  let ViewName = config.ViewName ? config.ViewName : tablename;
  let viewdir = items.viewdir;
  let commentDir = items.commentDir;


  //제너레이터데이타조작
  let payload = {
    items: items,
    tb: tb,
    tablename: tablename,
    codedirTitle: codedirTitle,
    PriKeyNm: PriKeyNm,
    SampleSmIdx: SampleSmIdx,
    ControllerDataTypeName: ControllerDataTypeName,
    Sample: Sample,
    SampleLg: Sample.toUpperCase(),
    SampleSm: Sample.toLowerCase(),
    SampleUrl: SampleUrl,
    SampleSmIdxUcfirst: SampleSmIdxUcfirst,
    codedir: codedir,
    codedirDot: codedir.replace("/", "."),
    SampleVoPrivate: "",
    SampleVoPublic: "",
    table_name: tablename,
    selected: "",
    searchConditionMapper: "",
    inserted: "",
    interface:"",
    updated: "",
    resultMap: "",
    ViewName: ViewName,
    viewdir: viewdir,
    commentDir: commentDir,
    listsTitle:"",
    lists: ""

  }


  for (var i in items) {
    let row = items[i];
    if (row.PK_FLAG == 'Y') {
      payload.PriKeyNm = PriKeyNm ? PriKeyNm : row.COLUMN_NAME;
      payload.SampleSmIdx = SampleSmIdx ? SampleSmIdx : camelCase(row.COLUMN_NAME);
      payload.SampleSmIdxUcfirst = utils.camalFirst(payload.SampleSmIdx);
      payload.ControllerDataTypeName = ControllerDataTypeName ? ControllerDataTypeName : utils.dataType(row.DATA_TYPE);
    }
  }

  if (item.useyn === "Y" && item.table) payload.selected    = cTBL.getItemsObjcets(items);
  if (item.useyn === "Y" && item.table) payload.inserted    = cTBL.getItemsObjcets(items);
  if (item.useyn === "Y" && item.table) payload.interface   = cTBL.getInterFace(items);
  if (item.useyn === "Y" && item.table) payload.listsTitle  = cTBL.getLists(items,'th',true);
  if (item.useyn === "Y" && item.table) payload.lists       = cTBL.getLists(items,'td',false);
  if (item.useyn === "Y" && item.table) callback(endfilename, moduleDir, item, payload);

};

/**
 * VUE 에 views 폴데어 .vue 파일 생성
 *   
 * @param {filename 풀 파일명} endfilename 
 * @param {moduleDir 정보} item 
 * @param {라우터 정보} item 
 * @param {제너라이터 정보} payload 
 */
let setVueViews = function (endfilename, moduleDir, item, payload = null) {
  //console.log("setVueViews #### ", item);
//import ${item.name.capitalizeFirstLetter()} from "@/views${item.path}${item.subPath}${item.name.capitalizeFirstLetter()}${item.sub.capitalizeFirstLetter()}.vue"; // @ is an alias to /src

  let c;
  if (payload) {
    c = payload.inserted;
  } else {
    c = '';
  }
  let r = `
<template>
  <div class="${item.name}">
    <${item.name.capitalizeFirstLetter()}Component ref="${item.name}" :items="items" title="${item.name}" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ${item.name.capitalizeFirstLetter()}Component from "@/components${item.path}/${item.name.capitalizeFirstLetter()}Component.vue"; // @ is an alias to /src
import api from "@/api";

@Component({
  components: {
    ${item.name.capitalizeFirstLetter()}Component
  }
})
export default class ${item.name.capitalizeFirstLetter()} extends Vue {
  // 리스트 개수
  public recordCountPerPage: number = 10000;
  // 현재 페이지
  public loading: boolean = false;
  public spinning: boolean = false;

  public items: any = {
    message: "",
    title: "",
    spinning: false,
    loading: false,
    pageIndex: 1,
    recordCountPerPage: 10,
    totalcnt: 0,
    payload: [],
    result: [],
    params: [],
    addParams:(a:string, b:Number) =>{
       this.setParams(a, b);
    },
    setPages:(a:string) => {
       this.setPages(a);
    },
    handleLoadMore:() => {
       this.handleLoadMore();
    },
    setAction:(a:string, b:string) => {
       this.getAction(a, b);
    }
  };

  //인터페이스
  public itemsObjcets: Object | undefined = {};

  async mounted() {
    await this.initParams();
    //await this.getDatas();
    //await this.$nextTick();
  }

  // 이벤트 마다 파라미터를 오브젝트로 관리 하세요
  setParams(a: string, b: Number) {
    this.items.params.push({a : b});
  }

  //배열과 오브젝트로 구성된 파라미터를 오브젝트로 변경
  //async genParams(){
  genParams(){
    //console.log("###  this.items.params ", this.items.params);
    //let paramsArrayToString = awite this.items.params.join(' , ');
    //let params = awite  JSON.parse(paramsArrayToString);
    //console.log("###  params ", this.items.params);
    return JSON.parse(this.items.params.join(' , '));
  }

  // 파라미터 초기화
  initParams(){
    this.items.payload = {
      ${c}
    }
  }

  // 페이징 후 조회 
  setPages(num: string) {
    this.items.pageIndex = num;
    this.getDatas();
  }

  // 버튼 액션 이곳에 명령어에 따라 분기 처리 하면 됨.
  // ex) 컨포넌트의 미니차트조회, 통계조회 등등에 버튼을 퍼블리셔에게 가이드 해주세요
  getAction(a:string, b:string){
    
  }

  // 데이타 가져오기 
  async getDatas() {
    
    //페이징 파라미터 세팅
    await this.setParams('pageIndex' , this.items.pageIndex);
    await this.setParams('recordCountPerPage' , this.recordCountPerPage);
    const params = await  this.genParams();

    //데이타 호출 , 파라미터를 오브젝트로 변환해야 함
    this.items.payload = await api.get("/${item.name}", params);
    
    // 파라미터 초기화
    // this.items.params = [];
    // this.setParams(pageIndex : 1);
    // this.setParams(recordCountPerPage : this.recordCountPerPage);
    // this.genParams();

    //console.log("### n${item.name} ", this.items);
  }

  // 더보기버튼 
  async handleLoadMore() {
    this.spinning = true;
    await this.getDatas();
    this.spinning = false;
  }
}
</script>

<style lang="less" scoped>
</style>
`;


  if (!fs.existsSync(moduleDir)) {
    shell.mkdir("-p", moduleDir);
  }

  if (item.sub==="") {
    fs.writeFile(endfilename, r, function (err) {
      if (err) throw err;
      console.log("## VUE 뷰 ::         ", endfilename + " Saved!");
    });
  }

  //console.log("### ITEM",item.title,item.useyn , item.table );
  setComponent(`../naraport/src/components${item.path}/${item.name.capitalizeFirstLetter()}Component.vue`, `../naraport/src/components${item.path}`, item, payload);
  if (item.useyn === "Y" && item.table) setInterface(`../naraport/src/interfaces${item.path}/${item.name.capitalizeFirstLetter()}Interface.ts`, `../naraport/src/interfaces${item.path}`, item, payload);

};

let setComponent = function (endfilename, moduleDir, item, payload = null) {
  let inserted='',listsTitle='',lists='',listsItem,title=item.title,  html;
  
  if (payload) {
    title= payload.codedirTitle;
    inserted = payload.inserted;
    listsTitle= payload.listsTitle?payload.listsTitle:"";
    lists =  payload.listsTitle?payload.lists:"";
    html = "";
    html=`
    <!-- 검색바 -->
    <div class="input-group">
      <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
      <div class="input-group-append">
        <button type="button" class="btn btn-outline-secondary">Action</button>
        <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
          <div role="separator" class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>
        </div>
      </div>
    </div>
    <!--// 검색바 -->

    <!-- ${item.title} 목록 -->
  `
    html+=`  <table class="table">
      <thead class="thead-light">
        <tr>
${listsTitle}
        </tr>
      </thead>
      <tbody>
        <tr v-for="let (index, item)  in items.payload" >
${lists}
        </tr>
      </tbody>
    </table>
    <!--// ${item.title} 목록 -->

    <!-- ${item.title} 페이징 -->
    <div class="float-left">
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
    <!--// ${item.title} 페이징 -->

    <!-- ${item.title} 버튼 -->
    <div class="float-right">
      <button type="button" class="btn btn-primary">등록</button>
      <button type="button" class="btn btn-secondary">댓글</button>
      <button type="button" class="btn btn-success">만족도조사</button>
    </div>
    <!-- ${item.title} 버튼 -->
`;
  } else{
    html="";
  }
  let r = `
<template>
  <div class="hello">
    <h1>${title}</h1>
    ${html}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ${item.name.capitalizeFirstLetter()}Component extends Vue {
  @Prop() private title!: string;
  @Prop() private items!: any;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>

`;

  //console.log("## interface ::: ", moduleDir, endfilename);


  if (!fs.existsSync(moduleDir)) {
    shell.mkdir("-p", moduleDir);
  }

  fs.writeFile(endfilename, r, function (err) {
    if (err) throw err;
    console.log("## VUE 콤포넌트 ::   ", endfilename + " com Saved!");
  });
}

let setInterface = function (endfilename, moduleDir, item, payload = null) {
  let c;
  if (payload) {
    c = payload.interface;
  } else {
    c = '';
  }
  let r=`
export interface get${item.name.capitalizeFirstLetter()}Config {
  ${payload.SampleSmIdx}: ${payload.ControllerDataTypeName};
}

export interface ${item.name.capitalizeFirstLetter()}Item {
  ${c}
  [propName: string]: any;
}

export interface ${item.name.capitalizeFirstLetter()}sState {
  payload: Array<${item.name.capitalizeFirstLetter()}Item>;
  results: Array<${item.name.capitalizeFirstLetter()}Item>;
  inserted: Array<${item.name.capitalizeFirstLetter()}Item>;
  message: string;
  title: string,
  spinning: boolean;
  loading: boolean;
  pageIndex: Number;
  recordCountPerPage: Number;
  totalcnt: Number;
}

export interface ${item.name.capitalizeFirstLetter()}State {
  data: TopicItem;
  path: string;
}

export interface State {
  topics: ${item.name.capitalizeFirstLetter()}sState;
  topic: ${item.name.capitalizeFirstLetter()}State;
}
  `;
  if (!fs.existsSync(moduleDir)) {
    shell.mkdir("-p", moduleDir);
  }

  fs.writeFile(endfilename, r, function (err) {
    if (err) throw err;
    console.log("## VUE 인터페이스 :: ",endfilename + " Saved!");
  });
}

let routeFnc = function (moduleDir, router) {
  let routeData;
  routeData = ""; // undefined 처리
  for (var items in router) {
    let item = router[items];
    //console.log(item);
    let camelCaseName = camelCase(item.name);
    routeData += `
  { path: '${item.path}', name: '${item.name}', title: '${item.title}', component: () => import('./${moduleDir}${item.path}/${camelCaseName}.vue') },`;
  }
  let r = `
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routeData = [
${routeData}
]

export default new Router({
  mode: 'history',
  routes: routeData
})
`;
  fs.writeFile(frontDir + "/router.ts", r, function (err) {
    if (err) throw err;
    console.log(frontDir + "/router.ts Saved!");
  });
};

let commend = "table";
let frontDir = "../naraport/src";
let jsonurl = "../config/router.json";
let json = JSON.parse(fs.readFileSync(jsonurl, "utf8"));
let router = json.router;
//routeFnc("views",router);
for (var items in router) {
  let item = router[items];
  let moduleDir = frontDir + "/views/" + item.path;
  let endfilename = moduleDir + "/" + item.name.capitalizeFirstLetter() + ".vue";

  //console.log(item.path, dir);
  if (item.table) {
    config.ViewName = item.tableview;
    config.tablename = item.table;
    config.codedirTitle = item.title;
    sqls.getTableinfo(config.commend, config.tablename).then((sqlQuery => {
      res.getCommend2(config.commend, sqlQuery, endfilename, moduleDir, item, setJavaGen, setVueViews)
    }))
  } else {
    if (item.useyn === "Y") setVueViews(endfilename, moduleDir, item, null);
  }

}