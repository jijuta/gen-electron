const camelCase = require("camelcase");
const fs = require("fs");
const shell = require("shelljs");
const res = require("./config/db.js");
const sqls = require("./config/mapper.js");
const config = require("./config/config.js");
const cTrl = require("./tpl/egovWeb.js");
const cTBL = require("./tpl/tbl.js");
const utils = require("./tpl/utils.js");

/**
 * 쿼리조회및명령어실행
 * @param {명령어} config.commend 
 * @param {테이블명} config.tablename
 * @param {쿼리문} sqlQuery
 * @param {콜백함수} setJavaGen 
 */
console.log(config);
sqls.getTableinfo(config.commend, config.tablename).then((sqlQuery => {
  
  res.getCommend(config.commend, sqlQuery, setJavaGen)
}))
/**
 * 코드제너레이터 전자정부 오라클, 티베로 
 * @param {타이틀} payload.codedirTitle 
 * @param {프라이머리 키} payload.SampleSmIdx 
 * @param {프라이머리키 데이타 형} payload.ControllerDataTypeName 
 * @param {서비스명} payload.Sample 
 * @param {페키지명} payload.codedir 
 * @param {테이블명} payload.table_name 
 * @param {프라이머리 키 디비필드명} payload.PriKeyNm 
 * @param {셀렉트} payload.selected 
 * @param {셀렉트조건} payload.searchConditionMapper 
 * @param {인서트문} payload.inserted 
 * @param {업데이트문} payload.updated
 * @param {resultMap} payload.resultMap 
 * @param {private} payload.SampleVoPrivate 
 * @param {public} payload.SampleVoPublic 
 */
let setJavaGen = function (datas) {

  //console.log("@@@@@@@@@@@@@@",datas.data);


  let items ;
  items = config.db_type==="mysql"? datas.data: datas.data.row;
  let tb = items[0];
  let tablename = config.tablename ? config.tablename : tb.TABLE_NAME;
  let codedirTitle = config.codedirTitle ? config.codedirTitle : tb.TABLE_COMMENTS;
  let SampleSmIdx = config.SampleSmIdx ? config.SampleSmIdx : "";
  let ControllerDataTypeName = config.ControllerDataTypeName ? config.ControllerDataTypeName : "";
  let Sample = config.Sample ? camelCase(config.Sample) : camelCase(tablename);
  let codedir = config.codedir ? config.codedir : "ect";
  let SampleUrl = codedir + '/' + Sample.toLowerCase();
  let PriKeyNm = config.PriKeyNm ? config.PriKeyNm : "ect";
  let SampleSmIdxUcfirst = utils.camalFirst(SampleSmIdx); //config.SampleSmIdx.capitalizeFirstLetter();
  let ViewName = config.ViewName ? config.ViewName : tablename;

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
    updated: "",
    resultMap: "",
    ViewName: ViewName
  }

  for (var item in items) {
    let row = items[item];
    if (row.PK_FLAG == 'Y') {
      payload.PriKeyNm = PriKeyNm ? PriKeyNm : row.COLUMN_NAME;
      payload.SampleSmIdx = SampleSmIdx ? SampleSmIdx : camelCase(row.COLUMN_NAME);
      payload.SampleSmIdxUcfirst = utils.camalFirst(payload.SampleSmIdx);
      payload.ControllerDataTypeName = ControllerDataTypeName ? ControllerDataTypeName : utils.dataType(row.DATA_TYPE);
    }
  }

  /**
   * payLoad 생성
   */
  let getsetArray = cTBL.getset(items);
  payload.SampleVoPrivate = getsetArray[0];
  payload.SampleVoPublic = getsetArray[1];
  payload.selected = cTBL.getSelected(items);
  payload.inserted = cTBL.getInserted(items);
  payload.updated = cTBL.getUpdated(items);
  payload.resultMap = cTBL.getResultMap(items);
  payload.searchConditionMapper = cTBL.getSearchConditionMapper(items);
  payload.searchConditionMapper = cTBL.getSearchConditionMapper(items);

  /**
   * json 생성
   */
  let tableInfo = {
    TableName: payload.tablename,
    CodedirTitle: payload.codedirTitle,
    Sample: payload.Sample,
    codeDir: payload.codedir,
    PriKeyNm: payload.PriKeyNm,
    ControllerDataTypeName: payload.ControllerDataTypeName,
    SampleSmIdx: payload.SampleSmIdx,
    Items: items,
    ViewName: payload.ViewName
  }

  cTrl.mainCreate(payload);
  cTrl.getMatadata(payload);
};