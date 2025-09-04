function setCtrl(items, self) {
    let camelCase = self.camelCase;

    let g = selectedcol2;
    
        
    let selectedcol2 = self.selectedObj.map(
        e => '{Header:"'+ e.column_comment +'",Type:"Text",'+'Width:70, SaveName:"'+camelCase(e.column_name)+'"},'+"\r\n\t"
    ).join("");
    
    let script = '</'+ 'script>';
    let collectList = '${collectList}';   
    
    // function grid1_OnDblClick(Row, Col, Value, CellX, CellY, CellW, CellH){
    //     var manager_id = grid1.GetCellValue(Row, 0);
    //     if(typeof manager_id != "undefined")
    //     {
    //         location.href="input.do?manager_id=" + manager_id + "&task=${task}";
    //     }
    // }

    let vHtml = `
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script type="text/javascript">
$(document).ready(function(){
    var initSheet = {};
    initSheet.Cfg = {AutoFitColWidth:"resize|init|search"};
    initSheet.HeaderMode = {};
    initSheet.Cols = [
    ${selectedcol2}
    ];
    createIBSheet2(doucument.getElementById('sheet'),"grid1","100%","100%");
    IBS_InitSheet(grid1 , initSheet);
    grid1.LoadSearchData(gridData_1);
    grid1.SetEditable(0);

    var dataGrid;
    var gridRoot;

    var gridData_1 = new Object();
    gridData_1.data = ${collectList};
${script};


<tiles:insertDefinition name="common">
    <tiles:putAttribute name="headScript">
    <div id='ib-container'></div>
    <div id='pagination' style='text-align:center;width:100%'></div>
    </tiles:putAttribute>
</tiles:insertDefinition>    
      `;
    return vHtml;
}

module.exports = {
    getCtrl: setCtrl
}