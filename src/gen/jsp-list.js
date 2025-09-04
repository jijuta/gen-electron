const setctrl = function(payload) {
let vHtml=`
<%
/**
 * @Class Name : ${payload.Sample}List.jsp
 * @Description : ${payload.pageTitle}List 화면
 * @Modification Information
 * @
 * @  수정일         수정자             수정내용
 * @ -------		--------    ---------------------------
 * @ ${payload.pageTodays}   AUTO               최초 생성
 *  @author AUTO
 *  @since 2018.11.02
 *  @version 1.0
 *  @see
 *
 */
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<title>${payload.pageTitle}</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<script type="text/javascript">

/*********************************************************
 * 변수 세팅
 ******************************************************** */
var api = '${payload.SampleUrl}';
var searchVO = '<c:out value="\${searchVO}"/>';
var resultList = '<c:out value="\${resultList}"/>';
var resultCnt  = '<c:out value="\${resultCnt}"/>';
var paginationInfo = '<c:out value="\${paginationInfo}"/>';
var userSearchVO = '<c:out value="\${userSearchVO}"/>';

/*********************************************************
 * 변수 로그
 ******************************************************** */
console.log("### searchVO : ", searchVO);
console.log("### resultList : ", resultList);
console.log("### resultCnt : ", resultCnt);
console.log("### paginationInfo : ", paginationInfo);
console.log("### userSearchVO : ", userSearchVO);


/*********************************************************
 * 초기화
 ******************************************************** */
function clearsearch() {

}
function cleardetail() {

}
function TblTr(){

}
/*********************************************************
 * 페이징 처리 함수
 ******************************************************** */

/*********************************************************
 * 조회 처리 함수
 ******************************************************** */
function fn_egov_search_${payload.SampleSm}(){

}
/* ********************************************************
 * 상세회면 처리 함수
 ******************************************************** */
function updatefnc(){

}
function insertfnc(){

}
function deletefnc(){

}
</script>
<body>
<div id="${payload.SampleSm}">
  <div class="container">	
    <form name="${payload.SampleSm}Form" id="${payload.SampleSm}Form" 
    action="<c:url value='/${payload.SampleUrl}/select${payload.Sample}List.do'/>" 
    method="post" onSubmit="fn_egov_search_${payload.SampleSm}(); return false;"> 
      <input name="pageIndex" type="hidden" value="<c:out value='\${searchVO.pageIndex}'/>">
      <!-- 타이틀영역, 검색 버튼  -->
			<div class="clearfix wTableFrm">             
				 <h1 class="float-left">
					${payload.pageTitle}
				 </h1>
				 <div class="float-right" style="line-height:41px;">
					<button class="btn-primary btn btn-sm" type="submit">조회</button>
					<button class="btn-secondary btn btn-sm" type="button" v-on:click="clearsearch();">초기화</button>
					<span class="tblBtn btn btn-sm btn-secondary" onclick="javascript:TblTr()">펼쳐보기</span>
				 </div>
			</div>
      <!-- 타이틀영역, 검색 버튼 끝 -->
      <!-- 검색영역 -->
			<div class="mb-2 SearchTbl hide">
${payload.contentsRegistHtmlSearch}
			</div>
			<!-- 검색영역 끝 -->
    </form>
    <div class="row mx-0 pt-2">
      <div class="col-12 col-lg-7 px-0">
      <!-- 목록영역 -->
      <div class="table-responsive">
        
        <table  id="dataTable" class="table text-center text-nowrap border mb-0 bg-white table-hover" style="cursor:pointer;" summary="${payload.pageTitle} 목록영역" arguments="${payload.pageTitle}" />
          <thead>
            <tr>
              <th><input type="checkbox" id="checkAll"  name="checkAll" title="<spring:message code='input.selectAll.title' />"></th>
              ${payload.thlist}
            </tr>
          </thead>
          <tbody>
          <c:if test="\${fn:length(resultList) == 0}" >
            <tr class="nodata">
              <td colspan="<c:out value='\${fn:length(resultList)  + 2}'/>">조회결과가 없습니다.</td>
            </tr>
          </c:if>
          <c:forEach items="\${resultList}" var="resultInfo" varStatus="status">
            <tr class="dataTr">
              <td><input type="checkbox" id="checkAll"  name="checkAll" title=""></td>
              ${payload.thlistajax}
            </tr>
          </c:forEach>
          </tbody>
        </table>
      </div>
      <!-- 목록영역 끝-->
      <!-- paging navigation -->
				<div class="pagination w-100">
					<ul>
					<ui:pagination paginationInfo="\${paginationInfo}" type="image" jsFunction="fn_egov_select_linkPage"/>
					</ul>
				</div>
				<!-- paging navigation END-->
      </div>
      <!-- 등록영역 -->
			<div class="col-12 col-lg-5 pd-custom pr-0">
				 <div class="card">
					 <div class="card-body text-center" style="padding: 0.5rem 1.5rem;">
						<button type="button" class="btn btn-secondary btn-sm" v-on:click="cleardetail();">
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
					
						<button type="button" class="btn btn-success btn-sm"> 
							엑셀
						</button>
					</div>
					<div class="card-body" style="height:450px; overflow:auto;">
						<div class="row">
							<!-- 등록폼 시작-->
							${payload.contentsRegistHtml4}
							<!-- 등록폼 끝-->
						</div>
					</div>
				</div>						
			</div>
    </div>
  </div>
</div>
`;
return vHtml;
}
module.exports = {
  getCtrl: setctrl
}