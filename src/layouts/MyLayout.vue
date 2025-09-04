<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          Saesol {{ db }} {{ schema ? "-" + schema : "" }} {{ apiserverurl }}
        </q-toolbar-title>
        <!-- 버튼 그룹 -->
        <!--q-btn-group rounded>
          <q-btn rounded color="primary" label="테이블로생성" @click="columninfo(tablename)" />
          <q-btn rounded color="primary" label="루트설정" @click="rootcolumninfo()" />
          <q-btn-dropdown auto-close rounded color="primary" label="여러테이블" split>

            <q-list padding style="width: 250px">
              <q-item clickable onClick="setGen()">
                <q-item-section avatar>
                  <q-avatar icon="folder" color="purple" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>서버전송</q-item-label>
                  <q-item-label caption>서버에서 프로그램을 생성</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section avatar>
                  <q-avatar icon="folder" color="purple" text-color="white" />
                </q-item-section>
                <q-item-section @click="openFile()">
                  <q-item-label>Videos</q-item-label>
                  <q-item-label caption>London</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-separator inset />
              <q-item-label header inset>Files</q-item-label>

              <q-item clickable>
                <q-item-section avatar>
                  <q-avatar icon="assignment" color="teal" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>London</q-item-label>
                  <q-item-label caption>March 1st, 2018</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section avatar>
                  <q-avatar icon="assignment" color="teal" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Paris</q-item-label>
                  <q-item-label caption>January 22nd, 2017</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-btn-group-->
        <q-btn-group>
          <q-btn color="primary" label="ApiServer">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section @click="updateApiurl('https://dev.saesolsoft.com:54321/code')">
                    gen
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="updateApiurl('http://cast2.saesolsoft.com:55555/code')">
                    cast2
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="updateApiurl('http://localhost:55555/code')">
                    localhost
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn color="primary" label="페이지">
            <q-menu persistent auto-close>
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section><router-link to="/logout"><span>로그아웃</span></router-link></q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section><router-link to="/signin"><span>로그인화면</span></router-link></q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section><router-link to="/sign"><span>회원가입화면</span></router-link></q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section><router-link to="/gen"><span>전자정부</span></router-link></q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section><router-link to="/gen/cmp"><span>스프링부트</span></router-link></q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section><router-link to="/gen/node"><span>express</span></router-link></q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section><router-link to="/gen/php"><span>php</span></router-link></q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn color="primary" label="IPPPAGE">
            <q-menu persistent auto-close>
              <q-list style="min-width: 100px">
                <!-- BJ TS 여기에 페이지들 여동 하세요-->
                <q-item clickable>
                  <q-item-section><router-link to="/gen/cmp"><span>스프링부트</span></router-link></q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn color="primary" label="MYSQL">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="(item, key) in dbs['mysql']" :key="key.database_name">
                  <q-item-section @click="tablelist(item)">{{
                      item.database_name
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn color="primary" label="PGSQL">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="(item, key) in dbs['pgsql']" :key="key.database_name">
                  <q-item-section @click="tablelist(item)">{{
                      item.database_name
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <router-link to="/contents" style="display: none">
            <q-btn color="primary" label="소스보기"></q-btn>
          </router-link>
          <router-link to="/gen" style="display: none">
            <q-btn color="primary" label="codegen"></q-btn>
          </router-link>
          <router-link to="/table" style="display: none">
            <q-btn color="primary" label="컨트롤러"></q-btn>
          </router-link>
          <q-btn color="primary" label="oracle" style="display: none">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="(item, key) in dbs.oracle" :key="key.database_name">
                  <q-item-section @click="tablelist(item)">{{
                      item.database_name
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn color="primary" label="sql server" style="display: none">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="(item, key) in dbs.mssql" :key="key.database_name">
                  <q-item-section @click="tablelist(item)">{{
                      item.database_name
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn color="primary" label="Pgsql" style="display: none">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="(item, key) in dbs.pgsql" :key="key.database_name">
                  <q-item-section @click="tablelist(item)">{{
                      item.database_name
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn color="primary" label="Mysql" style="display: none">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="(item, key) in dbs.mysql" :key="key.database_name">
                  <q-item-section @click="tablelist(item)">{{
                      item.database_name
                  }}</q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>Help &amp; Feedback</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn color="primary" label="tibero" style="display: none">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="(item, key) in dbs.tibero" :key="key.database_name">
                  <q-item-section @click="tablelist(item)">{{
                      item.database_name
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <router-link to="/tables" style="display: none">
            <q-btn color="primary" label="등록조회"></q-btn>
          </router-link>
          <q-btn icon="menu" @click="right = !right" />
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <q-card>
        <q-tabs v-model="tabdb" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
          narrow-indicator>
          <q-tab name="tables" label="테이블리스트" />
          <q-tab name="views" label="뷰리스트" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tabdb" animated>
          <q-tab-panel name="views">
            <q-list bordered padding>
              <q-item clickable v-for="(item, index) in filteredList" :key="index" v-if="item.table_comment === 'VIEW'"
                v-on:click="getTableInfo(item)">
                <q-item-section>
                  <q-item-label lines="1">{{ item.table_name }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="add" color="green" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="tables">
            <q-list>
              <q-item-label header>
                <q-input outlined v-model="search" placeholder="Search table.." dense="dense" />
              </q-item-label>

              <q-item clickable v-for="(item, index) in filteredList" :key="index" v-if="item.table_comment !== 'VIEW'">
                <q-item-section>
                  <q-item-label lines="1">{{ item.table_name }}</q-item-label>
                  <q-item-label caption>{{ item.table_comment }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="add" color="green" v-on:click="getTableInfo(item)" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <!-- drawer content
       {{ticked}} {{selected}}
        <q-tree
          :nodes="codelist"
          tick-strategy="strict"
          :ticked.sync="ticked"
          :selected.sync="selected"
          :expanded.sync="expanded"
          node-key="label"
        />
      -->
    </q-drawer>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">컬럼추가 준비중</div>
        </q-card-section>

        <q-card-section>{{ addColunmData }}</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="addColunmDataReset()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-drawer v-model="right" side="right" bordered>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <breadcrumbs :absolutePath="selectedFolder" @selected="onSelectedFolder" />
      </q-toolbar>
      <!--shortcuts @selected="onShortcutSelected" /-->
      <contents :contents="contents" :listType="listType" :viewType="viewType" @click="onClicked"
        @dblClick="onDblClicked" />
      <folder-tree :rootDir="rootDir" :folder.sync="selectedFolder" :lazyLoad="onLazyLoad"
        @selected="onSelectedFolder" />
      <!--pre>{{field}} {{fields}}</pre-->
      <q-list bordered padding>
        <div style="display: none">
          <div @dragover.prevent @drop="drop" id="target" style="height: 100px">
            drop here...
          </div>
          <q-item-label header>
            <q-input outlined v-model="searchMenu" placeholder="Search table.." />
          </q-item-label>
          {{ tables2 }} {{ filterColumns }} {{ selecteditems }}
        </div>
        <q-item v-for="(item, index) in filterSelectedtablesArray" :key="index" style="display: none">
          <q-item-section>
            <q-item-label lines="1">
              <span draggable="true" @dragstart="dragstart_handler">
                {{ item.table }}
                <q-btn align="right" class="btn-fixed-width" size="xs" color="secondary" label="컬럼추가"
                  @click="addColunm(item)" />
              </span>
              <ul style="padding: 0; padding-left: 0px; margin: 0">
                <li style="list-style: none" v-for="(row, key) in item.filds" :key="key" draggable="true"
                  @dragstart="dragstart_handler">
                  <q-checkbox v-model="columns" :label="row.column_name + '(' + row.column_comment + ')'" color="teal"
                    :val="item.table + '.' + row.column_name" />
                </li>
              </ul>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-for="(item, index) in filteredMenus" :key="index" v-if="
          item.menuNo > 8000000 && item.chkURL !== 'dir' && item.upperMenuId !== '0'
        ">
          <q-item-section>
            <q-item-label lines="1">{{ item.menuNm }}</q-item-label>
            <!--q-item-label-- caption>/singarea/{{item.dir.toLowerCase()}}/select{{item.dir2.toLowerCase().replace("&","")}}.do</!--q-item-label-->
            <!--q-item-label caption>{{item.upperMenuId}}</!--q-item-label>
            <q-item-label caption>{{item.menuOrdr}}</q-item-label>
            <q-item-label-- lines="1">{{item.chkURL}}</q-item-label-->
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// const apiServer = "http://cast2.saesolsoft.com:55555/code";
import { openURL } from "quasar";
import mysql from "mysql";
//import { futimes } from "fs";
const remote = require("electron").remote;
const app = remote.app;
const { ipcRenderer } = require("electron");

// identify mime types
const mime = require("mime-types");

const fs = require("fs");
const path = require("path");

// file watcher
const chokidar = require("chokidar");

import walkFolders from "../util/walkFolders";
import getWindowsDrives from "../util/getWindowsDrives";
import breadcrumbs from "../components/breadcrumbs.vue";
// import shortcuts from "../components/shortcuts.vue";
import folderTree from "../components/folderTree.vue";
import contents from "../pages/contents.vue";

class Post {
  constructor(title, link, author, img) {
    this.title = title;
    this.link = link;
    this.author = author;
    this.img = img;
  }
}
export default {
  name: "MyLayout",
  components: {
    breadcrumbs,
    // shortcuts,
    "folder-tree": folderTree,
    contents,
  },
  data() {
    return {
      viewType: "nodes",
      leftDrawerOpen: true, // this.$q.platform.is.desktop,
      toolbarLinks: [], // toolbar pathway (links to each folder in path)
      drive: process.platform === "win32" ? "C:" : "",
      drives: [],
      listType: "grid", // default ['grid', 'list']
      selectedFolder: null, // the selected node (label)
      rootDir: [], // tree view
      contents: [], // children of a node
      watcher: null,
      obj: [],
      objs: [],
      tabdb: "tables",
      tabsource: "vo",
      addColunmData: {},
      addColunmDataPost: {
        type: "varchar",
        len: 50,
        name: "",
        null: "NOT",
      },
      pgsqlDataType: [
        "VARCHAR",
        "CHAR",
        "DATE",
        "NUMERIC",
        "SMALLINT",
        "BIGINT",
        "DECIMAL",
        "DOUBLE",
        "FLOAT",
        "INTEGER",
        "REAL",
        "TIME",
        "TIMESTAMP",
      ],
      alert: false,
      confirm: false,
      prompt: false,
      selected: "",
      ticked: [],
      expanded: [],
      leftDrawerOpen: this.$q.platform.is.desktop,
      columns: [],
      tables2: [],
      alltables: [],
      left: true,
      right: false,
      mysql: mysql,
      connection: null,
      connection2: null,
      search: "",
      schemaed: "",
      selectedtablesArray: [],
      optionschemas: ["foodatarak", "singaria", "sakila"],
      searchMenu: "",
      postList: [],
    };
  },
  created: function () {
    ipcRenderer.send("message", "We have liftoff!");

    if (process.platform === "win32") {
      getWindowsDrives((error, drives) => {
        // console.log(drives);
        // drives = ['C:\\Users\\dokjin\\app\\singarea\\src'];
        if (!error) {
          this.drives = drives;
          // work through the drives backwards
          for (let index = this.drives.length - 1; index >= 0; --index) {
            try {
              const stat = fs.statSync(this.drives[index] + path.sep);
              let fileInfo = {};
              fileInfo.rootDir = this.drives[index];
              fileInfo.fileName = path.sep;
              fileInfo.isDir = stat.isDirectory();
              fileInfo.stat = stat;
              let node = this.createNode(fileInfo);
              this.rootDir.unshift(node);
              //console.log("########",this.rootDir);
            } catch (error) {
              // remove from (bad/phantom) drive list
              this.drives.splice(index, 1);
              console.error(error);
            }
          }
        }
      });
    } else {
      // set and get root folder's folders
      this.setSelectedFolder(this.drive + path.sep);
      this.rootDir.push(...this.getFolders(this.selectedFolder));
    }

    this.$root.$on("rescan-current-folder", this.rescanCurrentFolder);
  },
  beforeDestroy: function () {
    this.$root.$off("rescan-current-folder", this.rescanCurrentFolder);
  },
  mounted() {
    //if(!this.schema) this.$store.commit("updateSchema", "foodatarak");
    this.getSchmeas();
    this.selectedtablesArray = [];
    this.getAlltables();
    //this.tablelist();
  },
  computed: {
    apiserverurl: {
      // return this.$store.state.apiserverurl;
      get() {
        return this.$store.state.apiserverurl;
      },
      set(value) {
        this.$store.state.apiserverurl = value;
        this.getSchmeas();
      },
    },
    dbs() {
      return this.$store.state.dbs;
    },
    db() {
      return this.$store.state.db;
    },
    schemas() {
      return this.$store.state.schemas;
    },
    schema() {
      return this.$store.state.schema;
    },
    tables() {
      return this.$store.state.tables;
    },
    table() {
      return this.$store.state.table;
    },
    items() {
      return this.$store.state.items;
    },
    item() {
      return this.$store.state.item;
    },
    fields() {
      this.$store.commit("updateFields", this.objs);
      return this.objs;
    },
    field() {
      this.$store.commit("updateField", this.obj);
      return this.obj;
    },
    selecteditems() {
      return this.$store.state.selecteditems;
    },
    selectedtables() {
      return this.$store.state.selectedtables;
    },
    codelist() {
      return this.$store.state.codelist;
    },
    loginvolist() {
      return this.$store.state.loginvo;
    },
    rowKey() {
      return this.$store.state.rowKey;
    },
    tablename() {
      return this.$store.state.tablename;
    },
    tablecomment() {
      return this.$store.state.tablecomment;
    },
    menus() {
      return this.$store.state.menus;
    },
    filteredList() {
      return this.tables.filter((post) => {
        return post.table_name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    filteredMenus() {
      return this.menus.filter((post) => {
        return post.menuNm.toLowerCase().includes(this.searchMenu.toLowerCase());
      });
    },
    filterColumns() {
      this.$store.commit("updateSelectedItems", this.columns);
      return this.columns;
    },
    //filterTables(){
    //this.$store.commit("updateSelectedTables", this.selectedtablesArray);
    //  return this.selectedtablesArray;
    //},
    filterSelectedtablesArray() {
      //this.$store.commit("updateSelectedTables", this.table2);
      let array = this.selectedtablesArray.filter((post, i) => {
        return (
          this.selectedtablesArray.findIndex((item, j) => {
            return post.table === item.table;
          }) === i
        );
      });
      this.$store.commit("updateSelectedTables", array);
      return array;
    },
  },
  watch: {
    selectedFolder: function (newFolder, oldFolder) {
      // The User can de-select a folder, in which case
      // value will be null, so use root folder
      if (!newFolder) {
        newFolder = this.drive + path.sep;
      }

      // tell back-end to serve files from this folder
      ipcRenderer.send("folder", newFolder);

      // folder watcher handler
      this.folderWatcherHandler(newFolder, oldFolder);

      this.clearAllContentItems();
      this.contents.push(...this.getFolderContents(newFolder));
    },
  },
  methods: {
    openURL,
    addColunm: function (item) {
      this.addColunmData = item;
      this.alert = true;
    },
    addColunmDataReset: function () {
      this.addColunmData = {};
      this.alert = false;
    },
    updateApiurl: function (str) {
      this.$store.commit("updateApiserverurl", str);
      this.getSchmeas();
    },
    drop: function (ev) {
      //var data = ev.dataTransfer.getData("text");

      var data = ev.dataTransfer.getData("text");
      //ev.target.appendChild(document.getElementById(data));
      // console.log(data);
    },
    dragstart_handler: function (ev) {
      // console.log("22222", ev);
      //ev.preventDefault();
      ev.dropEffect = "move";
      ev.dataTransfer.setData("text/plain", ev.target.innerText);
    },
    getAlltables() {
      this.$axios
        .get(this.apiserverurl + "/mysqltlistall/foodatarak")
        .then((response) => {
          this.data = response.data;
          //console.log(this.data);
          //this.$store.commit("updateTables", this.data);_self.$store.commit("updateItems", rows);
          this.$store.commit("updateCodeList", this.data);
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "mylayout tableinfo mylist Loading failed",
            icon: "report_problem",
          });
        });
    },
    getSchmeas() {
      this.$axios
        .get(this.apiserverurl + "/schemas")
        .then((response) => {
          this.data = response.data;
          console.log(this.data, "Asdasdasd");
          this.$store.commit("updateDbs", this.data);
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "getSchmeas Loading failed",
            icon: "info",
          });
        });
    },
    getTableInfo: function (item) {
      this.tableinfo(item);
    },
    tablelist: function (item) {
      this.$store.commit("updateDb", item.dbtype_name);
      this.$store.commit("updateSchema", item.database_name);
      //this.$store.commit("updateDb", "mysql");
      //this.$store.commit("updateSchema", "FOODATARAK");
      let url = this.apiserverurl + "/" + this.db + "tlist/" + this.schema;

      console.log(url);
      this.$axios
        .get(url)
        .then((response) => {
          this.data = response.data;
          // console.log(this.data);
          this.$store.commit("updateTables", this.data);
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "tableinfo Loading failed",
            icon: "info",
          });
        });
    },
    selectedtablesReset() {
      this.selectedtablesArray = [];
      this.$store.commit("updateSelectedTables", []);
    },
    tableinfo: function (item) {
      //this.$store.commit("updateSelectedTables", item);
      let setTable = this.schema + "/" + item.table_name;
      // console.log(setTable);
      let url = this.apiserverurl + "/" + this.db + "tinfo/" + this.db + "/" + setTable;
      let url2 = this.apiserverurl + "/" + this.db + "list/" + this.db + "/" + setTable;
      this.$axios
        .get(url)
        .then((response) => {
          this.data = response.data;
          this.objs = response.data;
          console.log(this.objs);
          console.log(url, "tableinfo", this.objs);
          this.obj = [];

          var rows = this.objs;
          for (var i = 0; i < rows.length; i++) {
            //console.log("Query succesfully executed", rows[i]);
            if (rows[i].pk_flag === "Y") {
              this.$store.commit("updateRowKey", rows[i].column_name);
            }
            if (i === 0) {
              this.obj.push({
                headerName: rows[i].column_name,
                name: rows[i].column_name,
                field: rows[i].column_name,
                label: rows[i].column_name,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                sortable: true,
                editable: true,
                filter: "agTextColumnFilter",
              });
            } else {
              this.obj.push({
                headerName: rows[i].column_name,
                name: rows[i].column_name,
                field: rows[i].column_name,
                label: rows[i].column_name,
                sortable: true,
                editable: true,
                filter: "agTextColumnFilter",
              });
            }
          }

          this.$store.commit("updateField", this.obj);
          this.$store.commit("updateFields", this.objs);
          this.$store.commit("updateTableName", rows[0].table_name);
          this.$store.commit(
            "updateTableComent",
            rows[0].table_comment ? rows[0].table_comment : rows[0].table_name
          );
          let names = rows[0].table_name;
          this.selectedtablesArray.push({
            table: rows[0].table_name,
            db: rows[0].dbtype_name,
            schema: rows[0].schemaname,
            filds: this.data,
          });
          console.log(this.selectedtablesArray);
          //this.$store.commit("updateSelectedTables", this.selectedtablesArray);
        })
        .catch((e) => {
          console.log(e);
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "mylayout tableinfo Loading failed",
            icon: "info",
          });
        });

      this.$axios
        .get(url2)
        .then((response) => {
          this.data = response.data;
          //console.log(this.data);
          //this.$store.commit("updateTables", this.data);_self.$store.commit("updateItems", rows);
          this.$store.commit("updateItems", this.data);
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "mylayout tableinfo mylist Loading failed",
            icon: "report_problem",
          });
        });
    },
    onSelectedFolder: function (absolutePath) {
      this.setSelectedFolder(absolutePath);
    },
    onShortcutSelected: function (type) {
      // console.log('onShortcutSelected type:', type)
      let absolutePath = app.getPath(type);
      this.setSelectedFolder(absolutePath);
    },
    onFileSelected: function (node) {
      console.log(node);
    },
    // called by folderTree component
    onLazyLoad: function ({ node, key, done, fail }) {
      if (this.loadChildren(node, key)) {
        done();
      } else {
        // if we don't call done, then the tree will
        // allow user to try and expand node again
        done();
      }
    },
    loadChildren: function (node, key) {
      try {
        if (node.children.length) {
          node.children.splice(0, node.children.length);
        }
        for (const fileInfo of walkFolders(key, 0)) {
          // we only want folders
          if (!fileInfo.isDir) {
            continue;
          }
          // create a new node
          const n = this.createNode(fileInfo);
          // add child to parent
          node.children.push(n);
        }
        return true;
      } catch (err) {
        // usually access error
        console.error("Error: ", err);
      }
      return false;
    },
    onClicked: function (node) {
      // on single-clicks we don't do anything here
      // if we wanted to drill-down into folders, we
      // can call this.onDblClicked function.
    },
    onDblClicked: function (node) {
      // This causes a drill-down if it's a folder
      if (node.data.isDir) {
        this.setSelectedFolder(node.nodeKey);
      } else {
        this.onFileSelected(node);
      }
    },
    checkForDrive: async function (drives, index) {
      return new Promise(function (resolve, reject) {
        try {
          const stat = fs.statSync(drives[index] + ":" + path.sep);
          drives[index] += ":\\";
          resolve(stat);
        } catch (error) {
          // remove from drives list
          drives.splice(index, 1);
          reject(error);
        }
      });
    },
    rescanCurrentFolder: function () {
      this.clearAllContentItems();
      this.contents.push(...this.getFolderContents(this.selectedFolder));
    },
    setFolder: function (folder) {
      this.selectedFolder = folder;
    },
    toggleListType: function () {
      if (this.listType === "grid") {
        this.listType = "list";
      } else {
        this.listType = "grid";
      }
    },
    clearAllContentItems: function () {
      this.contents.splice(0, this.contents.length);
    },
    addContentItem: function (item) {
      this.contents.push(item);
    },
    setSelectedFolder: function (folder) {
      this.selectedFolder = folder;
      // handle windows drive
      if (process.platform === "win32") {
        if (this.selectedFolder.charAt(this.selectedFolder.length - 1) === ":") {
          this.selectedFolder += path.sep;
        }
      }
    },
    getFolders: function (absolutePath) {
      let folders = [];

      // check incoming arg
      if (!absolutePath || typeof absolutePath !== "string") {
        return folders;
      }

      for (const fileInfo of walkFolders(absolutePath, 0)) {
        // all files and folders
        if ("error" in fileInfo) {
          console.error(`Error: ${fileInfo.rootDir} - ${fileInfo.error}`);
          continue;
        }
        // we only want folders
        if (!fileInfo.isDir) {
          continue;
        }
        const node = this.createNode(fileInfo);
        folders.push(node);
      }
      return folders;
    },
    getFolderContents: function (folder) {
      let contents = [];

      // check incoming arg
      if (!folder || typeof folder !== "string") {
        return contents;
      }

      for (const fileInfo of walkFolders(folder, 0)) {
        // all files and folders
        if ("error" in fileInfo) {
          console.error(`Error: ${fileInfo.rootDir} - ${fileInfo.error}`);
          continue;
        }
        const node = this.createNode(fileInfo);
        contents.push(node);
      }

      return contents;
    },
    createNode: function (fileInfo) {
      let nodeKey = fileInfo.rootDir;
      if (nodeKey.charAt(nodeKey.length - 1) !== path.sep) {
        nodeKey += path.sep;
      }
      if (fileInfo.fileName === path.sep) {
        fileInfo.fileName = nodeKey;
      } else {
        nodeKey += fileInfo.fileName;
      }
      // get file mime type
      const mimeType = mime.lookup(nodeKey);
      // create object
      return {
        label: fileInfo.fileName,
        nodeKey: nodeKey,
        expandable: fileInfo.isDir,
        tickable: true,
        lazy: true,
        children: [],
        data: {
          rootDir: fileInfo.rootDir,
          isDir: fileInfo.isDir,
          mimeType: mimeType,
          stat: fileInfo.stat,
        },
      };
    },

    folderWatcherHandler: function (newFolder, oldFolder) {
      if (oldFolder && this.watcher) {
        this.watcher.close();
      }
      if (newFolder) {
        // let backend know to statically serve files from this folder
        ipcRenderer.send("folder", newFolder);

        this.watcher = chokidar.watch(newFolder, {
          depth: 0,
          ignorePermissionErrors: true,
        });
        if (this.watcher) {
          this.watcher.on("ready", () => {
            // initial scan done
            // watch for additions
            this.watcher.on("raw", (event, path, details) => {
              this.$root.$emit("rescan-current-folder");
            });
          });
          this.watcher.on("error", (error) => {
            // initial scan done
            console.error(error);
          });
        }
      }
    },
  },
};
</script>

<style>
.q-drawer {}

.main {
  padding-top: 34px;
}

.box {
  width: 600px;

  height: 150px;

  overflow-y: scroll;
}

.q-btn-group {
  box-shadow: none;
}

.q-btn {
  padding: 4px 8px;
  box-shadow: 0;
}
</style>
