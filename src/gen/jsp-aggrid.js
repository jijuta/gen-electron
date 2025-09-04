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

<script src="https://unpkg.com/@ag-grid-enterprise/all-modules@26.1.0/dist/ag-grid-enterprise.min.js"></script>
<!-- 그리드 스타일 -->
<style>
    .ag-cell,
    .ag-cell-focus { 
        border: none !important;
        outline: 0 !important;
    }
    .custom-select {padding-left: 10px !important;}
    .ag-cell span.dot {
        margin-top:0 !important;
        width: 20px !important;
        height: 20px !important;
    }
    .ag-cell input[type=checkbox]{
        margin-top:0 !important;
        width: 15px !important;
        height: 15px !important;
    }
    .ag-header-cell-label, .ag-header-group-cell-label {justify-content: center;}
</style>

<title>${payload.pageTitle}</title>

<div id="${payload.SampleSm}">
    <div class="container cont-width">
        <!-- start page title -->
        <div class="row">
            <div class="col-12 my-1">
                <div class="page-title-box">
                    <!-- 타이틀영역 -->
                    <h4 class="float-left mt-4">${payload.pageTitle}</h4>
                    <!-- 검색 버튼  -->
                    <div class="input-group-append float-right pt-3" id="button-addon4">
                        <select style="width:80px; height:28px; padding:0 5px; top:-1px;" v-model="searchVo.recordCountPerPage"
                            class="form-control custom-select d-inline-block position-relative btn-margin-r">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <button class="btn btn-sm btn-info btn-margin-r" type="button"
                            v-on:click="lists('search')">검색</button>
                        <button class="btn btn-sm btn-outline-secondary btn-margin-r" type="button"
                            v-on:click="clearsearch();">초기화</button>
                        <button class="btn btn-sm btn-outline-secondary" type="button" v-if="!showwide"
                            @click="showwide=!showwide">펼쳐보기</button>
                        <button class="btn btn-sm btn-outline-secondary" type="button" v-else
                            @click="showwide=!showwide">닫기</button>
                    </div>
                    <!-- 타이틀영역, 검색 버튼 끝-->
                </div>
            </div>
        </div>
        <!-- end page title -->

        <div class="mb-2">
            <!-- 검색영역 -->
            <div class="cont-center">
                <div class="row">
                <!-- 4개 검색 필드 시작 -->
                <!-- 4개 검색 필드 끝 -->
                </div>
            </div>
            <div v-if="showwide" class="cont-center">
                <div class="row">
                    <!-- 검색폼 시작 -->
                    <!-- 양식 1 {contentsRegistHtmlSearch} -->
                    <!-- 양식 2 {payload.contentsRegistHtml4} -->
                    ${payload.insertBox}
                    <!-- 검색폼 끝 -->
                </div>
            </div>
            <!-- 검색영역 끝 -->
        </div>    				
            <div class="row mx-0 pt-2 pl-0">
                <div class="col-12 col-lg-7 px-0">
                    <!-- 목록영역 -->
                    <div id="myGrid" class="inner-col ag-theme-material" style="height: 636px; width:100%; margin-bottom:10px;"></div>
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
            </div>
        </div>
    </div>
</div>

<script src="<c:url value='/js/code/selectBoxList.js'/>"></script>
<script src="<c:url value='/js/code/selectBoxFnc.js'/>"></script>
<script>
    <c:if test="\${not empty fn:trim(noGroup) &&  noGroup ne ''}">
    alert("\${noGroup}");    
    </c:if>
    <c:if test="\${not empty fn:trim(error) &&  error ne ''}">
    alert("\${error}");    
    </c:if>
    getUrlJs('/${payload.SampleUrl}/${payload.sampleNmFirst}AgGridJs', "js","/js");
</script>
`;
    return vHtml;
}
module.exports = {
    getCtrl: setctrl
}