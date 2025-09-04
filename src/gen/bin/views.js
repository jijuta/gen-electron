const fs = require("fs");
const shell = require("shelljs");
const camelCase = require("camelcase");
const res = require("../config/db.js");
const sqls = require("../config/mapper.js");
const config = require("../config/config.js");
const cTrl = require("../tpl/egovWeb.js");
const cTBL = require("../tpl/tbl.js");
const utils = require("../tpl/utils.js");
const setViews = require("../tpl/commend.js");
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
let jsonurl = "../config/router.json";
let json = JSON.parse(fs.readFileSync(jsonurl, "utf8"));
const router = json.router;

let views = async function (item, callback2) {
  
  config.ViewName = item.tableview;
  config.tablename = item.table;
  config.codedirTitle = item.title;
  if(item.table===""){
    await viewCreate(null, null, null, item, null)
  }else{
    await sqls.getTableinfo('table', item.table).then((sqlQuery => {
       res.getCommend2('table', sqlQuery, '', '', item, callback2, null)
    }))
  }
 
}

let viewCreate = async function (datas, endfilename, moduleDir, item, callback3) {
  
  //let name = item.parentName?item.parentName + item.name.capitalizeFirstLetter():item.name;
  let name = item.parentName?item.name:item.name;
  
  let nameFirst = name.capitalizeFirstLetter();
  let payLoad=[],inserted, selected, updated, res, 
        viewDir, viewsFile, componentDir, componentFile;
  if(datas){
    //console.log(payLoad.data);
    payLoad = await setViews.setJavaGen(datas, item)

  }else{
    payLoad=[];
  }
  
  //let viewName  = item.parentName? '/' + item.parentName  + item.path: item.path;
  let viewName  = item.parentName? '/' + item.parentName : item.path;
  
  viewDir       = json.viewdir + '' + viewName;
  viewsFile     = viewDir +'/'+ nameFirst + '.vue';

  //let componentName = item.parentName? '/' + item.parentName  + item.path: item.path;
  let componentName = item.parentName? '/' + item.parentName : item.path;
  
  componentDir  = json.componentDir + '' + componentName;
  //let nameFirstComponent = item.parentName? item.parentName.capitalizeFirstLetter():item.name.capitalizeFirstLetter();
  componentClass= nameFirst  + 'Component';
  componentFile = componentDir +'/'+ componentClass + '.vue';
  
  await commentCreate(componentDir, componentClass,  componentFile, item);
  //console.log(viewsFile);

  let viewTpl = `
<template>
  <div class="${name}">
    <${componentClass} ref="${name}"  @reset-msg="resetMsg"  :items="items" title="${item.title}" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ${componentClass} from "./components${item.path}/${componentClass}.vue"; // @ is an alias to /src
import api from "@/api";

@Component({
  components: {
    ${componentClass}
  }
})
export default class ${nameFirst} extends Vue {
  $refs!: {
    ${name}: ${nameFirst}
  }
  msg: string = '123'
  busMsg: string = '456'
  mounted() {
    setTimeout(() => {
        this.msg = '메세지 입니다.'
    }, 3000)
    console.log(this.$refs.${name})
  }
  resetMsg(msg: string) {
    this.msg = msg
  }
}
</script>

<style lang="less" scoped>
</style>  
`
  if (!fs.existsSync(viewDir)) {
    shell.mkdir("-p", viewDir);
  }
  
  await fs.writeFile(viewsFile, viewTpl, function (err) {
    if (err) throw err;
    //console.log(viewsF, "Saved!");
    console.log(item.name, componentClass);
    
  });
}

let commentCreate = async function(componentDir, componentClass,  componentFile, item){

  let Tpl = `
<template>
  <div class="${componentClass}">
        <h5>${item.title}</h5>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator'

@Component
export default class ${componentClass} extends Vue {
  @Prop() private title!: string;
  @Prop() private items!: any;
}

</script>

<style lang="less" scoped>
</style>  

`
  if (!fs.existsSync(componentDir)) {
    shell.mkdir("-p", componentDir);
  }

  await fs.writeFile(componentFile, Tpl, function (err) {
    if (err) throw err;
    //console.log(viewsF, "Saved!");
    console.log(componentFile);
  });
}





let routerCreate = async function(){
  let routeData;
  routeData = ""; 

  for (var items in router) {
    let item = router[items];
    let payLoad;
    let camelCaseName = camelCase(item.name);
    let nameFirst = item.name.capitalizeFirstLetter();
  
    routeData += `
  { path: '${item.path}', name: '${item.name}', title: '${item.title}', component: () => import('./views${item.path}/${nameFirst}.vue') },`;

    
    if (item.sub) {
      for (var subs in item.sub) {
        let sub = item.sub[subs];
        let camelCaseNameSub = camelCase(sub.name);
        let nameFirstSub = sub.name.capitalizeFirstLetter();
        let path = sub.parentName? sub.parentName + sub.path:sub.path;
        routeData += `
  { path: '/${path}', name: '${sub.name}', title: '${sub.title}', component: () => import('./views${item.path}/${nameFirstSub}.vue') },`;
      }
    }
  }



  let routerTs = `
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

fs.writeFile(json.frontDir + "/router.ts", routerTs, function (err) {
  if (err) throw err;
  console.log(json.frontDir + "/router.ts Saved!");
});


}
let  main  = async function(){
  for (var items in router) {
    let item = router[items];
    let payLoad;

    
    await views(item,viewCreate);
    
    if (item.sub) {
      for (var subs in item.sub) {
        let sub = item.sub[subs];

        await views(sub,viewCreate);
        //console.log("### sub : ", sub);
        //views(sub,viewCreate);
      }
    }
  }
}
//routerCreate();

main();