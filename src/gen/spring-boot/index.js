import Controller from "./api.js"
import Dao from "./dao.js"
import InsertReq from "./insertReq.js"
import SearchReq from "./searchReq.js"
import UpdateReq from "./updateReq.js"
import Xml from "./mapperXml.js"
import Pagination from "./pagination.js"
import SelectRes from "./selectRes.js"
import Service from "./service.js"
import ServiceImpl from "./serviceImpl.js"
import Vue from "./vue-template/vue.js"
import VueWithComponents from "./vue-template/vue-with-component.js"
import VueWithAgGrid from "./vue-template/vue-with-aggrid.js"
import VueCreateModal from "./vue-template/vue-components/VueCreateModal.js"
import VueDetailModal from "./vue-template/vue-components/VueDetailModal.js"
import VueUpdateModal from "./vue-template/vue-components/VueUpdateModal.js"
import VueTable from "./vue-template/vue-components/VueTable.js"
import VueAgGridTable from "./vue-template/vue-components/VueAgGridTable.js"

export default {
    Controller: Controller.getCtrl,
    Dao: Dao.getDao,
    InsertReq: InsertReq.getCtrl,
    SearchReq: SearchReq.getCtrl,
    UpdateReq: UpdateReq.getCtrl,
    Xml: Xml.getMapperXml,
    Pagination: Pagination.getPagination,
    SelectRes: SelectRes.getCtrl,
    Service: Service.getCtrl,
    ServiceImpl: ServiceImpl.getCtrl,
    Vue: Vue.getCtrl,
    VueCreateModal: VueCreateModal.getCtrl,
    VueUpdateModal: VueUpdateModal.getCtrl,
    VueDetailModal: VueDetailModal.getCtrl,
    VueTable: VueTable.getCtrl,
    VueWithComponents: VueWithComponents.getCtrl,
    VueAgGridTable:VueAgGridTable.genAgGrid,
    VueWithAgGrid:VueWithAgGrid.genAgGrid
}

