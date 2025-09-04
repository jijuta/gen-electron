function setCtrl (items, self) {
    let openPlayLoad= self.openPlayLoad(items);
    // 2019-10-01

    //PRIMARY KEY 상세화면 파라미터
    let whereIdx = self.camelCase(openPlayLoad.prikeyjsp);
    let whereValue = '${sn}'
    let pageDiv = '${pageDiv}'
    //목록
    let scriptFuc = "";


    scriptFuc += '$(document).off( "click", "#btnSearch", function() {} );' + "\n\t\t\t\t\t";
    scriptFuc += '$(document).on("click","#btnSearch",function() {' + "\n\t\t\t\t\t";
    scriptFuc += 'commonForm.setUrl("./${pageDiv}.do");'+ "\n\t\t\t\t\t";
    scriptFuc += 'commonForm.addParam("curPage", "${param.curPage}");'+ "\n\t\t\t\t\t";
    //scriptFuc += 'commonForm.addParam("curPage", "${param.curPage}");'+ "\n\n\t\t";
    scriptFuc += '// search value '+ "\n\t\t\t\t\t";
    self.selectedSearchobj.forEach((post, i) => {
      let camelizesUpdateVal3 = self.camelCase(post.column_name.toLowerCase());
      let TP = self.dataTypeinitTuTb(post.data_type);
      scriptFuc += 'commonForm.addParam("'+camelizesUpdateVal3+'",'+ '"${param.'+camelizesUpdateVal3+'}");' + "\n\t\t\t\t\t";
    })
    // scriptFuc += 'commonForm.addParam("search_type", "${param.search_type}");' + "\n\t\t\t\t\t";
    // scriptFuc += 'commonForm.addParam("search_val", "${param.search_val}");' + "\n\n\t\t\t\t\t";
    scriptFuc += 'commonForm.submit();' + "\n\t\t\t\t" + "});";

    // 수정
        let scriptFuc2 =
      `
      $(document).off( "click", "#btnUpdate", function() {} );
      $(document).on("click","#btnUpdate",function() {
                  if( confirm("수정하시겠습니까?") ){
                      commonForm.setUrl("./${pageDiv}Modify.do");
                      commonForm.addParam("sn", "${whereValue}");
                      commonForm.addParam("${whereIdx}Id", "${whereValue}");
                      commonForm.submit();
                  }
              });
      ` ;


    let selectedItem = ""
    self.updateTabledobj.forEach((post, i) => {

      let camelizesName = self.camelCase(post.column_name.toLowerCase());
      // let TP = self.dataTypeinitTuTb(post.data_type);
      selectedItem += '<tr>'
      selectedItem +="\r\n\t\t\t\t\t\t";
      selectedItem += '<th scope="row">';
      selectedItem += post.column_comment;
      selectedItem += "</th>";
      selectedItem +="\r\n\t\t\t\t\t\t";

      selectedItem += "<td>";
      selectedItem += '<c:out value="${map.'+camelizesName+'}" default="-" />';
      selectedItem += '</td>';
      selectedItem +="\r\n\t\t\t\t\t";
      selectedItem += '</tr>'
      selectedItem +="\r\n\t\t\t\t\t";
    });

    let commonjs = '<script type="text/javascript" src="/js/mea/common.js">'+'</'+'script>';
    let endjs = '</'+'script>';
    let vHtml = `
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<tiles:insertDefinition name="common">
    <tiles:putAttribute name="headScript">
      ${commonjs}
      <script type="text/javascript">
          $(function(){
              ${scriptFuc}
              ${scriptFuc2}
          });
      ${endjs}
  </tiles:putAttribute>
  <tiles:putAttribute name="content">
      <h2 class="title-sub-h2">상세 내용</h2>
      <!-- 상세 보기 -->
      <div class="table-view">
          <table>
              <caption class="blind">상세1</caption>
              <tbody>
                  <input type="hidden" name="${whereIdx}" id="${whereIdx}" value="${whereValue}" />
                  ${selectedItem}
              </tbody>
          </table>
      </div>
      <div class="list-bottom text-right">
          <button id="btnUpdate" class="bt default">수정</button>
          <button id="btnList" class="bt default">목록</button>
      </div>
  </tiles:putAttribute>
</tiles:insertDefinition>
    `;
    return vHtml;
}
module.exports = {
    getCtrl : setCtrl
}
