import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.axios = Vue.prototype.$axios = axios
Vue.use(Vuex)
const resourceHost = "http://localhost:3000"

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      items: [],
      itme: {},
      table: {},
      tables: [],
      fields: [],
      field: [],
      selecteditems: [],
      selectedtables: [],
      codelist: [],
      loginvo: [],
      rowKey: '',
      tablename: '',
      tablecomment: '',
      schemas: '',
      schema: '',
      dbs: ["mysql", "pgsql", "sqlserver", "oracle"],
      db: 'mysql',
      menus: [],
      apiserverurl: 'http://localhost:8888/code',
      backendurl: 'http://localhost:8888',
      accessToken: null,
      token: "",
      aut: false,
      loginData: {
        id: "",
        email: "",
        authenticated: false
      },
      emptyUerInfo: {
        id: "",
        pw: "",
        uuid: 0
      },
      userInfo: {
        id: "",
        pw: "",
        uuid: 0
      },
      updateModalVisible: false,
      createModalVisible: false,
    },
    getters: {
      backendurl(state) {
        return state.backendurl;
      },
      loginData(state, getters) {
        return state.loginData;
      },
      hasSession() {
        console.log("aaa", localStorage.getItem('token'));
        return localStorage.getItem('token') !== null;
      }
    },
    actions: {
      async LOGIN({ commit }, { email, password }) {
        const { data } = await axios
          .post(`${resourceHost}/login`, { email, password })
        return commit("LOGIN", data)
      },
      LOGOUT({ commit }) {
        commit("LOGOUT")
      },
      getLoginData({ commit, /*state*/ }, /*payload*/) {
        axios.get(`${resourceHost}/getLoginData`)
          .then((res) => {
            commit('updateLoginData', res.data);
          })
          .catch((res) => {
            commit('globalError', res);
          });
      }
    },
    mutations: {
      deleteSession(state) {
        state.userInfo = this.emptyUerInfo;
        state.token = "";
        state.aut = false;
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
      },
      initSession(state, payload) {
        localStorage.setItem('token', `token of user (ID : ${payload.userId})`);
        state.token = localStorage.getItem('token');
        localStorage.setItem('isAuthenticated', `${payload.userId}`);
        
        // 인증 상태 업데이트
        state.aut = true;
        
        // 서버에서 받은 사용자 정보를 store에 저장
        if (payload.userInfo) {
          state.userInfo = payload.userInfo;
        }
        if (payload.loginData) {
          state.loginData = payload.loginData;
        }
        
        console.log("initSession ", localStorage.getItem('token'), state.userInfo);
      },
      toggleUpdateModal(state) {
        state.updateModalVisible = !state.updateModalVisible;
      },
      toggleCreateModal(state) {
        state.createModalVisible = !state.createModalVisible;

      },
      LOGIN(state, { accessToken }) {
        state.accessToken = accessToken
      },
      LOGOUT(state) {
        state.accessToken = null
      },
      globalError(/*state, payload*/) {
        console.log('ERROR!');
      },
      updateLoginData(state, items) {
        state.loginData = items
      },
      updateBackendurl(state, items) {
        state.backendurl = items
      },
      updateApiserverurl(state, items) {
        state.apiserverurl = items
      },
      updateDbs(state, items) {
        state.dbs = items
      },
      updateDb(state, items) {
        state.db = items
      },
      updateSchemas(state, items) {
        state.schemas = items
      },
      updateSchema(state, items) {
        state.schema = items
      },
      updateItems(state, items) {
        state.items = items
      },
      updateItem(state, items) {
        state.item = items
      },
      updateTables(state, items) {
        state.tables = items
      },
      updateTable(state, items) {
        state.table = items
      },
      updateFields(state, items) {
        state.fields = items
      },
      updateField(state, items) {
        state.field = items
      },
      updateSelectedItems(state, items) {
        state.selecteditems = items
      },
      updateCodeList(state, items) {
        state.codelist = items
      },
      updateSelectedTables(state, items) {
        state.selectedtables = items
      },
      updateloginvoList(state, items) {
        state.loginvo = items
      },
      updateRowKey(state, items) {
        state.rowKey = items
      },
      updateTableName(state, items) {
        state.tablename = items
      },
      updateTableComent(state, items) {
        state.tablecomment = items
      },
      updateMenus(state, items) {
        state.menus = items
      },
    },
    strict: false
  })

  return Store
}

