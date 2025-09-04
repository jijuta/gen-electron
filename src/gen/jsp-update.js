const setctrl = function(payload, self) {
  let vHtml=`
  <%
  /**
   * @Class Name : ${payload.Sample}Egov${payload.Sample}Updt.jsp
   * @Description : ${payload.Sample}Egov${payload.Sample}Updt 화면
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
 <%@ page language="java" contentType="text/html; charset=UTF-8"%>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
 <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
 <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
 <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
 <%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
 <c:set var="pageTitle"><spring:message code="comUssIonNws.${payload.Sample}VO.title" /></c:set>
 <!DOCTYPE html>
 <html>
 <head>
 <title>${payload.pageTitle }<spring:message code="title.update" /></title>
 <meta http-equiv="content-type" content="text/html; charset=utf-8">
 <link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/com.css' />">
 <link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/cmm/jqueryui.css' />">
 <script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/fms/EgovMultiFile.js'/>"></script>
 <!-- TODO validator xml 등록 
 <script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
 -->
 <script src="<c:url value='/js/egovframework/com/cmm/jquery.js' />"></script>
 <script src="<c:url value='/js/egovframework/com/cmm/jqueryui.js' />"></script>
 <validator:javascript formName="${payload.Sample}VO" staticJavascript="false"	xhtml="true" cdata="false" />
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
 function fn_egov_init() {	
   
   
 }
 /* ********************************************************
  * 저장처리화면
  ******************************************************** */
 function fn_egov_updt(form) {
   //TODO 필수체그 또는 validate 
   if (confirm("<spring:message code="common.update.msg" />")) {
     form.submit();
   }
 }
 /* ********************************************************
  * 목록 으로 가기 -- 미사용
  ******************************************************** */
 function fn_egov_inqire_list() {
   ${payload.Sample}VO.action = "<c:url value='/${payload.SampleUrl}/select${payload.Sample}List.do'/>";
   ${payload.Sample}VO.submit();
 }
 
 function fn_egov_check_file(flag) {
   if(flag=="Y") {
     document.getElementById('file_upload_posbl').style.display = "block";
     document.getElementById('file_upload_imposbl').style.display = "none";
   } else {
     document.getElementById('file_upload_posbl').style.display = "none";
     document.getElementById('file_upload_imposbl').style.display = "block";
   }
 }
 </script>
 </head>
 <body onLoad="fn_egov_init();">
 
 <!-- javascript warning tag  -->
 <noscript class="noScriptTitle">스크립트를 지원하지 않습니다.</noscript>
 
 <!-- 상단타이틀 -->
 <form:form commandName="${payload.Sample}VO" action="\${pageContext.request.contextPath}/${payload.SampleUrl}/update${payload.Sample}.do" method="post" onSubmit="fn_egov_updt(document.forms[0]); return false;" enctype="multipart/form-data">
   <div class="wTableFrm">
   <h2>${payload.pageTitle} 업로드</h2>
 
   <!-- 수정폼 -->
   <table class="wTable"  />
     
     <tbody>
     <!-- 입력 -->
       
     ${payload.contentsUpdateHtml}
 
   
     <!-- 첨부파일 -->
     
     <tr>
       <th><label for="file_1">첨부파일</label> </th>
       <td class="nopd">
       <!-- 첨부목록을 보여주기 위한 -->
       <c:if test="\${not empty ${payload.Sample}VO.atchFileId}">
         <c:import charEncoding="utf-8" url="/cmm/fms/selectFileInfsForUpdate.do" >
           <c:param name="param_atchFileId" value="\${${payload.Sample}VO.atchFileId}" />
         </c:import>		
       </c:if>
       
       <!-- 첨부화일 업로드를 위한 Start -->
       <c:if test="\${${payload.Sample}VO.atchFileId eq null || ${payload.Sample}VO.atchFileId eq ''}">
       <input type="hidden" name="fileListCnt" value="0" />
       <input name="atchFileAt" type="hidden" value="N">
       </c:if>
       <c:if test="\${${payload.Sample}VO.atchFileId ne null && ${payload.Sample}VO.atchFileId ne ''}">
       <input name="atchFileAt" type="hidden" value="Y">
       </c:if>
     
       <div id="file_upload_posbl"  style="display:none;" >
 
         <!-- attached file Start -->
         <div>
           <div class="egov_file_box">
           <label for="egovfile_1" id="file_label"><spring:message code="title.attachedFileSelect" /></label> 
           <input type="file" name="file_1" id="egovfile_1"> 
           </div>
           <div id="egovComFileList"></div>
         </div>
         <!-- attached file End -->
       </div>
       
       <div id="file_upload_imposbl"  style="display:none;" >
         <table width="100%" cellspacing="0" cellpadding="0" border="0" align="left" class="UseTable">
           <tr>
             <td style="padding:0px 0px 0px 0px;margin:0px 0px 0px 0px;"><spring:message code="common.imposbl.fileupload" /></td>
           </tr>
         </table>
       </div>
       </td>
     </tr>
     </tbody>
   </table>
 
   <!-- 하단 버튼 -->
   <div class="btn">
     <input type="submit" class="s_submit" value="수정" title="수정 버튼" />
     <span class="btn_s"><a href="<c:url value='/${payload.SampleUrl}/select${payload.Sample}List.do' />"  title="목록">목록</a></span>
   </div>
   <div style="clear: both;"></div>
 
   </div>
 
   <input type="hidden" name="posblAtchFileNumber" id="posblAtchFileNumber" value="3" />
   <input name="${payload.SampleSmIdx}" type="hidden" value="\${${payload.Sample}VO.${payload.SampleSmIdx}}">
 </form:form>
 
 </body>
 <script type="text/javascript">
 //------------------------------------------
 //------------------------- 첨부파일 수정 Start
 //-------------------------------------------
 
 var existFileNum = $("#fileListCnt").val(); // 이 값은 File List를 조회하는 부분에 담겨온다.
 var maxFileNum = $("#posblAtchFileNumber").val(); 
 // 각 비즈니스 로직에서는 해당하는 폼 값에 첨부가능한 최대파일 숫자를 세팅해둬야 함
 var uploadableFileNum = maxFileNum - existFileNum; // 최대등록가능한 파일숫자에서 기존에 등록된 숫자를 뺀다.
 if(uploadableFileNum<0) {
   uploadableFileNum = 0;
 }
 if(uploadableFileNum != 0){
   fn_egov_check_file('Y');
   var multi_selector = new MultiSelector( document.getElementById( 'egovComFileList' ), uploadableFileNum , 'file_label');
   multi_selector.addElement( document.getElementById( 'egovfile_1' ) );
   fn_egov_multi_selector_update_setting(multi_selector);
 }else{
   fn_egov_check_file('N');
 }  
   
 //------------------------- 첨부파일 수정 End
 </script>
 </html>
   
  `
  return vHtml;
}
module.exports = {
  getCtrl : setctrl
}