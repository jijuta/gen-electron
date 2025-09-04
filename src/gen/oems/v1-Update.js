const setCtrl = function(items, self) {
    let camelCase = self.camelCase;
    let openPlayLoad= self.openPlayLoad(items);
    //2019-10-01

    // 목록
    let scriptFuc = "";

    scriptFuc += '$("#btnList").click(function() {' + "\n\t\t\t\t\t";
    scriptFuc += 'commonForm.setUrl("./${pageDiv}.do");' + "\n\t\t\t\t\t";
    //scriptFuc += 'commonForm.addParam("curPage", "${param.curPage}");'+ "\n\n\t\t";
    scriptFuc += '// search value ' + "\n\t\t\t\t\t";
    self.selectedSearchobj.forEach((post, i) => {
        let camelizesUpdateVal3 = camelCase(post.column_name.toLowerCase());
        let TP = self.dataTypeinitTuTb(post.data_type);
        scriptFuc += 'commonForm.addParam("' + camelizesUpdateVal3 + '",' + '"${param.' + camelizesUpdateVal3 + '}");' + "\n\t\t\t\t\t";

    })
    // scriptFuc += 'commonForm.addParam("search_type", "${param.search_type}");' + "\n\t\t\t\t\t";
    // scriptFuc += 'commonForm.addParam("search_val", "${param.search_val}");' + "\n\n\t\t\t\t\t";
    scriptFuc += 'commonForm.submit();' + "\n\t\t\t\t" + "});"

    // 수정

    let scriptFuc2 = "";
    scriptFuc2 += '$("#btnUpdate").click(function() {' + "\n\t\t\t\t\t";
    scriptFuc2 += 'if(cmValid.check("modifyForm")) {' + "\n\t\t\t\t\t\t";
    scriptFuc2 += 'var url = "./${pageDiv}Update.do";' + "\n\t\t\t\t\t\t";
    scriptFuc2 += 'var confirmMsg = "수정하시겠습니까?";' + "\n\n\t\t\t\t\t";
    scriptFuc2 += 'if(confirm(confirmMsg)){' + "\n\t\t\t\t\t\t";
    scriptFuc2 += 'var form = $("#modifyForm")[0];' + "\n\t\t\t\t\t\t\t";
    scriptFuc2 += 'var formData = new FormData(form);' + "\n\t\t\t\t\t\t\t";
    scriptFuc2 += 'formData.append("sn",' + '"' + "<c:out value='${sn }' />" + '");' + "\n\t\t\t\t\t\t\t";
    scriptFuc2 += 'formData.append("pageDiv",' + '"' + "<c:out value='${pageDiv }' />" + '");' + "\n\t\t\t\t\t\t\t";

    scriptFuc2 += 'meaCmFunction.ajaxSubmitObj(' + "\n\t\t\t\t\t\t\t\t";
    scriptFuc2 += 'url' + "\n\t\t\t\t\t\t\t\t" + ', formData' + "\n\t\t\t\t\t\t\t\t" + ', function(data){' + "\n\t\t\t\t\t\t\t\t\t";
    scriptFuc2 += 'alert("수정되었습니다.");' + "\n\t\t\t\t\t\t\t\t\t" + 'commonForm.setUrl("./${pageDiv}.do");' + "\n\t\t\t\t\t\t\t\t\t" + 'commonForm.submit();' + "\n\t\t\t\t\t\t\t\t" + '}'
    // scriptFuc2 += 'function(){'+"\n\t\t\t\t\t"
    // scriptFuc2 += '$("#file").val("").attr("type", "file");'+"\n\t\t\t\t\t"+'}'
    scriptFuc2 += "\n\t\t\t\t\t\t\t" + ');' + "\n\t\t\t\t\t\t" + '}' + "\n\t\t\t\t\t" + '}' + "\n\t\t\t\t" + '});'

    let selectedUpdateItem = ""
    // 입력
    self.updateTabledobj.forEach((post, i) => {
        let camelizesUpdate = camelCase(post.column_name.toLowerCase());
        // let TP = self.dataTypeinitTuTb(post.data_type);
        //console.log(post)

        selectedUpdateItem += '<tr>';
        selectedUpdateItem += "\r\n\t\t\t\t\t\t\t";
        selectedUpdateItem += '<th scope="row">';
        selectedUpdateItem += '<em class="essential">*</em>';
        selectedUpdateItem += '<label for="';
        selectedUpdateItem += camelizesUpdate + '">';
        selectedUpdateItem += post.column_comment + "</label>";
        selectedUpdateItem += "</th>";
        selectedUpdateItem += "\r\n\t\t\t\t\t\t\t";

        selectedUpdateItem += "<td>";
        if (post.data_type == 'numeric') {
            selectedUpdateItem += '<input type="number" ' + 'id="' + camelizesUpdate + '" ' + 'name="' + camelizesUpdate + '" ' + 'value="<c:out value="${map.' + camelizesUpdate + '}" />" ' + 'placeholder="' + post.column_comment + ' 입력" class="full validate[required]" ' + '>';
        } else {
            selectedUpdateItem += '<input type="text" ' + 'id="' + camelizesUpdate + '" ' + 'name="' + camelizesUpdate + '" ' + 'value="<c:out value="${map.' + camelizesUpdate + '}" />" ' + 'placeholder="' + post.column_comment + ' 입력" class="full validate[required]" ' + '>';
        }
        selectedUpdateItem += '</td>';
        selectedUpdateItem += "\r\n\t\t\t\t\t\t";
        selectedUpdateItem += "</tr>";
        selectedUpdateItem += "\r\n\t\t\t\t\t\t";
    });

    //PRIMARY KEY 상세화면 파라미터
    let whereIdx = camelCase(openPlayLoad.prikeyjsp.toLowerCase());
    let whereValue = '${sn}'
    let commonjs = '<script type="text/javascript" src="/js/mea/common.js">' + '</' + 'script>';
    let endjs = '</' + 'script>';
    let vHtml =
        `
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<tiles:insertDefinition name="common">
	<tiles:putAttribute name="headScript">
    	${commonjs}
    	<script type="text/javascript">
			$(document).ready(function() {
				cmValid.set("modifyForm");

			});
			$(function(){
				${scriptFuc}
				${scriptFuc2}
			});
    	${endjs}
  	</tiles:putAttribute>
  	<tiles:putAttribute name="content">
		<form name="modifyForm" id="modifyForm" method="post">
			<input type="hidden" name="${whereIdx}Id" id="${whereIdx}Id" value="${whereValue}" />
			<!--  수정 양식 -->
			<div class="table-view">
				<table>
					<caption class="blind">수정</caption>
					<tbody>
						${selectedUpdateItem}
					</tbody>
				</table>
			</div>
		</form>
		<div class="list-bottom text-right">
			<button id="btnUpdate" class="bt default">수정</button>
			<button id="btnChange" class="bt default">변경</button>
			<button id="btnList" class="bt default">목록</button>
		</div>
  	</tiles:putAttribute>
</tiles:insertDefinition>
      `;


    return vHtml;

}

module.exports = {
    getCtrl: setCtrl
}
