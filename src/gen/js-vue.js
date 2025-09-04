const setctrl = function (payload, self) {
    let vHtml = `<template>
    <div id="${payload.SampleSm}">
        <!-- 로딩 시작 -->
        <div class="dimmer active" v-if="lodding">
            <div class="loader"></div>
        </div>
        <!-- 로딩 끝 -->
        <div class="container">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box">
                            <h4 class="page-title">${payload.pageTitle}</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="card p-2">
                    <!-- 검색영역 -->
                    <div class="row p-2">
                        <div class="input-group">
                            <!-- 타이틀영역, 검색 버튼  -->
                            <input type="text" class="form-control" placeholder="통합검색" aria-label=""
                                aria-describedby="button-addon4" v-model="searchVo.totalSearch" v-on:keyup.enter="lists('search')"
                                v-on:input="searchQuery=$event.target.value">

                            <div class="input-group-append" id="button-addon4">
                                <select style="width:80px;padding:0 5px; top:1px;" v-model="searchVo.recordCountPerPage"
                                    class="form-control custom-select d-inline-block position-relative">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="100">500</option>
                                    <option value="100">1000</option>
                                </select>
                                <button class="btn btn-xs btn-info" type="button" v-on:click="lists('search')">검색</button>
                                <button class="btn btn-xs btn-outline-secondary" type="button" v-on:click="clearsearch();">초기화</button>
                                <button class="btn btn-xs btn-outline-secondary" type="button" v-if="!showwide" @click="showwide=!showwide">펼쳐보기</button>
                                <button class="btn btn-xs btn-outline-secondary" type="button" v-else @click="showwide=!showwide">닫기</button>
                            </div>
                            <!-- 타이틀영역, 검색 버튼 끝 -->
                        </div>
                    </div>
                    <ul class="list-group overflow-auto" style="max-height:200px;" tabindex="0" v-bind:class="{ show: isActive }" v-on:mouseover="removeValue">
                        <li class="list-group-item" tabindex="-1" v-for="(el, index) in filterList"
                            v-on:click="searchVo.searchKeyword=el.name; lists('search'); isActive=true;searchQuery=''" v-on:keyup.enter="lists('search') ; isActive=true;">
                            <span>{{ el.name }}</span>
                        </li>
                    </ul>
                    <div v-if="showwide">
                        <div class="row">
                            <!-- 검색폼 시작 -->
                            <!-- 양식 1 {contentsRegistHtmlSearch} -->
                            <!-- 양식 2 {payload.contentsRegistHtml4} -->
                            ${payload.insertBox}
                            <!-- 검색폼 끝 -->
                           </div>
                    </div>
                    <!-- 검색영역 끝 -->				
                    <div class="row mx-0 pt-2">
                        <div class="col-12 col-lg-7 px-0">
                            <!-- 목록영역 -->
                            <div class="table-responsive">					
                                <table  id="dataTable" class="table text-center text-nowrap border mb-0 bg-white table-hover" style="cursor:pointer;" summary="${payload.pageTitle} 목록영역" arguments="${payload.pageTitle}" >
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>상세</th>
                                            <th><input type="checkbox" id="checkAll"  name="checkAll" title="<spring:message code='input.selectAll.title' />"></th>
                                            ${payload.thlist}
                                        </tr>
                                    </thead>
                                    <tbody id="dataTable" class="table-hover" v-cloak>
                                        <tr v-if="resultList.length == 0" class="nodata">
                                            <td colspan="2">조회결과가 없습니다.</td>
                                        </tr>
                                        <tr class="dataTr" v-for="(listdata, index) in resultList"
                                            v-bind:data-${payload.SampleSm}="listdata.${payload.SampleSmIdx}">
                                            <td>{{paginationInfo.firstRecordIndex + index + 1}}</td>
                                            <td><input type="button" class="btn btn-primary btn-sm"
                                                value="상세" v-on:click="detailfnc(listdata.${payload.SampleSmIdx})"></td>
                                            <td><input type="checkbox" :value="listdata.${payload.SampleSmIdx}" /></td>
                                            ${payload.thlistajax}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- 목록영역 끝-->
                            <!-- paging navigation -->
                            <div class="pagination w-100">
                                <v-pagination
                                class="pagination pagination-sm justify-content-center"
                                v-model="params.pageIndex"
                                @input="pagings"
                                :page-count="paginationInfo.totalPageCount"
                                :classes="bootstrapPaginationClasses"> </v-pagination>
                            </div>
                            <!-- paging navigation END-->
                        </div>
                        <!-- 등록영역 -->
                        <div class="col-12 col-lg-5 pd-custom pr-0">
                            <div class="card">
                                <div class="card-body text-center" style="padding: 0.5rem 1.5rem;">
                                    <button type="button" class="btn btn-secondary btn-sm" v-on:click="cleardetail()">
                                        초기화
                                    </button>
                                    <button type="button" class="btn btn-secondary btn-sm" v-on:click="insertfnc()">
                                        신규
                                    </button>

                                    <button type="button" class="btn btn-secondary btn-sm" v-on:click="updatefnc()">
                                        수정
                                    </button>

                                    <button type="button" class="btn btn-danger btn-sm" v-on:click="deletefnc()">
                                        삭제
                                    </button>

                                    <button type="button" class="btn btn-success btn-sm" v-on:click="excelDownLoadfnc()"> 
                                        엑셀
                                    </button>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <!-- 등록폼 시작 -->
                                        <!-- 양식 1{contentsRegistHtml4} -->
                                        <!-- 양식 2{payload.insertBox2} -->
                                ${payload.insertBox2}
                                        <!-- 등록폼 끝-->
                                    </div>
                                </div>
                            </div>						
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<template>
<script>
import axios from 'axios';
import vPagination from 'vue-plain-pagination'
import api from "@/api";

export default {
      name: '#${payload.SampleSm}',
      components: {
        vPagination,
        datepicker,
      },
      data(): any {
        return {
            insertUrl:"/${payload.SampleUrl}/insert${payload.Sample}.do",
            deleteUrl:"/${payload.SampleUrl}/delete${payload.Sample}.do",
            searchUrl:"/${payload.SampleUrl}/select${payload.Sample}ListJson",
            updateUrl:"/${payload.SampleUrl}/update${payload.Sample}.do",
            detailUrl:"/${payload.SampleUrl}/select${payload.Sample}Detail.do",
            listUrl  :"/${payload.SampleUrl}/select${payload.Sample}ListJson",
            pageIndex:1,
            resultPage:10,
            prikeynm:'${payload.SampleSmIdx}',
            checkbox:[],
            lodding:false,
            showwide: false,
            bootstrapPaginationClasses: {
                ul: 'pagination',
                li: 'page-item',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'page-link'
            },
            resultList: [],
            payloadList: [],
            insertResultList: [],
            paginationInfo: {},
            params: {
                pageIndex: 1,
                recordCountPerPage: 10
            },
            showTable: false,
            items:{
                descasc:'desc'
                , orderby:''
                , searchKeyword:''
                , totalSearch:''
                ${payload.contentsRegistHtmlItemType}
            },
            searchVo:{
                descasc:'desc'
                , orderby:''
                , searchKeyword:''
                , totalSearch:''
                ${payload.contentsRegistHtmlItemType}
            },
            clearVo:{
                descasc:'desc'
                , orderby:''
                , searchKeyword:''
                , totalSearch:''
                ${payload.contentsRegistHtmlItemType}
            },
            pageVo:{
                descasc:'desc'
                , orderby:''
                , searchKeyword:''
                , totalSearch:''
                ${payload.contentsRegistHtmlItemType}
            },
            isActive: false,
            searchQuery: '',
            names: []
        }
    },
    created: function () {
        window.onpopstate = function(event) {
            if(Cm.validation.isNull(event.state)){// 첫 페이지 로드시 state가 없음으로 전 페이지로 이동
                location.replace(document.referrer); 
            }else{
                if(Cm.validation.isNull(event.state.searchVo)){ // state에 searchVo가 없을 때
                    this.pageVo = this.clearVo;	 			
                } else {				
                    this.pageVo = event.state.searchVo;
                }
                this..params.pageIndex = event.state.pageIndex;
                this.lists('reloadBack');
            }  
        };
    },
    mounted: function () {

        //	메인에서 넘어왔을 때 파라미터 받는 부분
        let uri = window.location.href.split('?');// 메인에서 넘어왔을 때 파라미터 받는 부분
        if (uri.length == 2) {
            let vars = uri[1].split('&');
            let getVars = {};
            let tmp = '';
            vars.forEach(function (v) {
                tmp = v.split('=');
                if (tmp.length == 2)
                    getVars[tmp[0]] = tmp[1];
            });
        }
        // 1. 처음 페이지 로드/새로고침 할 시
        if(Cm.validation.isNull(history.state) || performance.navigation.type == 1){
            this.lists('search');
            
        } else {
            if(!Cm.validation.isNull(history.state.searchVo)){
                this.pageVo = history.state.searchVo;
            }
            this.params.pageIndex = history.state.pageIndex;
            this.lists("reloadBack");
        }		
    },
    computed: {
        filterList: function(data) {
            const str = this.searchQuery;
            const reg = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|s]/.test(str);
            if (reg === false && str !== '' && str !== ' ') {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        },
    },
    methods: {
        ${payload.datePickerFncSearch}
        ${payload.datePickerFncInsert}
        successFnc: async function (response, callback){
            if(response.data.hasOwnProperty("success")){
                alert(response.data.success);
                if(callback) this[callback];
            } else if(response.data.hasOwnProperty("error")){
                alert(response.data.error);
                if(callback) this[callback];
            } else {
                if(callback) this[callback];
            }
        },
        errorFnc: async function(error, callback){
            let msg = "";
            if (error.response) {
                msg= "요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.";
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                msg= "요청이 이루어 졌으나 응답을 받지 못했습니다..";
                console.log(error.request);
            } else {
                msg= "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다..";
                console.log('Error', error.message);
            }
            console.log(error.config);
            alert(msg);
            this.load_cont = true;
            if(callback){
                this[callback];
            }
        },
        removeValue: function() {
            if (document.querySelector('.r').classList.contains('key')) {
                document.querySelector('.r').classList.remove('key');
                document.querySelector('.r li.sel').classList.remove('sel');
            }
        },
        pagings: function(pageIndex){
            this.lists('paging');			  
        },
        insertPushState: function(pageIndex, vo, title, url) {    		
            if(!title) title = null;
            if(!url) url = null;
            history.pushState({
                pageIndex: pageIndex,
                searchVo : vo
            }, title, url);
        },
        godetail: function (str) {// 통합검색
            this.searchVo.totalSearch = str;
            this.lists('search');
        },
        clearsearch: function() {
            this.searchVo = Cm.util.clone(this.clearVo);
            this.lists('search');
        },
        cleardetail: function() {
            this.items = Cm.util.clone(this.clearVo);
        },
        lists: function(paramtype) {
            this.load_cont = true;
            if (paramtype == "paging") {
                this.pageVo.pageIndex = this.searchVo.pageIndex;
                this.insertPushState(this.searchVo.pageIndex, this.pageVo);
            } else if(paramtype == "reloadBack"){
                this.pageVo.pageIndex  =  this.searchVo.pageIndex;						
            } else {
                let object1 = Cm.util.clone(this.searchVo);
                this.pageVo = object1;
                this.searchVo.pageIndex = 1;
                this.insertPushState(this.searchVo.pageIndex, this.searchVo);
            }
            
            api.post(this.listUrl, params)
            .then(response => {
                this.resultList = response.data.resultList;
                this.paginationInfo = response.data.paginationInfo;
                this.searchVo = response.data.searchVO;
                this.items = response;
                this.load_cont = false;
            })
            .catch(error => {
                this.errorFnc(error, null);
            });
        },
        orderbyfnc: function(str) {
            this.searchVo.orderby  =  str;
            if(this.searchVo.descasc==='desc'){
                this.searchVo.descasc='asc';
            }else{
                this.searchVo.descasc='desc';
            }
            this.lists('search');
        },
        insertfnc: function() {
            this.items.${payload.SampleSm} = 0;// auto increment
            if(confirm("저장하시겠습니까?")){
                this.load_cont = true;
                api.post(this.insertUrl, this.items)
                .then(response => {
                    this.successFnc(response, "lists('search')");
                })
                .catch(error => {
                    this.errorFnc(error, null);
                });
            }else{
                this.load_cont = false;
            }			
        },
        updatefnc: function() {
            if(confirm("저장하시겠습니까?")){	
                api.post(this.insertUrl, this.items)
                .then(response => {
                    this.successFnc(response, "lists('search')");
                })
                .catch(error => {
                    this.errorFnc(error, null);
                });
            }else{

            }
        },
        deletefnc: function(item) {
            let idx = item.${payload.SampleSmIdx};
            if(confirm("삭제하시겠습니까?")){
                if(idx){
                    api.get(this.deleteUrl, {"${payload.SampleSmIdx}": idx})
                    .then(response => {
                        this.successFnc(response, "lists('search')");
                    })
                    .catch(error => {
                        this.errorFnc(error, null);
                    });
                } else {
                    alert("체크박스를 체크하세요.");
                }						
            }else{

            }
            
        },
        searchfnc: function() {
            let params = this.searchVo;
            api.post(this.searchUrl, params)
            .then(response => {
                this.items=response;
                this.paginationInfo = response.data.paginationInfo;
            })
            .catch(error => {
                this.errorFnc(error, null);
            });    
        },
        detailfnc: function(idx) {
            let params ={"${payload.SampleSmIdx}": idx};
            api.post(this.detailUrl, params)
            .then(response => {
                this.items= response.data.result;
            })
            .catch(error => {
                this.errorFnc(error, null);
            });
        },
        setExcelDown: function (objects, filename) {
            /*
            let animalWS = XLSX.utils.json_to_sheet(objects);
            let wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, animalWS, filename);
            let d = new Date();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            let output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
            let filenametime = output;// 날짜
            XLSX.writeFile(wb, filename + "_" + filenametime + ".xlsx");
            this.excels = false;
            */
        },
        setExcelDownFirst: function (array, filename) {
            console.log(array);
            /*
            let searchTeam = "${payload.dataFields}";
            let searchTeamarray = searchTeam.split(",");
            let searchTeamname = "${payload.dataFieldsNm}";
            let searchTeamnamearray = searchTeamname.split(",");
            let items = [];
            let tempkey = [];			
            if (array.length > 0) {
                console.log(array);
                /*
                for (let key in array[0]) {//가져온 데이터들의 key 만
                    tempkey.push(key);
                }
                for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    let item = {};
                    $.each(searchTeamarray, function (i, data) {//가져온 데이터의 key를 loop 돌리면서 searchTeam안에 있는 데이터만
                        $.each(tempkey, function (i2, data2) {//가져온 데이터의 key를 loop 돌리면서 searchTeam안에 있는 데이터만							
                            if (searchTeamarray[i] == data2) {
                                let a = searchTeamnamearray[i] !== '' ? searchTeamnamearray[i] : '';
                                let b = element[data2] !== '' ? element[data2] : '';
                                item[a] = b;

                            }
                        });
                    });
                    items.push(item);
                }
                this.setExcelDown(items, filename);
                */
            } else {
                alert("출력할 데이터가 없습니다")
            }
            */
        },
        excelDownLoadhfnc: function () {
            /*
            this.searchVo.recordCountPerPage = 10000;
            let params = this.searchVo;
            delete this.searchVo.recordCountPerPage;			
            
            api.post(this.searchUrl, params)
            .then(response => {
                this.setExcelDownFirst(response.data.resultList, "${payload.pageTitle}엑셀");
            })
            .catch(error => {
                this.errorFnc(error, null);
            });
            */
        },
        process_wb: function (wb) {
            console.log(wb);
            /*
            htmlout.innerHTML = XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]], { editable: true }).replace("<table", '<table id="table" border="1"');
            */
        }
    }
});
</script>`;
    return vHtml;
}
module.exports = {
    getCtrl: setctrl
}