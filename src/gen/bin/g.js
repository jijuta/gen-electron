const fs = require("fs");
const shell = require("shelljs");
const camelCase = require("camelcase");
// var oracledb = require("oracledb"); // Removed for compatibility
let frontDir = "./src/main/webapp/naraport";
let backendDir = "./src";
oracletable = function(query) {
  oracledb.getConnection(
    {
      user: "naraport",
      password: "naraport",
      connectString: "pc/CYWOMEN"
    },
    function(err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }
      connection.execute(`SELECT * FROM all_all_tables`, function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.rows);
        doRelease(connection);
      });
    }
  );
};

function doRelease(connection) {
  connection.close(function(err) {
    if (err) console.error(err.message);
  });
}

console.log(process.argv);
/**
 * 명령어 아큐먼트
 */
let commend = process.argv[2];
let jsonurl = process.argv[3];
let dir = process.argv[4];
//let dir2 = process.argv[5];

let json = JSON.parse(fs.readFileSync(jsonurl, "utf8"));
let router = json.router;

/*
for (var prop in json) {
  if (json.hasOwnProperty(prop)) {
  }
}
*/
/**
 * pages  생성
 */
pagesFnc = function(moduleDir, endfilename, item) {
  let camelCaseName = camelCase(item.name);

  let r = `
<template>
  <div class="${item.name}">
    <${item.name}Component ref="${item.name}" msg="${item.title}" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ${item.name}Component from '@/components/${
    item.name
  }Component.vue' // @ is an alias to /src

@Component({
  components: {
    ${item.name}Component
  }
})
export default class ${item.name} extends Vue {}
</script>

<style lang="less" scoped>

</style>
`;

  fs.writeFile(endfilename, r, function(err) {
    if (err) throw err;
    console.log(endfilename + "Saved!");
  });

  let c = `
<template>
  <div class="comp-${item.name}">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ${item.name}Component extends Vue {
    str: string = 'sample string data'
    @Prop() private msg!: string
}
</script>
<style lang="less">

</style>
`;

  fs.writeFile(
    frontDir + "/src/components/" + item.name + "Component.vue",
    c,
    function(err) {
      if (err) throw err;
      console.log(
        frontDir + "/src/components/" + item.name + "Component.vue Saved!"
      );
    }
  );
};
/**
 * 라우터 생성
 */
routeFnc = function(moduleDir, router) {
  let routeData;
  routeData = ""; // undefined 처리
  for (var items in router) {
    let item = router[items];
    //console.log(item);
    let camelCaseName = camelCase(item.name);
    routeData += `
  { path: '/${item.name}', name: '${item.name}', title: '${
      item.title
    }', component: () => import('./${moduleDir}${
      item.path
    }/${camelCaseName}.vue') },`;
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
  fs.writeFile(frontDir + "/src/router.ts", r, function(err) {
    if (err) throw err;
    console.log(frontDir + "/src/router.ts Saved!");
  });
};

navFnc = function(router) {
  let navData;
  navData = ""; // undefined 처리
  for (var items in router) {
    let item = router[items];
    navData += `
            <li class="nav-item active">
                <router-link to="/${
                  item.name
                }" class="nav-link" ><i class="ion-aperture"></i> ${item.title}
                <span class="sr-only">(current)</span>
                </router-link>
            </li>`;
  }
  let r = `
<template>
  <header id="header" class="header">
    <nav class="navbar navbar-expand-lg container">
      <router-link to="/" class="navbar-brand mr-auto mr-lg-0" >
        <img src="/images/logo.png" alt>
      </router-link>
      <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
        <i class="fa fa-align-justify" style="font-size:30px; color:#0063a8;"></i>
      </button>
      <!--/button navbar-toggler p-0 border-0-->
      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          ${navData}
        </ul>
        <!--/navbar-nav mr-auto-->
      </div>
      <!--navbar-collapse offcanvas-collaspse-->
      <span class="zoomCtrl">
        <!-- <em>화면 확대/축소</em> -->
        <a href="#;" onClick="zoomReset();" class="font-reset" title="기본">기본</a>
        <a href="#;" onClick="zoomIn();" class="font-plus" title="확대">+</a>
        <a href="#;" onClick="zoomOut();" class="font-minus" title="축소">-</a>
      </span>
      <!--/zoomCtrl-->
    </nav>
    <!--/navbar navbar-expand-lg container-->
  </header>
  <!--/header-->
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class navComponent extends Vue {}
</script>

<style>
.header{
  position: fixed;
  width:100%;
  background-color: #ffffff;
}
</style>
  
  `;
  fs.writeFile(frontDir + "/src/components/nav-component.vue", r, function(
    err
  ) {
    if (err) throw err;
    console.log(frontDir + "/src/components/nav-component.vue Saved!");
  });
};
/**
 * App.vue
 */
appFnc = function(router) {
  let routeData;
  routeData = ""; // undefined 처리
  for (var items in router) {
    let item = router[items];
    //console.log(item);
    let camelCaseName = camelCase(item.name) || item.name;
    routeData += `        <li><router-link to="/${item.name}">${
      item.title
    }</router-link></li>
`;
  }
  let r = `
<template>
  <div id="app">
    <div id="nav">
      <ul>
${routeData}      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
`;

  fs.writeFile(frontDir + "/src/app.vue", r, function(err) {
    if (err) throw err;
    console.log(frontDir + "/src/app.vue Saved!");
  });
};

for (var items in router) {
  let item = router[items];
  let moduleDir = frontDir + "/src/" + dir + "/" + item.path;

  let View = frontDir + "/src/" + dir + "/" + item.path + "/" + item.name + ".vue";
  let Llist =
    frontDir + "/src/" + dir + "/" + item.path + "/" + item.name + "Deteil.vue";
  let Insert =
    frontDir + "/src/" + dir + "/" + item.path + "/" + item.name + "Insert.vue";
  let Update =
    frontDir + "/src/" + dir + "/" + item.path + "/" + item.name + "Update.vue";

  if (!fs.existsSync(moduleDir)) {
    shell.mkdir("-p", moduleDir);
  }
  if (commend === "view") {
    pagesFnc(moduleDir, View, item);
  }
  console.log(item.path);
}

/**
 * 라우터 생성
 */
//appFnc(router);
//navFnc(router);
routeFnc("views", router);
//oracletable();