function setCtrl(items, self) {
    let camelCase = self.camelCase;
    let openPlayLoad= self.openPlayLoad(items);
    let item = items[0];
    //console.log("item-", item);

    /*let whereIdx = self.PriKeyNm
        .map(e => e.column_name + '= #{' + camelCase(e.column_name) + '}')
        .join(" and ");*/
    
    let whereIdx = openPlayLoad.whereIdx;
    /*형민 2019-09-27 */

    let table_name = self.schema + "." + self.tablename;
    let table_name2 = self.tablename;

    let table_name3 = camelCase(self.tablename);//테이블 경로 '_' 표기
    let table_name4 = table_name3.capitalizeFirstLetter();//테이블 _앞 대문자 표기

    let table_name5 = item.table_comment;//테이블 한글명


    let curPageVal = '${param.' + 'curPage}';
    let pageDival = '${pageDiv}';

    let scriptFuc = `
    /*********************************************************"
    * 조회"
    * ******************************************************** */
    function load(page) {
      if( typeof page !== "undefined" ) {
      searchForm.setValue();
      $("#curPage").val(page);
      //검색
    } else {
      var paramPage ='<c:out value="${curPageVal}"/>';  
      page = (paramPage == "" || searchFlag) ? 1 : paramPage;
      $("#curPage").val(page);
      searchForm.serializeArray();
      }
      cmFunction.ajaxLoad("listDiv", "./${pageDival}List.do", "searchForm");
    }

    `;



    //PRIMARY KEY 상세화면 파라미터
    /*let whereIdx2 = self.PriKeyNm
        .map(e => e.column_name)
        .join(" ");*/
    let whereIdx2 = openPlayLoad.whereIdx;

    //상세화면 (검색조건 함수)

    let scriptFuc2 = "";
    scriptFuc2 += "\n" + "/*********************************************************" + "\n";
    scriptFuc2 += "* 검색조건 함수" + "\n";
    scriptFuc2 += "******************************************************** */" + "\n";
    scriptFuc2 += "function goDetail(" + whereIdx2 + "){" + "\n\t\t";
    scriptFuc2 += 'commonForm.setUrl("./${pageDiv}View.do");' + "\n\t\t";


    scriptFuc2 += 'commonForm.' + 'addParam("' + camelCase(whereIdx2) + '",' + whereIdx2 + ');' + "\n\t\t"
    scriptFuc2 += 'commonForm.' + 'addParam("curPage",' + '$("#curPage").val());' + "\n\t\t";
    self.selectedSearchobj.forEach((post, i) => {
        let camelizesUpdateVal3 = camelCase(post.column_name.toLowerCase());
        let TP = self.dataTypeinitTuTb(post.data_type);
        scriptFuc2 += 'commonForm.' + 'addParam("' + camelizesUpdateVal3 + '",' + '$("#' + camelizesUpdateVal3 + '")';
        scriptFuc2 += '.val());' + "\n\t\t";

    });

    scriptFuc2 += 'commonForm.' + 'submit();' + "\n\t\t";
    scriptFuc2 += "}" + "\n";





    let scriptFuc3 = "function goAdd() {" + "\n\t\t";
    scriptFuc3 += 'commonForm.setUrl("./${pageDiv}Add.do");' + "\n\t\t";
    scriptFuc3 += 'commonForm.' + 'addParam("curPage",' + '$("#curPage").val());' + "\n\t\t";
    self.selectedSearchobj.forEach((post, i) => {
        let camelizesUpdateVal3 = camelCase(post.column_name.toLowerCase());
        let TP = self.dataTypeinitTuTb(post.data_type);
        scriptFuc3 += 'commonForm.' + 'addParam("' + camelizesUpdateVal3 + '",' + '$("#' + camelizesUpdateVal3 + '")';
        scriptFuc3 += '.val());' + "\n\t\t";

    });

    scriptFuc3 += "commonForm.submit();" + "\n\t\t";
    scriptFuc3 += "}" + "\n";
    scriptFuc3 += '</' + 'script>';


    let scriptFuc4 = `
    $("#searchForm").keypress(function() {
      searchFlag = true;
      chkEnter(load);
    });
    $("#btnSearch").click(function(){
      searchFlag = true;	
      load();
    });
    $("#btnAdd").click(function() {
      goAdd();
    });	
		`;


    let searchConditionItem2 = "";
    self.selectedSearchobj.forEach((post, i) => {
        let camelizesUpdateVal2 = camelCase(post.column_name.toLowerCase());
        let TP = self.dataTypeinitTuTb(post.data_type);

        searchConditionItem2 += "<tr>" + "\r\n\t\t\t\t\t";
        searchConditionItem2 += '<th scope="row">';
        searchConditionItem2 += '<label for="';
        searchConditionItem2 += camelizesUpdateVal2 + '">';
        searchConditionItem2 += post.column_comment + "</label>";
        searchConditionItem2 += "</th>" + "\r\n\t\t\t\t\t";

        searchConditionItem2 += '<td class="text-right">' + "\r\n\t\t\t\t\t\t";
        searchConditionItem2 += '<input type="text" ' + 'id="' + camelizesUpdateVal2 + '" ' + 'name="' + camelizesUpdateVal2 + '"';
        searchConditionItem2 += ' value="${param.' + camelizesUpdateVal2 + '}" class="full"> ' + "\r\n\t\t\t\t\t";
        searchConditionItem2 += '</td>' + "\r\n\t\t\t\t";
        searchConditionItem2 += "</tr>" + "\r\n\t\t\t\t";

    });

    let searchConditionMapper2 = searchConditionItem2;

    //메뉴명 및 메뉴 네비게이션

    let vwebMenuNm = '${view.menu.webMenuNm}';
    let naviList = '${view.naviList}'
    let nwebMenuNm = '${navi.webMenuNm}';





    let commonjs = '<script type="text/javascript" src="/js/mea/common.js">' + '</' + 'script>';

    let vHtml = `
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<tiles:insertDefinition name="common">
	<tiles:putAttribute name="headScript">
	${commonjs}
	<script>
	var searchFlag = false;
	$(function(){
		load();
	});
	${scriptFuc4}
	${scriptFuc}
	${scriptFuc2}
	${scriptFuc3}
	</tiles:putAttribute>

	<tiles:putAttribute name="content">
    <div id="content" class="content">
      <h1 class="title-sub-h1"><c:out value="${table_name5}"/></h1>
    </div>
    <div class="search-form expansion">
      <form name="searchForm" id="searchForm" method="post">
        <input type="hidden" name="useAt" id="useAt" value="Y" />
        <input type="hidden" name="curPage" id="curPage" value="1" />
			<table>
				<caption>검색 테이블</caption>
        <tbody>
          ${openPlayLoad.contentsRegistHtmlSearch}
					${searchConditionMapper2}
					<td colspan="2" class="text-right">
					  <button type="button" id="btnSearch" class="bt search table"><i class="ico search-w"></i>검색</button>
					</td>
				</tbody>
			</table>
    </div>
    <div class="list-bottom text-center">
      <button type="button" id="btnAdd" class="bt color1 wide">등록</button>
    </div>
    <div id="listDiv"></div>
	</tiles:putAttribute>
</tiles:insertDefinition>  
  `;
    return vHtml;
}

module.exports = {
    getCtrl: setCtrl
}