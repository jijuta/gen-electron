const setctrl = function (payload, self) {
let vHtml = `<%
 /**
  * @Class Name : ${payload.Sample}List.jsp
  * @Description : ${payload.pageTitle}List 화면
  * @Modification Information
  * @
  * @  수정일         수정자             수정내용
  * @ -------		--------    ---------------------------
  * @ ${payload.pageTodays}   AUTO               최초 생성
  * @author AUTO
  * @since ${payload.pageTodays}
  * @version 1.0
  * @see
  *
  */
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/fms/EgovMultiFile.js'/>" ></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script type="text/javascript" src="<c:url value='/js/axios.min.js'/>" ></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script> 
<script src="//unpkg.com/vue-plain-pagination@0.2.1"></script>
<script src="//unpkg.com/xlsx@0.14.3/dist/xlsx.full.min.js"></script>
<script src="https://unpkg.com/vue-multiselect@2.1.0"></script>
<link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">

<title>${payload.pageTitle}</title>

<script>
	/*********************************************************
	 * 초기화
	 ******************************************************** */
	var pageurlvar = getServiceUrl("/${payload.SampleUrl}/${payload.Sample}List");
	var pagetitles = getServiceTitles("/${payload.pageTitle}");
	<c:if test="\${not empty fn:trim(noGroup) &&  noGroup ne ''}">
	alert("\${noGroup}");    
	</c:if>
	<c:if test="\${not empty fn:trim(error) &&  error ne ''}">
	alert("\${error}");    
	</c:if>
</script>

<div id="${payload.SampleSm}">
	<!-- 로딩 시작 -->
	<div class="dimmer active" id="load_cont">
	
		<div class="loader"></div>
	</div>
	<!-- 로딩 끝 -->
	<div class="container">
		<div class="container-fluid">
			<!-- start page title -->
			<div class="row">
				<div class="col-12">
					<div class="page-title-box">
	<!-- 						<div class="page-title-right"> -->
	<!-- 							<ol class="breadcrumb m-0"> -->
	<!-- 								<li class="breadcrumb-item d-none"><a href="javascript: void(0);">급여명세서 관리</a></li> -->
	<!-- 								<li class="breadcrumb-item active">급여명세서 관리</li> -->
	<!-- 							</ol> -->
	<!-- 						</div> -->
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
							</select>
							<button class="btn btn-xs btn-info" type="button"
								v-on:click="lists('search')">검색</button>
							<button class="btn btn-xs btn-outline-secondary" type="button"
								v-on:click="clearsearch();">초기화</button>
							<button class="btn btn-xs btn-outline-secondary" type="button" v-if="!showwide"
								@click="showwide=!showwide">펼쳐보기</button>
							<button class="btn btn-xs btn-outline-secondary" type="button" v-else
								@click="showwide=!showwide">닫기</button>
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
										<th><input type="checkbox" id="checkAll" class="check2" name="checkAll" title="<spring:message code='input.selectAll.title' />"></th>
										<th>상세</th>
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
										<td><input type="checkbox" class="check2" :value="listdata.${payload.SampleSmIdx}" /></td>
										<td><input type="button" class="btn btn-primary btn-sm"
											value="상세" v-on:click="detailfnc(listdata.${payload.SampleSmIdx})"></td>
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
<script>
$(function(){
	//  뒤로가기 추가
	window.onpopstate = function(event) {
		
		if(Cm.validation.isNull(event.state)){// 첫 페이지 로드시 state가 없음으로 전 페이지로 이동
			location.replace(document.referrer); 
		
		}else{
		
			if(Cm.validation.isNull(event.state.searchVo)){ // state에 searchVo가 없을 때
				${payload.SampleSm}App.pageVo = ${payload.SampleSm}App.clearVo;	 			
			} else {				
				${payload.SampleSm}App.pageVo = event.state.searchVo;
			}
			
			${payload.SampleSm}App.params.pageIndex = event.state.pageIndex;
			${payload.SampleSm}App.lists('reloadBack');
		}  
	};

	$(document).on("click","#checkAll",function (event) {
		if($("#checkAll").prop("checked")) { 
			//해당화면에 전체 checkbox들을 체크해준다
			$("#dataTable input[type=checkbox]").prop("checked",true); 
			// 전체선택 체크박스가 해제된 경우 
			} else { 
				//해당화면에 모든 checkbox들의 체크를해제시킨다. 
				$("#dataTable input[type=checkbox]").prop("checked",false); 
			}

	});
})

// $( document ).ajaxStop(function() {
// 	  console.log('== ajaxStop ')
// 	  $("#load_cont").addClass("d-none");
// });

// $( document ).ajaxStart(function() {
// 	console.log('== ajaxStart ')
// 	$("#load_cont").removeClass("d-none");
// });

Vue.component('datepicker', {
  template: '<input/>',
  props: [ 'dateFormat' ],
  mounted: function() {
	var self = this;
	//     $(this.$el).datetimepicker({
	$(this.$el).datepicker({
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년',
		// timepicker 설정
		// timeFormat:'HH:mm',
		// controlType:'select',
		// oneLine:true,
		// minDate: 0,
		onSelect: function(d){self.$emit('update-date',d)},
		// buttons: {
		// 	showToday: true,
		// 	showClear: true
		// }
	  });
  },
  beforeDestroy: function(){$(this.$el).datepicker('hide').datepicker('destroy')}
});

Vue.component('v-pagination', window['vue-plain-pagination']);

var ${payload.SampleSm}App = new Vue({
	  el: '#${payload.SampleSm}',
	  data: function() {
		return {
			insertUrl:"<c:url value='/${payload.SampleUrl}/insert${payload.Sample}.do'/>",
			deleteUrl:"<c:url value='/${payload.SampleUrl}/delete${payload.Sample}.do'/>",
			searchUrl:"<c:url value='/${payload.SampleUrl}/select${payload.Sample}ListJson'/>",
			updateUrl:"<c:url value='/${payload.SampleUrl}/update${payload.Sample}.do'/>",
			detailUrl:"<c:url value='/${payload.SampleUrl}/select${payload.Sample}Detail.do'/>",
			listUrl:"<c:url value='/${payload.SampleUrl}/select${payload.Sample}ListJson'/>",
			pageIndex:1,
			resultPage:10,
			prikeynm:'${payload.SampleSmIdx}',
			checkbox:[],
			load:false,
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
				orderbylist: []
				, orderbylist2: []
				, searchKeyword:''
				, totalSearch:''
				${payload.contentsRegistHtmlItemType}
			},
			searchVo:{
				orderbylist: []
				, orderbylist2: []
				, searchKeyword:''
				, totalSearch:''
				${payload.contentsRegistHtmlItemType}
			},
			clearVo:{
				orderbylist: []
				, orderbylist2: []
				, searchKeyword:''
				, totalSearch:''
				${payload.contentsRegistHtmlItemType}
			},
			pageVo:{
				orderbylist: []
				, orderbylist2: []
				, searchKeyword:''
				, totalSearch:''
				${payload.contentsRegistHtmlItemType}
			},
			isActive: false,
			searchQuery: '',
			names: []
		}
	},
	created: function() {
		axios.interceptors.request.use(function (config) {
			// trigger 'loading=true' event here
			$("#load_cont").removeClass("d-none");
			return config;
		 },(function (error) {
			// trigger 'loading=false' event here
			$("#load_cont").addClass("d-none");
			
			return Promise.reject(error);
		 }));
		
		 axios.interceptors.response.use(function (response)  {
			// trigger 'loading=false' event here
			$("#load_cont").addClass("d-none");
			
			return response;
		 }, (function (error) {
			// trigger 'loading=false' event here
			
			$("#load_cont").removeClass("d-none");
			return Promise.reject(error);
		 }));		 
	},
	mounted: function () {
			
		//	-----------------------------------------------------------------------------------------------------------------------------------------
		//	-----------------------------------------------------------------------------------------------------------------------------------------
		//	메인에서 넘어왔을 때 파라미터 받는 부분
		//	-----------------------------------------------------------------------------------------------------------------------------------------
		//	----------------------------------------------------------------------------------------------------------------------------------------- 
		
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
			// do 
			// if (getVars.hasOwnProperty("assetnum") && getVars.hasOwnProperty("${payload.SampleSm}")) {
			//	this.searchVo.assetNum = getVars.assetnum;
			//	this.searchVo.${payload.SampleSm} = getVars.${payload.SampleSm};
			// }
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
				// return this.names.filter(function(el){
				// 	return el.name.match(str);
				// });
			} else {
				this.isActive = false;
			}
		},
	},
	methods: {
		${payload.datePickerFncSearch}
		${payload.datePickerFncInsert}
		removeValue: function() {
			if (document.querySelector('.r').classList.contains('key')) {
				document.querySelector('.r').classList.remove('key');
				document.querySelector('.r li.sel').classList.remove('sel');
			}
		},
		//  페이징 함수 추가(v-pagination @input)
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
			var object1 = Cm.util.clone(${payload.SampleSm}App.clearVo);
			${payload.SampleSm}App.searchVo = object1;
			// 정렬 class 모두 제거
			$("#dataTable thead tr th label").each(function(index,data){
				if($(this).hasClass("desc") || $(this).hasClass("asc")) $(this).removeClass("desc","asc");
			});
			this.lists('search');
		},
		cleardetail: function() {
			var object1 = Cm.util.clone(${payload.SampleSm}App.clearVo);
			${payload.SampleSm}App.items = object1;
		},
		lists: function(param) {
			this.searchVo.orderbylist = [];
			this.searchVo.orderbylist2 = this.searchVo.orderbylist2 ? JSON.stringify(this.searchVo.orderbylist2) : [];
			var queryString = $.param(this.searchVo);
			if (param == "paging") {
				this.pageVo.pageIndex = this.params.pageIndex;
				queryString = $.param(this.pageVo);
				this.insertPushState(this.params.pageIndex,this.pageVo);
			} else if(param == "reloadBack"){
				this.pageVo.pageIndex  =  this.params.pageIndex;			
				queryString = $.param( this.pageVo);				
			} else {
				var object1 = Cm.util.clone(this.searchVo);
				this.pageVo = object1;
				this.params.pageIndex = 1;//페이징 초기화
				this.searchVo.pageIndex = 1;
				queryString = $.param(this.searchVo);
				this.insertPushState(this.params.pageIndex,this.searchVo);
			}
			$("#load_cont").removeClass("d-none");
			axios({
				method: 'post',
				url: this.listUrl,
				data: queryString,
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			}).then(function (response) {
				Vue.nextTick(function () {
					${payload.SampleSm}App.resultList = response.data.resultList;
					${payload.SampleSm}App.paginationInfo = response.data.paginationInfo;
					// ${payload.SampleSm}App.searchVo = response.data.searchVO;
					${payload.SampleSm}App.searchVo.orderbylist2 = Cm.util.clone(${payload.SampleSm}App.searchVo.orderbylist) || [];
					$("#load_cont").addClass("d-none");
				})
			})
			.catch(function (error) {
				if (error.response) {
					// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// 요청이 이루어 졌으나 응답을 받지 못했습니다.
					console.log(error.request);
				} else {
					// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
					console.log('Error', error.message);
				}
				console.log(error.config);
				alert("오류가 발생하였습니다.");
				$("#load_cont").addClass("d-none");
			});
		},
		orderbyfnc: function (str,e) {
			var evEle = e.target;
			if(e.target.tagName !== "LABEL"){// label 태그를 클릭 안 했을 시
				evEle = e.target.querySelector("LABEL") || evEle.closest("LABEL");
			}
			var descClass = evEle.classList;
			var dirI = document.createElement("I");
			var delI = evEle.querySelector("i");
			//this.searchVo.orderbylist2 = Cm.util.clone(this.searchVo.orderbylist) || [];
			if(descClass.value.indexOf("desc") > -1){// 3. 정렬을 없앨 시
				if(delI) evEle.removeChild(delI);
				var results = this.searchVo.orderbylist2;
				var removal = [];
				for(var i = 0; i < results.length; i++) {
					removal.push(i);
					if (results[i].orderby === str){
						results.splice(i, 1);
						i--;
					}
				};
				descClass.remove("desc");
				descClass.remove("asc");
			} else if(descClass.value.indexOf("asc") > -1){ // 2. 내림차순
				// 내림차순 class
				// 내림차순 아이콘
				// 기존 아이콘 태그 확인, 지우기
				// 새로운 아이콘 태그 현 태그 안에					
				if(delI) evEle.removeChild(delI);
				this.searchVo.orderbylist2.forEach(function(obj){
					if(obj.orderby == str){
						obj.descasc = "desc";
					}
				});
				
				descClass.remove("asc");
				descClass.add("desc");
				dirI.className = "fas fa-angle-down";
				evEle.appendChild( dirI );
			} else { // 1. 오름차순 (처음 정렬을 눌렀을 시)
				if(delI) evEle.removeChild(delI);
				this.searchVo.orderbylist2.push({
					orderby : str,
					descasc : "asc"
				});
				descClass.remove("desc");
				descClass.add("asc");					
				dirI.className = "fas fa-angle-up";
				evEle.appendChild( dirI );
				
			}
			
// 				this.searchVo.orderbylist2.foreach();
// 				if (this.searchVo.descasc === 'desc') {
// 					this.searchVo.descasc = 'asc';
// 				} else {
// 					this.searchVo.descasc = 'desc';
// 				}
			this.lists('search');
		},
		insertfnc: function() {
			${payload.SampleSm}App.items.${payload.SampleSm} = 0;//새로운 ${payload.SampleSm}를 db에서 auto increment
			if(confirm("저장하시겠습니까?")){
				var queryString = $.param(${payload.SampleSm}App.items);
				axios({
				method: 'post',
				url: ${payload.SampleSm}App.insertUrl,
				data: queryString,
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
				}).then(function(response) {
					console.log(response);
					if(response.data.hasOwnProperty("success")){
						alert(response.data.success);
						${payload.SampleSm}App.lists('search');
					} else if(response.data.hasOwnProperty("error")){
						alert(response.data.error); 
						${payload.SampleSm}App.lists('search');
					} else {
						${payload.SampleSm}App.lists('search');
					}
				})
				.catch(function(error) {
					if (error.response) {
						// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						// 요청이 이루어 졌으나 응답을 받지 못했습니다.
						console.log(error.request);
					} else {
						// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
						console.log('Error', error.message);
					}
					console.log(error.config);
					alert("오류가 발생하였습니다.");
				});
			}else{
			}			
		},
		updatefnc: function() {
			if(confirm("저장하시겠습니까?")){	
				var queryString = $.param(${payload.SampleSm}App.items);
				axios({
				method: 'post',
				url: ${payload.SampleSm}App.updateUrl,
				data: queryString,
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
				}).then(function(response) {
					console.log(response);
					if(response.data.hasOwnProperty("success")){
						alert(response.data.success);
						${payload.SampleSm}App.lists('search');
					} else if(response.data.hasOwnProperty("error")){
						alert(response.data.error); 
						${payload.SampleSm}App.lists('search');
					} else {
						${payload.SampleSm}App.lists('search');
					}
				})
				.catch(function(error) {
					if (error.response) {
						// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						// 요청이 이루어 졌으나 응답을 받지 못했습니다.
						console.log(error.request);
					} else {
						// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
						console.log('Error', error.message);
					}
					console.log(error.config);
					alert("오류가 발생하였습니다.");
				});
			}else{
			}
			
		},
		deletefnc: function() {
			if(confirm("삭제하시겠습니까?")){
				var count = $(".dataTr").find("input[type=checkbox]:checked").length;
				if(count > 0){
					$(".dataTr").find("input[type=checkbox]:checked").each(function() {
						var ${payload.SampleSmIdx} = $(this).val();
						axios.get(${payload.SampleSm}App.deleteUrl, {
							params: {
								"${payload.SampleSmIdx}": ${payload.SampleSmIdx}
							}
						})
						.then(function(response) {
							console.log(response);
							if(response.data.hasOwnProperty("success")){
								alert(response.data.success);
								${payload.SampleSm}App.lists('search');
							} else if(response.data.hasOwnProperty("error")){
								alert(response.data.error); 
								${payload.SampleSm}App.lists('search');
							} else {
								${payload.SampleSm}App.lists('search');
							}
						})
						.catch(function(error) {
							console.log(error);
						});
					});
				} else {
					alert("체크박스를 체크하세요.");
				}						
			}else{
			}
			
		},
		searchfnc: function() {
			var queryString = $.param(this.searchVo);
				
			axios({
				method: 'post',
				url: this.searchUrl,
				data: queryString,
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			})
			.then(function(response) {
				console.log(response);
				${payload.SampleSm}App.items=response;
				${payload.SampleSm}App.paginationInfo = response.data.paginationInfo;
			})
			.catch(function(error) {
				if (error.response) {
					// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// 요청이 이루어 졌으나 응답을 받지 못했습니다.
					console.log(error.request);
				} else {
					// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
					console.log('Error', error.message);
				}
				console.log(error.config);
				alert("오류가 발생하였습니다.");
			});
		},
		detailfnc: function(${payload.SampleSmIdx}) {
			console.log(${payload.SampleSmIdx});
			axios.get(${payload.SampleSm}App.detailUrl, {
				params: {
				"${payload.SampleSmIdx}": ${payload.SampleSmIdx}
				}
			})
			.then(function(response) {
				console.log(response);
				${payload.SampleSm}App.items=response.data.result;
			})
			.catch(function(error) {
				if (error.response) {
					// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// 요청이 이루어 졌으나 응답을 받지 못했습니다.
					console.log(error.request);
				} else {
					// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
					console.log('Error', error.message);
				}
				console.log(error.config);
				alert("조회에 실패했습니다.");
			});
		},
		setExcelDown: function (objects, filename) {
			var animalWS = XLSX.utils.json_to_sheet(objects);
			var wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, animalWS, filename);
			var d = new Date();

			var month = d.getMonth() + 1;
			var day = d.getDate();

			var output = d.getFullYear() + '/' +
				(month < 10 ? '0' : '') + month + '/' +
				(day < 10 ? '0' : '') + day;

			let filenametime = output;//날짜
			XLSX.writeFile(wb, filename + "_" + filenametime + ".xlsx");
			this.excels = false;
		},
		setExcelDownFirst: function (array, filename) {
			console.log(array);
			var searchTeam = "${payload.dataFields}";
			var searchTeamarray = searchTeam.split(",");
			var searchTeamname = "${payload.dataFieldsNm}";
			var searchTeamnamearray = searchTeamname.split(",");
			var items = [];
			var tempkey = [];			
			if (array.length > 0) {
				for (var key in array[0]) {//가져온 데이터들의 key 만
					tempkey.push(key);
				}
				for (let index = 0; index < array.length; index++) {
					const element = array[index];
					var item = {};
					$.each(searchTeamarray, function (i, data) {//가져온 데이터의 key를 loop 돌리면서 searchTeam안에 있는 데이터만
						$.each(tempkey, function (i2, data2) {//가져온 데이터의 key를 loop 돌리면서 searchTeam안에 있는 데이터만							
							if (searchTeamarray[i] == data2) {
								var a = searchTeamnamearray[i] !== '' ? searchTeamnamearray[i] : '';
								var b = element[data2] !== '' ? element[data2] : '';
								item[a] = b;

							}
						});
					});
					items.push(item);
				}
				${payload.SampleSm}App.setExcelDown(items, filename);
			} else {
				alert("출력할 데이터가 없습니다")
			}

		},
		excelDownLoadhfnc: function () {
			${payload.SampleSm}App.searchVo.recordCountPerPage = 10000;
			var queryString = $.param(${payload.SampleSm}App.searchVo);
			delete ${payload.SampleSm}App.searchVo.recordCountPerPage;			

			axios({
				method: 'post',
				url: ${payload.SampleSm}App.searchUrl,
				data: queryString,
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			}).then(function (response) {
				${payload.SampleSm}App.setExcelDownFirst(response.data.resultList, "${payload.pageTitle}엑셀");
			})
			.catch(function (error) {
				if (error.response) {
					// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// 요청이 이루어 졌으나 응답을 받지 못했습니다.
					console.log(error.request);
				} else {
					// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
					console.log('Error', error.message);
				}
				console.log(error.config);
				alert("오류가 발생하였습니다.");
			});
		},
		process_wb: function (wb) {
			console.log(wb);
			htmlout.innerHTML = XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]], { editable: true }).replace("<table", '<table id="table" border="1"');
		}
	}
})
// 검색폼 펼쳐보기
function TblTr(){
	$('.SearchTbl').toggleClass("hide");
	if($('.tblBtn').text() == "펼쳐보기"){
		$('.tblBtn').text("닫기");
	}
	else{
		$('.tblBtn').text("펼쳐보기");
	}
}
</script>`;
return vHtml;
}
module.exports = {
	getCtrl: setctrl
}