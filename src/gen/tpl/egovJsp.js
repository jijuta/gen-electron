const fs = require("fs");
const shell = require("shelljs");
const config = require("../config/config.js");
/**
 * 첫 문자를 대문자로 
 * @param {문자} string 
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
/**
 * 파일생성
 * @param {디렉토리-자바,메퍼,jsp 등} dir 
 * @param {패키지명 참조} corder 
 * @param {파일명} name 
 * @param {컨텐츠} item 
 */
function fileWrite(dir, corder, name, item){

    let moduleDir = dir + "/" + corder;

    if (!fs.existsSync(moduleDir)) {
        shell.mkdir("-p", moduleDir);
    }

    fs.writeFile(dir + "/" + corder + '/' + name, item, function (
        err
    ) {
        if (err) throw err;
        console.log(dir + "/" + corder + '/' + name + " Saved! Success");
    });
}

function lists(payload) {
const c=`
<%
 /**
  * @Class Name : EgovArticleList.jsp
  * @Description : EgovArticleList 화면
  * @Modification Information
  * @
  * @  수정일             수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.02.01   박정규              최초 생성
  *   2016.06.13   김연호              표준프레임워크 v3.6 개선
  *   2018.06.15   신용호              페이징 처리 오류 개선
  *  @author 공통서비스팀
  *  @since 2009.02.01
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

<!DOCTYPE html>
<html>
<head>
<title>${pageTitle}</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script type="text/javascript">

/*********************************************************
 * 변수 세팅
 ******************************************************** */
var api = '${SampleUrl}';
var searchVO = <c:out value="${searchVO}"/>;
var comCopBbs = <c:out value="${comCopBbs}"/>;
var sessionUniqId = <c:out value="${sessionUniqId}"/>;
var resultList = <c:out value="${resultList}"/>;
var resultCnt  = <c:out value="${resultCnt}"/>;
var articleVO  = <c:out value="${articleVO}"/>;
var boardMasterVO  = <c:out value="${boardMasterVO}"/>; 
var paginationInfo = <c:out value="${paginationInfo}"/>;
var noticeList = <c:out value="${noticeList}"/>;

console.log("### searchVO : ", searchVO);
console.log("### comCopBb : ", comCopBbs);
console.log("### sessionU : ", sessionUniqId);
console.log("### resultLi : ", resultList);
console.log("### resultCn : ", resultCnt);
console.log("### articleV : ", articleVO);
console.log("### boardMas : ", boardMasterVO);
console.log("### paginati : ", paginationInfo);
console.log("### noticeLi : ", noticeList);


/*********************************************************
 * 초기화
 ******************************************************** */


/*********************************************************
 * 페이징 처리 함수
 ******************************************************** */

/*********************************************************
 * 조회 처리 함수
 ******************************************************** */

/* ********************************************************
 * 상세회면 처리 함수
 ******************************************************** */

</head>
<body>
<div id="app">
    {{ message }}
</div>


</body>
</html>


`
}

function details(payload) {

}

function updates(payload) {

}

function deletes(payload) {

}

function getLogs() {

}

function main(){

}

module.exports = {
    lists: lists,
    details: details,
    updates: updates,
    deletes: deletes,
    getLogs: getLogs,
    main: main
};