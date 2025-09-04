const setctrl = function(payload, self) {
  //let payload = self.payload;
  //let tb = payload.items[0];
  let vHtml=`
  <%
  /**
   * @Class Name : ${payload.Sample}Regist.jsp
   * @Description : ${payload.Sample}Regist 화면
   * @Modification Information
   * @
   * @  수정일       수정자				수정내용
   * @ -------		--------    ---------------------------
   * @ 2018.11.01	AUTO				최초 생성
   * @author AUTO 
   * @since 2018.11.01
   * @version 1.0
   * @see
   *  
   */
 %>
 <%@ page language="java" contentType="text/html; charset=UTF-8" %>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 <%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
 <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
 <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
 <%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
 <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
 <%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
 <!DOCTYPE html>
 <html>
 <head>
 <title>${payload.pageTitle} 등록</title>
 <meta http-equiv="content-type" content="text/html; charset=utf-8">
 <link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/com.css' />">
 <link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/cmm/jqueryui.css' />">
 <script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/fms/EgovMultiFile.js'/>" ></script>
 <script src="<c:url value='/js/egovframework/com/cmm/jquery.js' />"></script>
 <script src="<c:url value='/js/egovframework/com/cmm/jqueryui.js' />"></script>
 <script type="text/javascript">
 
 $(function() {
   $("#ntceDe").datepicker(   
           {dateFormat:'yy-mm-dd' 
            , showOn: 'button' 
            , buttonImage: '<c:url value='/images/egovframework/com/cmm/icon/bu_icon_carlendar.gif'/>'   
            , buttonImageOnly: true 
            
            , showMonthAfterYear: true
            , showOtherMonths: true
          , selectOtherMonths: true
         
            , changeMonth: true // 월선택 select box 표시 (기본은 false)
            , changeYear: true  // 년선택 selectbox 표시 (기본은 false)
            , showButtonPanel: true // 하단 today, done  버튼기능 추가 표시 (기본은 false)
   });
 });
 
 /* ********************************************************
  * 초기화
  ******************************************************** */
 function fn_egov_init(){
 
   //------------------------------------------
   //------------------------- 첨부파일 등록 Start
   //-------------------------------------------
   var maxFileNum = 3;
   var multi_selector = new MultiSelector( document.getElementById( 'egovComFileList' ), maxFileNum, 'file_label' );
   multi_selector.addElement( document.getElementById( 'egovfile_1' ) );
   //------------------------- 첨부파일 등록 End
 }
 /* ********************************************************
  * 저장처리화면
  ******************************************************** */
 function fn_egov_regist_${payload.SampleSm}(form){
   //TODO 필수체크를 작성하세요
   //TODO validate xml 작성
   if(confirm("저장하시겠습니까?")){	
     form.submit();	
   }
 }
 </script>
 
 </head>
 <body onLoad="fn_egov_init();">
 
 <!-- javascript warning tag  -->
 <noscript class="noScriptTitle">자바스크립트를 지원하지 않습니다.</noscript>
 
 <form:form commandName="${payload.SampleSm}VO" action="\${pageContext.request.contextPath}/${payload.SampleUrl}/insert${payload.Sample}.do" method="post" onSubmit="fn_egov_regist_${payload.SampleSm}(document.forms[0]); return false;" enctype="multipart/form-data"> 
 <div class="wTableFrm">
   <!-- 타이틀 -->
   <h2>${payload.pageTitle} 등록</h2>
   <!-- 등록폼 -->
   <table class="wTable" />
   <tbody>
     <!-- 등록폼 시작-->
     ${payload.contentsRegistHtml}
     <tr>
       <th><label for="file_1">첨부파일</label> </th>
       <td class="nopd">
       <!-- attached file Start -->
       <div>
         <div class="egov_file_box">
         <label for="egovfile_1" id="file_label">파일선택</label> 
         <input type="file" name="file_1" id="egovfile_1"> 
         </div>
         <div id="egovComFileList"></div>
       </div>
       <!-- attached file End -->
       </td>
     </tr>
   </tbody>
   </table>
   <!-- 하단 버튼 -->
   <div class="btn">
     <input type="submit" class="s_submit" value="저장" title="저장 <spring:message code="input.button" />" />
     <span class="btn_s"><a href="<c:url value='/${payload.SampleUrl}/select${payload.Sample}List.do' />"  title="목록">목록</a></span>
   </div>
   <div style="clear:both;"></div>
 </div>
 <input name="pageIndex" type="hidden" value="<c:out value='\${searchVO.pageIndex}'/>"/>
 <input name="cmd" type="hidden" value="<c:out value='save'/>">
 </form:form>
 </body>
 </html>
 
`
return vHtml;
}
module.exports = {
  getCtrl : setctrl
}