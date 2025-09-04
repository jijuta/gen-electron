function setCtrl(items, self) {
    let camelCase = self.camelCase;
    let openPlayLoad= self.openPlayLoad(items);
    let selectedcol = self.selectedObj.map(
        e => '<th scope="col">' + e.column_comment + "</th>" + "\r\n\t\t\t\t"
    ).join("");


    let selectedcolval = self.selectedObj.map(
        e => "<td>" + "<c:out value=" + '"${' + "list." + camelCase(e.column_name) + '}" /' + ">" + "</td>" + "\r\n\t\t\t\t\t\t\t"
    ).join("");//컬럼 콤마 제거

    //PRIMARY KEY 상세화면 파라미터
    let whereIdx2 = openPlayLoad.prikeyjsp;

    let listfunction = "${not empty rList}";
    let forEachItem = "${rList}";
    let trId = "index${status.index}";
    let goDetailfuc = '${list.' + camelCase(whereIdx2) + '}';

    let commonjs = '<script type="text/javascript" src="/js/mea/common.js">' + '</' + 'script>';


    let listTotalCntNe = '${listTotalCnt ne 0}';
    let listTotalCnt = '${listTotalCnt}';
    let curPage = '${curPage}';
    let pageNum = '${page + (1 - (page % 1)) % 1}';

    //페이징
    let searchConditionItem3 = `
<div class="list-bottom">
<!-- Pagination -->
  <div class="pagination">
    <oems:listPage listTotalCnt="${listTotalCnt}" curPage="${curPage}" pageFnc="load" />
  </div>
</div>
      `;

    let searchConditionMapper3 = searchConditionItem3;



    let vHtml = `
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
${commonjs}
<div class="search-form">
    <p class="count float-left">
   	 총 <c:out value="${listTotalCnt}"/>건의 글이 있습니다. <c:if test="${listTotalCntNe}">(<c:out value="${curPage}"/>/<fmt:formatNumber value="${pageNum}" type="number"/> 페이지)</c:if>
    </p>
</div>
<div class="table-list hover">
	<table>
		<caption class="blind">목록</caption>
		<thead>
			<tr>
				${selectedcol}
			</tr>
		</thead>
		<tbody>
			<c:choose>
				<c:when test="${listfunction}">
					<c:forEach items="${forEachItem}" var="list" varStatus="status">
						<tr onclick="javascript:goDetail('<c:out value="${goDetailfuc}" />')" style="cursor: pointer;">
							${selectedcolval}
						</tr>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<tr class="current">
						<td colspan="5">조회된 정보가 없습니다.</td>
					</tr>
				</c:otherwise>
			</c:choose>
		</tbody>
	</table>
</div>
${searchConditionMapper3}
      `;
    return vHtml;
}

module.exports = {
    getCtrl: setCtrl
}
