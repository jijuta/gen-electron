function setCtrl(items, self) {
    let camelCase = self.camelCase;
    let openPlayLoad= self.openPlayLoad(items);
    // 2019-10-01
    // 목록
    let scriptFuc = "";

    scriptFuc += '$("#btnList").click(function() {' + "\n\t\t\t\t\t";
    scriptFuc += 'commonForm.setUrl("./${pageDiv}.do");' + "\n\t\t\t\t\t";
    scriptFuc += 'commonForm.addParam("curPage", "${param.curPage}");' + "\n\t\t\t\t\t";
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

    // 등록


    let scriptFuc2 = "";
    scriptFuc2 += '$("#btnInsert").click(function() {' + "\n\t\t\t\t\t";
    scriptFuc2 += 'if(cmValid.check("addForm")) {' + "\n\t\t\t\t\t\t";
    scriptFuc2 += 'var url = "./${pageDiv}Write.do";' + "\n\t\t\t\t\t\t";
    scriptFuc2 += 'var confirmMsg = "등록하시겠습니까?";' + "\n\n\t\t\t\t\t\t";
    scriptFuc2 += 'if(confirm(confirmMsg)){' + "\n\t\t\t\t\t\t\t";
    scriptFuc2 += 'var form = $("#addForm")[0];' + "\n\t\t\t\t\t\t\t";
    scriptFuc2 += 'var formData = new FormData(form);' + "\n\t\t\t\t\t\t\t";
    scriptFuc2 += 'meaCmFunction.ajaxSubmitObj(' + "\n\t\t\t\t\t\t\t\t";
    scriptFuc2 += 'url' + "\n\t\t\t\t\t\t\t\t" + ', formData' + "\n\t\t\t\t\t\t\t\t" + ', function(data){' + "\n\t\t\t\t\t\t\t\t\t";
    scriptFuc2 += 'alert("등록되었습니다.");' + "\n\t\t\t\t\t\t\t\t\t" + 'commonForm.setUrl("./${pageDiv}.do");' + "\n\t\t\t\t\t\t\t\t\t" + 'commonForm.submit();' + "\n\t\t\t\t\t\t\t\t" + '}'
    // scriptFuc2 += 'function(){'+"\n\t\t\t\t\t"
    // scriptFuc2 += '$("#file").val("").attr("type", "file");'+"\n\t\t\t\t\t"+'}'
    scriptFuc2 += "\n\t\t\t\t\t\t\t" + ');' + "\n\t\t\t\t\t\t" + '}' + "\n\t\t\t\t\t" + '}' + "\n\t\t\t\t" + '});'

    //console.log(self.insertTabledobj)
    // let selectedInsertCol = self.insertTabledobj.map(
    //   e => '<label for="' + e.column_name + '">' +  e.column_comment + "</label>"
    // ).join(" ");

    let selectedInsertItem = ""

    self.insertTabledobj.forEach((post, i) => {

        let camelizesInsert = camelCase(post.column_name.toLowerCase());
        // let TP = self.dataTypeinitTuTb(post.data_type);
        selectedInsertItem += '<tr>';
        selectedInsertItem += "\r\n\t\t\t\t\t\t\t";
        selectedInsertItem += '<th scope="row">';
        selectedInsertItem += '<em class="essential">*</em>';
        selectedInsertItem += '<label for="';
        selectedInsertItem += camelizesInsert + '">';
        selectedInsertItem += post.column_comment + "</label>";
        selectedInsertItem += "</th>";
        selectedInsertItem += "\r\n\t\t\t\t\t\t\t";

        selectedInsertItem += "<td>";
        if (post.data_type == 'numeric') {
            selectedInsertItem += '<input type="number" ' + 'id="' + camelizesInsert + '" ' + 'name="' + camelizesInsert + '" ' + 'value="" ' + 'placeholder="' + post.column_comment + ' 입력" class="full validate[required]" ' + '>';
        } else {
            selectedInsertItem += '<input type="text" ' + 'id="' + camelizesInsert + '" ' + 'name="' + camelizesInsert + '" ' + 'value="" ' + 'placeholder="' + post.column_comment + ' 입력" class="full validate[required]" ' + '>';
        }
        selectedInsertItem += '</td>';
        selectedInsertItem += "\r\n\t\t\t\t\t\t";
        selectedInsertItem += '</tr>';
        selectedInsertItem += "\r\n\t\t\t\t\t\t";

    });
    //PRIMARY KEY 상세화면 파라미터

    let whereIdx = camelCase(openPlayLoad.prikeyjsp.toLowerCase());
    let whereValue = '${sn}'
    let commonjs = '<script type="text/javascript" src="/js/mea/common.js">' + '</' + 'script>';
    let endjs = '</' + 'script>';
    let vHtml = `
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<tiles:insertDefinition name="common">
  	<tiles:putAttribute name="headScript">
		${commonjs}
		<script type="text/javascript">
			$(document).ready(function() {
				cmValid.set("addForm");

			});
			$(function(){
				${scriptFuc}
				${scriptFuc2}
			});
		${endjs}
  	</tiles:putAttribute>

	<tiles:putAttribute name="content">
		<form name="addForm" id="addForm" method="post">
			<!--  등록 양식 -->
			<div class="table-view">
				<table>
					<caption class="blind">등록</caption>
					<tbody>
						${selectedInsertItem}
					</tbody>
				</table>
			</div>
		</form>
		<div class="list-bottom text-right">
			<button id="btnInsert" class="bt default">등록</button>
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
