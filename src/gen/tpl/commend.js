
const camelCase = require("camelcase");
const config = require("../config/config.js");
const cTBL = require("../tpl/tbl.js");
const utils = require("../tpl/utils.js");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * 
 * @param {쿼리결과} payLoad 
 * @param {저장경로} endfilename 
 * @param {서비스명} Sample 
 * @param {서비스인덱스 카멜} SampleSmIdx 
 * @param {서비스인덱스 카멜} PriKeyNm 
 * @param {타이틀} codedirTitle
 * @param {타이틀} ControllerDataTypeName 
 */
let setJavaGen = async function (datas,item) {

    let items = datas.data.rows;
    let tb = items[0];
    let tablename = item.table ? item.table : tb.TABLE_NAME;
    let codedirTitle = item.title ? item.title : tb.TABLE_COMMENTS;

    let SampleSmIdx = "";
    let ControllerDataTypeName = "";
    let codedir = "";

    let Sample = item.name ? camelCase(item.name) : camelCase(tablename);
    
    
    let SampleUrl = item.path;
    let PriKeyNm = item.priKeyNm ? item.priKeyNm : "";
    
    let SampleSmIdxUcfirst = utils.camalFirst(SampleSmIdx); //config.SampleSmIdx.capitalizeFirstLetter();
    let ViewName = config.ViewName ? config.ViewName : tablename;
    let viewdir = items.viewdir;
    let commentDir = items.commentDir;


    //제너레이터데이타조작
    let payload = {
        items: items,
        tb: tb,
        tablename: tablename,
        codedirTitle: codedirTitle,
        PriKeyNm: PriKeyNm,
        SampleSmIdx: SampleSmIdx,
        ControllerDataTypeName: ControllerDataTypeName,
        Sample: Sample,
        SampleLg: Sample.toUpperCase(),
        SampleSm: Sample.toLowerCase(),
        SampleUrl: SampleUrl,
        SampleSmIdxUcfirst: SampleSmIdxUcfirst,
        codedir: codedir,
        codedirDot: codedir.replace("/", "."),
        SampleVoPrivate: "",
        SampleVoPublic: "",
        table_name: tablename,
        selected: "",
        searchConditionMapper: "",
        inserted: "",
        interface: "",
        updated: "",
        resultMap: "",
        ViewName: ViewName,
        viewdir: viewdir,
        commentDir: commentDir,
        listsTitle: "",
        lists: ""

    }


    for (var i in items) {
        let row = items[i];
        if (row.PK_FLAG == 'Y') {
            payload.PriKeyNm = PriKeyNm ? PriKeyNm : row.COLUMN_NAME;
            payload.SampleSmIdx = SampleSmIdx ? SampleSmIdx : camelCase(row.COLUMN_NAME);
            payload.SampleSmIdxUcfirst = utils.camalFirst(payload.SampleSmIdx);
            payload.ControllerDataTypeName = ControllerDataTypeName ? ControllerDataTypeName : utils.dataType(row.DATA_TYPE);
        }
    }

    payload.selected =  await cTBL.getItemsObjcets(items);
    payload.inserted = await cTBL.getItemsObjcets(items);
    payload.interface = await cTBL.getInterFace(items);
    payload.listsTitle = await cTBL.getLists(items, 'th', true);
    payload.lists = await cTBL.getLists(items, 'td', false);
    //callback(endfilename, moduleDir, item, payload);
    
    return payload;

};

module.exports = {
    setJavaGen: setJavaGen
};