function left(s, c) {
    return s.substr(0, c);
}
const setctrl = function (payload, self) {
    let contentsRegistHtmlItemTypeCommon = left(`${payload.contentsRegistHtmlItemType}`,3);
    let vHtml = `
    /*********************************************************
	 * 초기화
	 ******************************************************** */    
	var pagejspath = "/js/${payload.SampleUrl}/${payload.SampleSm}.js";
    var pageurlvar = getServiceUrl("/${payload.SampleUrl}","${payload.sampleNmFirst}");
    var pagetitles = getServiceTitles("${payload.pageTitle}");
    var insertUrl= pageurlvar.insertUrl,
    deleteUrl= pageurlvar.deleteUrl,
    searchUrl= pageurlvar.searchUrl,
    updateUrl= pageurlvar.updateUrl,
    detailUrl= pageurlvar.detailUrl,
    listUrl= pageurlvar.listUrl;

    // 필요한 공통코드 값이 있으면 PL들에게 문의하여 값 설정
	var ALLCODE = getCatAllCode();// 카테고리 전체 호출
    selectBoxList.payload = [].concat(selectBoxList.payload,ALLCODE);
	selectBoxitems.ALLCODE = ALLCODE;


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
                insertUrl: insertUrl,
                deleteUrl: deleteUrl,
                searchUrl: searchUrl,
                updateUrl: updateUrl,
                detailUrl: detailUrl,
                listUrl: listUrl,
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
                excelVo:{
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
                
            
        	// AGGRID 관련설정부분
            // AG-GRID 사용 할 경우 주석 해제
            // const gridDiv = document.querySelector('#myGrid');
            // agGrid.Grid(gridDiv, gridOptions);


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
            // muliti selectbox function sample
        	itemsClCodeCng : function (d){ // 등록Form-> 대분류ID 
                if(d){
                	this.items.clCodeInfo = d;
                	this.items.clCodeNm = d.name;
                	this.items.clCode = d.code;
                	this.items.codeIdInfo = [];
                	selectBoxitems.CODEID = d.CODEID;
                	/*this.items.codeIdInfo = d.CODEID;*/
                	
                }
                else{
                	this.items.clCodeInfo = '';
                	this.items.clCode = '';
                	this.items.clCodeNm = '';
                	selectBoxitems.CODEID = [];
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
                var object1 = Object.assign({}, ${payload.SampleSm}App.clearVo);
                ${payload.SampleSm}App.searchVo = object1;
                // 정렬 class 모두 제거
                $("#dataTable thead tr th label").each(function(index,data){
                    if($(this).hasClass("desc") || $(this).hasClass("asc")) $(this).removeClass("desc","asc");
                });
                ${payload.datePickerFncClearsearch}
                this.lists('search');
            },
            cleardetail: function() {
                var object1 = Object.assign({}, ${payload.SampleSm}App.clearVo);
                ${payload.SampleSm}App.items = object1;
                ${payload.datePickerFncCleardetail}
            },
            lists: function(param) {
                this.searchVo.orderbylist = [];
				this.searchVo.orderbylist2 = this.searchVo.orderbylist2 ? JSON.stringify(this.searchVo.orderbylist2) : [];

                // 검색 Select Box 값 유지
               // var clCodeInfo = this.searchVo.clCodeInfo; // 

                var queryString = $.param(this.searchVo);
                if (param == "paging") {
                    this.pageVo.pageIndex = this.params.pageIndex;
                    queryString = $.param(this.pageVo);
                    this.insertPushState(this.params.pageIndex,this.pageVo);
                } else if(param == "reloadBack"){
                    this.pageVo.pageIndex  =  this.params.pageIndex;			
                    queryString = $.param( this.pageVo);				
                } else {
                    var object1 = Object.assign({}, this.searchVo);
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
                        ${payload.SampleSm}App.excelVo = Cm.util.clone(${payload.SampleSm}App.searchVo);
                        ${payload.SampleSm}App.searchVo.orderbylist2 = Cm.util.clone(${payload.SampleSm}App.searchVo.orderbylist) || [];

                        // 리스트 검색 완료 후 select box 값 유지
                        // ${payload.SampleSm}App.searchVo.clCodeInfo = clCodeInfo; 

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

                    // 하기 부터는 상세 버튼 눌렀을 때 multi select box 값을 매핑 해주는 부분 예제
                    // 현재 계속 보완 중 이며, 오류 날 경우 신형민 대리에게 문의

                    // selectBoxitems.변수명 => 공통코드를 담는 변수 명 정의
                    // data.code => 공통코드에서 내려 준 code 값 정의
                    // items.deptId => DB Table에 공통코드 값에 해당 하는 특정 필드 CODE를 정의하여 수정
                    // items.deptIdInfo => multi select box 값에 대해 코드 값+Info를 붙여 선언 함
                    // v-model : searchVO, itemsVO, clearVO, pageVO에 똑같이 모델링 선언

                    /*selectBoxitems.DEPT.forEach(function(data){ //입력폼 직종
                        if(data.code === ${payload.SampleSm}App.items.deptId){
                            ${payload.SampleSm}App.items.deptIdInfo = data
                        }
                    })*/
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
                // console.log(array);
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
            excelDownLoadfnc: function () {
                ${payload.SampleSm}App.excelVo.recordCountPerPage = 10000;
                var queryString = $.param(${payload.SampleSm}App.excelVo);
                // delete ${payload.SampleSm}App.excelVo.recordCountPerPage;
    
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
`;
    return vHtml;
}
module.exports = {
    getCtrl: setctrl
}