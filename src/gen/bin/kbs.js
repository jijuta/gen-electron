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
let jsonurl = "../config/kbs.json";
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

  let viewTpl =`
<template>
  <div class="${name}">
    <h3>{{items.title}}</h3>
    <${componentClass} ref='${name}'  :items='items'  />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ${componentClass} from '@/components${componentName}/${componentClass}.vue';
import api from '@/api';

@Component({
  components: {
    ${componentClass},
  },
})
export default class ${nameFirst} extends Vue {
  $refs!: {
    ${name}: ${nameFirst};
  }

  public items: any = {
    message: '',
    title: '',
    spinning: false,
    loading: false,
    pageIndex: 1,
    recordCountPerPage: 10,
    totalcnt: 0,
    payload: [],
    result: [],
    params: [],
    func: () => {
    }
  }

  mounted() {
    setTimeout(() => {
      this.items.title = '${item.title} 부모에서  로드 되었습니다.';
    }, 3000);
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
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';

@Component
export default class ${componentClass} extends Vue {
    @Prop() public items!: any;

    mounted() {
      setTimeout(() => {
            this.items.title = '${item.title} 자식에서 로드 되었습니다.';
      }, 6000)
    };
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
  { path: '${item.path}', name: '${item.name}', title: '${item.title}', component: () => import('./views${item.path}/${nameFirst}.vue'), },`;

    
    if (item.sub) {
      for (var subs in item.sub) {
        let sub = item.sub[subs];
        let camelCaseNameSub = camelCase(sub.name);
        let nameFirstSub = sub.name.capitalizeFirstLetter();
        let path = sub.parentName? sub.parentName + sub.path:sub.path;
        routeData += `
  { path: '/${path}', name: '${sub.name}', title: '${sub.title}', component: () => import('./views${item.path}/${nameFirstSub}.vue'), },`;
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
  routes: routeData,
})
`;

fs.writeFile(json.frontDir + "/router.ts", routerTs, function (err) {
  if (err) throw err;
  console.log(json.frontDir + "/router.ts Saved!");
});


}

let navCreate = async function(){
  let routeData;
  routeData = ""; 

  for (var items in router) {
    let item = router[items];
    let payLoad;
    let camelCaseName = camelCase(item.name);
    let nameFirst = item.name.capitalizeFirstLetter();

    if (item.sub.length==0){
    routeData += `    
    <router-link to="${item.path}">${item.title}</router-link>`
    }
    //console.log("### ",item.sub)
    if (item.sub.length>0) {
      routeData += `
    <div class="dropdown">
      <button class="dropbtn">${item.title}<i class="fa fa-caret-down"></i></button>
      <div class="dropdown-content">`;
      for (var subs in item.sub) {
        let sub = item.sub[subs];
        let camelCaseNameSub = camelCase(sub.name);
        let nameFirstSub = sub.name.capitalizeFirstLetter();
        let path = sub.parentName? sub.parentName + sub.path:sub.path;
        routeData += `
        <router-link to="/${path}'">${sub.title}</router-link>`
      }
      routeData +=`
      </div>
    </div>`
    }
  }



  let routerTs = `
<template>
  <div class="${json.navComp}">
${routeData}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "@/api";

@Component({
  components: {
   
  }
})
export default class NavComp extends Vue {
  mounted() {
    console.log(this.$refs.${json.navComp});
  }
  resetMsg(msg: string) {
    console.log(msg);
  }
}
</script>

<style lang="less" scoped>

.${json.navComp} {
  overflow: hidden;
  background-color: #333;
}

.${json.navComp} a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.${json.navComp} .active {
  background-color: #4CAF50;
  color: white;
}

.${json.navComp} .icon {
  display: none;
}

.${json.navComp} .dropdown {
  float: left;
  overflow: hidden;
}

.${json.navComp} .dropdown .dropbtn {
  font-size: 17px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.${json.navComp} .dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.${json.navComp} .dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.${json.navComp} a:hover, .dropdown:hover .dropbtn {
  background-color: #555;
  color: white;
}

.${json.navComp} .dropdown-content a:hover {
  background-color: #ddd;
  color: black;
}

.${json.navComp} .dropdown:hover .dropdown-content {
  display: block;
}

@media screen and (max-width: 600px) {
  .${json.navComp} a:not(:first-child), .dropdown .dropbtn {
    display: none;
  }
  .${json.navComp} a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .${json.navComp}.responsive {position: relative;}
  .${json.navComp}.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .${json.navComp}.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
  .${json.navComp}.responsive .dropdown {float: none;}
  .${json.navComp}.responsive .dropdown-content {position: relative;}
  .${json.navComp}.responsive .dropdown .dropbtn {
    display: block;
    width: 100%;
    text-align: left;
  }
}

</style>
`;

fs.writeFile(json.componentDir + "/NavComp.vue", routerTs, function (err) {
  if (err) throw err;
  console.log(json.componentDir + "/NavComp.vue Saved!");
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
routerCreate();
navCreate();
main();
