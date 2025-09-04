const setctrl= function(payload, self) {
  //let payload = self.payload;
  //let tb = payload.items[0];
  let vHtml=`
  <%
  /**
   * @Class Name : ${payload.Sample}Detail.jsp
   * @Description : ${payload.Sample}Detail 화면
   * @Modification Information
   * @
   * @  수정일             수정자                   수정내용
   * @ -------    --------    ---------------------------
   * @ 2018.11.01   자동생성              최초 생성
   *  @author AUTO 
   *  @since 2018.11.01
   *  @version 1.0
   *  @see
   *  
   */
 %>
 <%@ page language="java" contentType="text/html; charset=UTF-8" %>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
 <%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
 <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
 <%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
 <%pageContext.setAttribute("crlf", "\\r\\n"); %>
 <!DOCTYPE html>
 <html>
 <head>
 <title>${payload.pageTitle} 상세보기</title>
 <meta http-equiv="content-type" content="text/html; charset=utf-8">
 <link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/com.css' />">
 <script type="text/javascript">
 /* ********************************************************
  * 삭제처리
  ******************************************************** */
  function fn_egov_delete_${payload.SampleSm}(${payload.SampleSmIdx}){
   if(confirm("정말로 삭제하시겠습니까?")){	
     // Delete하기 위한 키값을 셋팅
     document.${payload.SampleSm}Form.${payload.SampleSmIdx}.value = ${payload.SampleSmIdx};	
     document.${payload.SampleSm}Form.action = "<c:url value='/${payload.SampleUrl}/delete${payload.Sample}.do'/>";
     document.${payload.SampleSm}Form.submit();	
   }	
 }	
   
 </script>
 </head>
 <body>
 <!-- javascript warning tag  -->
 <noscript class="noScriptTitle">자바스크립트를 지원하지 않습니다.</noscript>
 
 <form name="${payload.SampleSm}Form" action="<c:url value='/${payload.SampleUrl}/update${payload.Sample}View.do'/>" method="post">
 <div class="wTableFrm">
   <!-- 타이틀 -->
   <h2>${payload.pageTitle} 상세보기</h2>
 
   <!-- 상세조회 -->
   <table class="wTable" />
   <tbody>
     ${payload.contents}
     <!-- 첨부파일  -->
     <c:if test="\${not empty result.atchFileId}">
     <tr>
       <th>첨부파일</th>
       <td>
         <c:import url="/cmm/fms/selectFileInfs.do" charEncoding="utf-8">
           <c:param name="param_atchFileId" value="\${result.atchFileId}" />
         </c:import>
       </td>
     </tr>
    </c:if>
     
   </tbody>
   </table>
   <!-- 하단 버튼 -->
   <div class="btn">
     <input type="submit" class="s_submit" value="수정" title="" />
     <span class="btn_s"><a href="<c:url value='/${payload.SampleUrl}/delete${payload.Sample}.do' />" onClick="fn_egov_delete_${payload.SampleSm}('<c:out value="\${result.${payload.SampleSmIdx}}"/>'); return false;"  title="">삭제</a></span>
     <span class="btn_s"><a href="<c:url value='/${payload.SampleUrl}/select${payload.Sample}List.do' />"  title="">목록</a></span>
   </div><div style="clear:both;"></div>
   
 </div>
 <input name="${payload.SampleSmIdx}" type="hidden" value="<c:out value="\${result.${payload.SampleSmIdx}}" />">
 <input name="cmd" type="hidden" value="">
 </form>
 </body>
 </html>
  `
  return vHtml;
}
module.exports = {
  getCtrl : setctrl
}