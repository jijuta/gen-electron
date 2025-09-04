import Vue from 'vue'

import cTrl from "../gen/ctrl.js"
import cTrl2 from "../gen/ctrl2.js"
import voCtrl from "../gen/vo.js"
import daoCtrl from "../gen/dao.js"
import xmlCtrl from "../gen/xml.js"
import implCtrl from "../gen/impl.js"
import serviceCtrl from "../gen/service.js"
import jspListlCtrl from "../gen/jsp_list1.js"
import jspListlCtrl2 from "../gen/jsp_list2.js"
import jspDetailCtrl from "../gen/jsp-detail.js"
import jsTotalCtrl from "../gen/jsp-total.js"
import jspUpdatelCtrl from "../gen/jsp-update.js"
import jspAddCtrl from "../gen/jsp-add.js"
import jspJsonCtrl from "../gen/jsp-json.js"
import utils from "../gen/tpl/utilsvue.js";
// ag-grid 적용
import jspAgGridCtrl from "../gen/jsp-aggrid.js";

/**
 * #TS spring-boot
 */
 import springbootController from "../gen/spring-boot/api.js"
 import springbootSvc from "../gen/spring-boot/service.js"
 import springbootSvcImpl from "../gen/spring-boot/serviceImpl.js"

 import springbootPkReq from "../gen/spring-boot/pkReq.js"
 import springbootInsertReq from "../gen/spring-boot/insertReq.js"
 import springbootUpdateReq from "../gen/spring-boot/updateReq.js"
 import springbootSearchReq from "../gen/spring-boot/searchReq.js"
 import springbootSelectRes from "../gen/spring-boot/selectRes.js"
 import springbootPagination from "../gen/spring-boot/pagination.js"

 import springBootDao from "../gen/spring-boot/dao.js";
 import springBootMapperXml from "../gen/spring-boot/mapperXml.js";
 import springBootVue from "../gen/spring-boot/vue-template/vue.js";
 import springBootVueWithComponent from "../gen/spring-boot/vue-template/vue-with-component.js";
 import springbootVueDetailModal from "../gen/spring-boot/vue-template/vue-components/VueDetailModal.js";
 import springbootVueUpdateModal from "../gen/spring-boot/vue-template/vue-components/VueUpdateModal.js";
 import springbootVueCreateModal from "../gen/spring-boot/vue-template/vue-components/VueCreateModal.js";
 import springBootVueTable from "../gen/spring-boot/vue-template/vue-components/VueTable.js";
 import springBootVueAgGridTable from "../gen/spring-boot/vue-template/vue-components/VueAgGridTable.js"
 import springBootVueWithAgGrid from "../gen/spring-boot/vue-template/vue-with-aggrid.js"
// import {
//   springbootController,
//   springbootSvc,
//   springbootSvcImpl,
//   springbootPkReq,
//   springbootInsertReq,
//   springbootUpdateReq,
//   springbootSearchReq,
//   springbootSelectRes,
//   springbootPagination,
//   springBootDao,
//   springBootMapperXml,
//   springBootVue,
//   springBootVueWithComponent,
//   springbootVueDetailModal,
//   springbootVueUpdateModal,
//   springbootVueCreateModal,
//   springBootVueTable,
// } from "../gen/spring-boot";
Vue.springbootController = Vue.prototype.springbootController = springbootController;
Vue.springbootSvc = Vue.prototype.springbootSvc = springbootSvc;
Vue.springbootSvcImpl = Vue.prototype.springbootSvcImpl = springbootSvcImpl;
Vue.springbootPkReq = Vue.prototype.springbootPkReq = springbootPkReq;
Vue.springbootInsertReq = Vue.prototype.springbootInsertReq = springbootInsertReq;
Vue.springbootSearchReq = Vue.prototype.springbootSearchReq = springbootSearchReq;
Vue.springbootUpdateReq = Vue.prototype.springbootUpdateReq = springbootUpdateReq;
Vue.springbootSelectRes = Vue.prototype.springbootSelectRes = springbootSelectRes;
Vue.springbootPagination = Vue.prototype.springbootPagination = springbootPagination;
Vue.springBootDao = Vue.prototype.springBootDao = springBootDao;
Vue.springBootMapperXml = Vue.prototype.springBootMapperXml = springBootMapperXml;
Vue.springBootVue = Vue.prototype.springBootVue = springBootVue;
Vue.springBootVueWithComponent = Vue.prototype.springBootVueWithComponent = springBootVueWithComponent;
Vue.springbootVueDetailModal = Vue.prototype.springbootVueDetailModal = springbootVueDetailModal;
Vue.springbootVueUpdateModal = Vue.prototype.springbootVueUpdateModal = springbootVueUpdateModal;
Vue.springbootVueCreateModal = Vue.prototype.springbootVueCreateModal = springbootVueCreateModal;
Vue.springBootVueTable = Vue.prototype.springBootVueTable = springBootVueTable;
Vue.springBootVueAgGridTable=Vue.prototype.springBootVueAgGridTable=springBootVueAgGridTable;
Vue.springBootVueWithAgGrid=Vue.prototype.springBootVueWithAgGrid=springBootVueWithAgGrid;
/**
 * 
 */


// const utils = require("../gen/tpl/utils.js");
let sqlTableInfoQuery = "";
const groupBy = key => array =>
  array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
    }),
    {}
  );

Vue.sqlTableInfoQuery = Vue.prototype.sqlTableInfoQuery = sqlTableInfoQuery
Vue.groupBy = Vue.prototype.groupBy = groupBy
Vue.projectdir = Vue.prototype.projectdir = localStorage.getItem('projectdir')
Vue.packagedir = Vue.prototype.packagedir = localStorage.getItem('packagedir')
Vue.packagenm = Vue.prototype.packagenm = localStorage.getItem('packagenm')
Vue.dirfront = Vue.prototype.dirfront = localStorage.getItem('dir_front')
Vue.version = Vue.prototype.version = localStorage.getItem('version')

Vue.apiurl = Vue.prototype.apiurl = 'http://kbs.cinegear.kr:8080/kbserp'
Vue.toobartitle = Vue.prototype.toobartitle = 'SANGAREA ERP'
Vue.host = Vue.prototype.host = 'cast.saesolsoft.com'
Vue.dbname = Vue.prototype.dbname = 'woori_dev'
Vue.dbname2 = Vue.prototype.dbname2 = 'jewoo_dev'
Vue.user = Vue.prototype.user = 'saesol'
Vue.pass = Vue.prototype.pass = 'qwer1234!@#$'
Vue.host2 = Vue.prototype.host2 = 'localhost'
Vue.name2 = Vue.prototype.name2 = 'NationPrimate'
Vue.user2 = Vue.prototype.user2 = 'root'
Vue.pass2 = Vue.prototype.pass2 = 'qwer1234!@#$'
Vue.genRoot = Vue.prototype.genRoot = "../gen";


Vue.cTrl = Vue.prototype.cTrl = cTrl
Vue.cTrl2 = Vue.prototype.cTrl2 = cTrl2
Vue.voCtrl = Vue.prototype.voCtrl = voCtrl
Vue.implCtrl = Vue.prototype.implCtrl = implCtrl
Vue.xmlCtrl = Vue.prototype.xmlCtrl = xmlCtrl
Vue.serviceCtrl = Vue.prototype.serviceCtrl = serviceCtrl
Vue.daoCtrl = Vue.prototype.daoCtrl = daoCtrl
Vue.jspListlCtrl = Vue.prototype.jspListlCtrl = jspListlCtrl
Vue.jspListlCtrl2 = Vue.prototype.jspListlCtrl2 = jspListlCtrl2
Vue.jspDetailCtrl = Vue.prototype.jspDetailCtrl = jspDetailCtrl
Vue.jspUpdatelCtrl = Vue.prototype.jspUpdatelCtrl = jspUpdatelCtrl
Vue.jspAddCtrl = Vue.prototype.jspAddCtrl = jspAddCtrl
Vue.jspJsonCtrl = Vue.prototype.jspJsonCtrl = jspJsonCtrl
Vue.jsTotalCtrl = Vue.prototype.jsTotalCtrl = jsTotalCtrl
Vue.jspAgGridCtrl = Vue.prototype.jspAgGridCtrl = jspAgGridCtrl
Vue.dataTypeFnc = Vue.prototype.dataTypeFnc = function (key) { return utils.dataTypeFnc(key) }
Vue.dataTypeTs = Vue.prototype.dataTypeTs = function (key) { return utils.dataTypeTs(key) }
Vue.dataTypeInitValue = Vue.prototype.dataTypeInitValue = function (key) { return utils.dataTypeInitValue(key) }
Vue.dataTypeJavascript = Vue.prototype.dataTypeJavascript = function (key) { return utils.dataTypeJavascript(key) }
Vue.dataTypeinitTuTb = Vue.prototype.dataTypeinitTuTb = function (item, type) { return utils.dataTypeinitTuTb(item, type) }
Vue.dataTypeListHtml = Vue.prototype.dataTypeListHtml = function (item, type) { return utils.dataTypeListHtml(item, type) }
Vue.dataTypeListHeaderHtml = Vue.prototype.dataTypeListHeaderHtml = function (item, type) { return utils.dataTypeListHeaderHtml(item, type) }
Vue.dataTypeDetailHtml = Vue.prototype.dataTypeDetailHtml = function (item, type) { return utils.dataTypeDetailHtml(item, type) }
Vue.dataTypeHtml = Vue.prototype.dataTypeHtml = function (item) { return utils.dataTypeHtml(item) }
Vue.dataTypeUpdateHtml = Vue.prototype.dataTypeUpdateHtml = function (item) { return utils.dataTypeUpdateHtml(item) }
Vue.vueCommentBody = Vue.prototype.vueCommentBody = function (item) { return utils.vueCommentBody(item); }
Vue.voHtml = Vue.prototype.voHtml = function (payload, type) { return utils.voHtml(payload, type); }
Vue.vueComment = Vue.prototype.vueComment = function (item) { return utils.vueComment(item) }
Vue.vueInsertBox = Vue.prototype.vueInsertBox = function (item) { return utils.vueInsertBox(item); }
Vue.vueInsertBox2 = Vue.prototype.vueInsertBox2 = function (item) { return utils.vueInsertBox2(item); }
Vue.vueSearchBox = Vue.prototype.vueSearchBox = function (item) { return utils.vueSearchBox(item) }
Vue.vueSearchBox2 = Vue.prototype.vueSearchBox2 = function (item) { return utils.vueSearchBox2(item) }
Vue.dataTypeinitTuTb2 = Vue.prototype.dataTypeinitTuTb2 = function (item) { return utils.dataTypeinitTuTb2(item) }
Vue.dataTypeinitTuTb3 = Vue.prototype.dataTypeinitTuTb3 = function (item) { return utils.dataTypeinitTuTb3(item) }
Vue.dataTypenotNullslHtml = Vue.prototype.dataTypenotNullslHtml = function (item, type) { return utils.dataTypenotNullslHtml(item, type) }
Vue.vueVo = Vue.prototype.vueVo = function (item) { return utils.vueVo(item) }

// ag-grid type 추가
Vue.dataTypeAGgridData = Vue.prototype.dataTypeAGgridData = function (item) { return utils.dataTypeAGgridData(item) }