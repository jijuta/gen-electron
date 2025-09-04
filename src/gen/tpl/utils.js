const fs = require("fs");
const shell = require("shelljs");
const camelCase = require("camelcase");

const capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function left(s, c) {
  return s.substr(0, c);
}//left("abcd",2)
function right(s, c) {
  return s.substr(-c);
}//right("abcd",2)
function mid(s, c, l) {
  return s.substring(c, l);
}//mid("abcd",1,2)
function copy(s, c, l) {
  return s.substr(c, l);
}//copy("abcd",1,2)

const JavaFleWrite = function (dir, corder, name, item) {

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

  return true;
}
const dataType = function (key2) {
  let datatypevalue = "";
  let key = key2 ? key2.toUpperCase() : "";
  switch (key) {
    case 'NUMBER':
    case 'INT':
    case 'TINYINT':
    case 'SMALLINT':
    case 'MEDIUMINT':
      datatypevalue = 'int'
      break;
    case 'CHAR':
    case 'ENUM':
      datatypevalue = 'String'
      break;
    case 'VARCHAR2':
      datatypevalue = 'String'
      break;
    case 'VARCHAR':
      datatypevalue = 'String'
      break;
    case 'DOUBLE':
    case 'DECIMAL':
      datatypevalue = 'double'
      break;
    case 'FLOAT'://
      datatypevalue = 'float'
      break;
    case 'BLOB':
    case 'CLOB':
    case 'BINARY':
    case 'VARBINARY':
      datatypevalue = 'byte[]'
      break;
    case 'DATE':
    case 'DATETIME':
    case 'TIMESTAMP':
    case 'TIME':
      datatypevalue = 'String'
      break;
    default:
      datatypevalue = key
      break;
  }
  return datatypevalue;
}
const dataTypeTs = function (key2) {
  let datatypevalue = "";
  let key = key2 ? key2.toUpperCase() : "";
  switch (key) {
    case 'NUMBER':
    case 'INT':
    case 'TINYINT':
    case 'SMALLINT':
    case 'MEDIUMINT':
      datatypevalue = 'number'
      break;
    case 'CHAR':
    case 'ENUM':
      datatypevalue = 'String'
      break;
    case 'VARCHAR2':
      datatypevalue = 'String'
      break;
    case 'VARCHAR':
      datatypevalue = 'String'
      break;
    case 'DOUBLE':
    case 'DECIMAL':
      datatypevalue = 'number'
      break;
    case 'FLOAT'://
      datatypevalue = 'number'
      break;
    case 'BLOB':
    case 'CLOB':
    case 'BINARY':
    case 'VARBINARY':
      datatypevalue = 'String'
      break;
    case 'DATE':
    case 'DATETIME':
    case 'TIMESTAMP':
    case 'TIME':
      datatypevalue = 'String'
      break;
    default:
      datatypevalue = 'any'
      break;
  }
  return datatypevalue;
}
const dataTypeInitValue = function (key2) {
  let dataTypeInitValue = "";
  let key = key2 ? key2.toUpperCase() : "";
  switch (key) {
    case 'NUMBER':
    case 'INT':
    case 'TINYINT':
    case 'SMALLINT':
    case 'MEDIUMINT':
      dataTypeInitValue = 0
      break;
    case 'ENUM':
    case 'CHAR':
      dataTypeInitValue = '""'
      break;
    case 'VARCHAR2':
      dataTypeInitValue = '""'
      break;
    case 'VARCHAR':
      dataTypeInitValue = '""'
      break;
    case 'DOUBLE':
    case 'DECIMAL':
      dataTypeInitValue = 0
      break;
    case 'FLOAT'://
      dataTypeInitValue = 0
      break;
    case 'BLOB':
    case 'CLOB':
    case 'BINARY':
    case 'VARBINARY':
      dataTypeInitValue = '""'
      break;
    case 'DATE':
    case 'DATETIME':
    case 'TIMESTAMP':
    case 'TIME':
      dataTypeInitValue = '""'
      break;
    default:
      dataTypeInitValue = '""'
      break;
  }
  return dataTypeInitValue;
}
const dataTypeJavascript = function (key2) {
  let datatypevalue = "";
  let key = key2 ? key2.toUpperCase() : "";

  switch (key) {
    case 'NUMBER':
    case 'INT':
    case 'TINYINT':
    case 'SMALLINT':
    case 'MEDIUMINT':
      dataTypeInitValueMapper = 0
      break;
    case 'CHAR':
    case 'ENUM':
      dataTypeInitValueMapper = "''"
      break;
    case 'VARCHAR2':
      dataTypeInitValueMapper = "''"
      break;
    case 'VARCHAR':
      dataTypeInitValueMapper = "''"
      break;
    case 'DOUBLE':
    case 'DECIMAL':
      dataTypeInitValueMapper = 0
      break;
    case 'FLOAT'://
      dataTypeInitValueMapper = 0
      break;
    case 'BLOB':
    case 'CLOB':
    case 'BINARY':
    case 'VARBINARY':
      dataTypeInitValueMapper = "''"
      break;
    case 'DATE':
    case 'DATETIME':
    case 'TIMESTAMP':
    case 'TIME':
      dataTypeInitValueMapper = "''"
      break;
    default:
      dataTypeInitValueMapper = key
      break;
  }
  return datatypevalue;
}
const dataTypeFnc = function (key2) {
  let datatypevalue = "";
  let key = key2 ? key2.toUpperCase() : "";
  switch (key) {
    case 'NUMBER':
    case 'INT':
    case 'TINYINT':
    case 'SMALLINT':
    case 'MEDIUMINT':
      datatypevalue = 'int'
      break;
    case 'CHAR':
    case 'ENUM':
      datatypevalue = 'String'
      break;
    case 'VARCHAR2':
      datatypevalue = 'String'
      break;
    case 'VARCHAR':
      datatypevalue = 'String'
      break;
    case 'DOUBLE':
    case 'DECIMAL':
      datatypevalue = 'double'
      break;
    case 'FLOAT'://
      datatypevalue = 'float'
      break;
    case 'BLOB':
    case 'CLOB':
    case 'BINARY':
    case 'VARBINARY':
      datatypevalue = 'byte[]'
      break;
    case 'DATE':
    case 'DATETIME':
    case 'TIMESTAMP':
    case 'TIME':
      datatypevalue = 'String'
      break;
    default:
      datatypevalue = key
      break;
  }
  return datatypevalue;
}
const dataTypeForm = function (key2) {
  let datatypevalue = "";
  let key = key2 ? key2.toUpperCase() : "";
  switch (key) {
      case 'NUMBER':
      case 'INT':
      case 'TINYINT':
      case 'SMALLINT':
      case 'MEDIUMINT':
          datatypevalue = 'number'
          break;
      case 'CHAR':
      case 'ENUM':
          datatypevalue = 'text'
          break;
      case 'VARCHAR2':
          datatypevalue = 'text'
          break;
      case 'VARCHAR':
          datatypevalue = 'text'
          break;
      case 'DOUBLE':
      case 'DECIMAL':
          datatypevalue = 'number'
          break;
      case 'FLOAT'://
          datatypevalue = 'number'
          break;
      case 'BLOB':
      case 'CLOB':
      case 'BINARY':
      case 'VARBINARY':
          datatypevalue = 'text'
          break;
      case 'DATE':
      case 'DATETIME':
      case 'TIMESTAMP':
      case 'TIME':
          datatypevalue = 'date'
          break;
      default:
          datatypevalue = key
          break;
  }
  return datatypevalue;
}
const dataTypeListHtml = function (item, type) {
  let column_name = camelCase(item.column_name);
  let column_comment = item.column_comment ? item.column_comment : item.column_name;
  let table_name = item.table_name;
  let pk_flag = item.pk_flag;
  let Sample = column_name.stringFirstUpperCase();
  let SampleLg = column_name.toUpperCase();
  let SampleSmIdxUcfirst = column_name.stringFirstUpperCase();
  let sampleNmFirst = column_name.stringFirstUpperCase();
  let vHtml = '';
  let name = "${resultInfo." + column_name + "}";
  //${resultInfo.'.column_name.'}
  /*if(type==='table' && pk_flag !=='Y'){
    vHtml = '<td id="" data-f="'+column_name+'">'+name+'</td>';
  }else{
    vHtml = '<td id="" data-f="'+column_name+'"><input type="checkbox">'+name+'</th>';
  }*/
  vHtml = '<td title="' + column_comment + '" id="list_' + column_name + '" data-f="' + column_name + '">' + name + '</td>';
  return vHtml;
}
const dataTypeListHeaderHtml = function (item, type) {
  let column_name = camelCase(item.column_name);
  let column_comment = item.column_comment;
  let table_name = item.table_name;
  let vHtml = '';
  vHtml = '<th id="headerth_' + column_name + '" onClick="orderbyfnc()"  data-t="' + table_name + ' data-f="' + column_name + '">' + column_comment + '</th>';
  return vHtml;
}
const dataTypeinitTuTb = function (item, type) {
  let TU = item ? item.toUpperCase() : "";

  let TV = "String";
  let TP = " \"\" ";
  if (TU == 'INT' || TU == 'TINYINT' || TU == 'SMALLINT' || TU == 'MEDIUMINT' || TU == 'BIGINT') {
    TV = "int";
    TP = " 0 ";
  }
  if (TU == 'CHAR' || TU == 'VARCHAR' || TU == 'ENUM') {
    TV = "String";
  }
  if (TU == 'BINARY' || TU == 'VARBINARY' || TU == 'CLOB' || TU == 'BLOB') {
    TV = "byte[]";
  }
  if (TU == 'TEXT' || TU == 'TINYTEXT' || TU == 'MEDIUMTEXT' || TU == 'LONGTEXT') {

  }
  if (TU == 'TINYBLOB' || TU == 'MEDIUMBLOB' || TU == 'LONGBLOB' || TU == 'LONGTEXT') {
    TV = "byte[]";
  }
  if (TU == 'DOUBLE') {
    TV = "double";
    TP = " 0 ";
  }
  if (TU == 'FLOAT') {
    TV = "float";
    TP = " 0 ";
  }
  let r = TP;
  if (type === 2) r = TV;
  return r;
}
const dataTypeHtml = function (item) {
  //console.log(item);
  let TU = item.data_type.toUpperCase();
  let TV = "String";
  let TP = " \"\" ";
  let TT = "text";
  let classnm = "input text";
  let sample = camelCase(item.column_name);
  let column_comment = item.column_comment ? item.column_comment : column_name;

  let vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" >'
  if (TU == 'INT' || TU == 'INT8' || TU == 'INT4' || TU == 'INT2' || TU == 'TINYINT' || TU == 'SMALLINT' || TU == 'MEDIUMINT' || TU == 'BIGINT') {
    TV = "int";
    TP = " 0 ";
    TT = 'number';
    classnm = "input " + TT;
    vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" >'
  }

  if (TU == 'ENUM') {
    TP = " 0 ";
    TT = 'text';
    TV = "String";
    classnm = "input " + TT;
    vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" />'
  }
  if (TU == 'BINARY' || TU == 'VARBINARY' || TU == 'CLOB' || TU == 'BLOB' || TU == 'TINYBLOB' || TU == 'MEDIUMBLOB' || TU == 'LONGBLOB') {
    TV = "byte[]";
    TT = 'file';
    classnm = "input " + TT;
    vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" />'
  }
  if (TU == 'TEXT' || TU == 'TINYTEXT' || TU == 'MEDIUMTEXT' || TU == 'LONGTEXT') {
    vHtml = '<textarea class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" ></textarea>'

  }
  if (TU == 'DOUBLE' || TU == 'FLOAT') {
    TV = "double";
    TP = " 0 ";
    TT = 'number';
    classnm = "input " + TT;
    vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" />'
  }

  //DATE, DATETIME, TIMESTAMP
  if (TU == 'DATE' || TU == 'DATETIME' || TU == 'TIMESTAMP' || TU == 'TIME') {
    TV = "string";
    TP = " 0 ";
    TT = 'date';
    classnm = "input " + TT;
    vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" />'
  }
  let r = '<th>' + column_comment + '</th><td>' + vHtml + '</td><!--' + column_comment + '-->';
  return r;
}
const dataTypeUpdateHtml = function (item) {
  //console.log(item);
  let TU = item.data_type.toUpperCase();
  let TV = "String";
  let TP = " \"\" ";
  let TT = "text";
  let classnm = "input text";
  let sample = camelCase(item.column_name);
  let column_comment = item.column_comment ? item.column_comment : column_name;
  let name = "${result." + sample + "}";
  let vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" >'
  if (TU == 'INT' || TU == 'INT8' || TU == 'INT4' || TU == 'INT2' || TU == 'TINYINT' || TU == 'SMALLINT' || TU == 'MEDIUMINT' || TU == 'BIGINT') {
    TV = "int";
    TP = " 0 ";
    TT = 'number';
    classnm = "input " + TT;
    vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" value="' + name + '">'
  }

  if (TU == 'ENUM') {
    TP = " 0 ";
    TT = 'text';
    TV = "String";
    classnm = "input " + TT;
    vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" value="' + name + '">'
  }
  if (TU == 'BINARY' || TU == 'VARBINARY' || TU == 'CLOB' || TU == 'BLOB' || TU == 'TINYBLOB' || TU == 'MEDIUMBLOB' || TU == 'LONGBLOB') {
    TV = "byte[]";
    TT = 'file';
    classnm = "input " + TT;
    vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" value="' + name + '">'
  }
  if (TU == 'TEXT' || TU == 'TINYTEXT' || TU == 'MEDIUMTEXT' || TU == 'LONGTEXT') {
    vHtml = '<textarea class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" >' + name + '</textarea>'

  }
  if (TU == 'DOUBLE' || TU == 'FLOAT') {
    TV = "double";
    TP = " 0 ";
    TT = 'number';
    classnm = "input " + TT;
    vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" value="' + name + '">'
  }

  //DATE, DATETIME, TIMESTAMP
  if (TU == 'DATE' || TU == 'DATETIME' || TU == 'TIMESTAMP' || TU == 'TIME') {
    TV = "string";
    TP = " 0 ";
    TT = 'date';
    classnm = "input " + TT;
    vHtml = '<input class="' + classnm + '" type="' + TT + '" name="' + sample + '" id="' + sample + '" value="' + name + '">'
  }
  //let r = `<tr><th>${column_comment}</th><td>${vHtml}</td><!--${column_comment}-->`;
  let r = '<th>' + column_comment + '</th><td>' + vHtml + '</td><!--' + column_comment + '-->';
  return r;
}
const dataTypeDetailHtml = function (item) {
  let column_name = camelCase(item.column_name);
  let column_comment = item.column_comment ? item.column_comment : column_name;
  let table_name = item.table_name;
  let pk_flag = item.pk_flag;
  let Sample = column_name.stringFirstUpperCase();
  let SampleLg = column_name.toUpperCase();
  let SampleSmIdxUcfirst = column_name.stringFirstUpperCase();
  let sampleNmFirst = column_name.stringFirstUpperCase();
  let vHtml = '';
  let name = "${result." + column_name + "}";
  vHtml = `<th  data-t="${table_name}" data-f="${column_name}">${column_comment}</th>
  <td id="${column_name}" data-f="${column_name}">${name}</td>`;
  return vHtml;
}
const vueComment = function (item) {
  var len;
  let column_name = camelCase(item.column_name);
  let column_comment = item.column_comment;
  let table_name = item.table_name;
  if (column_comment) {
    len = column_comment.length;
  } else {

    len = column_name.length;
  }

  console.log(len);
  var sty = "thlen-60 text-center";
  switch (len) {
    case 2: sty = "thlen-70"; break;
    case 3: sty = "thlen-85"; break;
    case 4: sty = "thlen-90"; break;
    case 5: sty = "thlen-100"; break;
    case 6: sty = "thlen-110"; break;
    case 7: sty = "thlen-110"; break;
    case 8: sty = "thlen-120"; break;
    case 9: sty = "thlen-130"; break;
    case 10: sty = "thlen-140"; break;
    case 11: sty = "thlen-150"; break;
    case 12: sty = "thlen-160"; break;
    case 13: sty = "thlen-170"; break;
    case 14: sty = "thlen-180"; break;
    case 15: sty = "thlen-190"; break;
    case 16: sty = "thlen-200"; break;
    case 17: sty = "thlen-200"; break;
    case 18: sty = "thlen-200"; break;
    case 19: sty = "thlen-200"; break;
    case 20: sty = "thlen-200"; break;

    default: sty = "thlen-80 text-center";
      break;
  }
  return '<th class="' + sty + '">' + column_comment + '</th>';
}
const vueCommentBody = function (item) {
  let column_name = camelCase(item.column_name);
  let column_comment = item.column_comment;
  if (!column_comment) column_comment = column_name;

  return "<td>{{item." + camelCase(column_name) + "}}</td><!-- " + column_comment + " -->";
}
const vueInsertBox = function (item, SampleSmIdx) {
  let column_name = camelCase(item.column_name);
  let column_comment = item.column_comment;
  let Sample = column_name.stringFirstUpperCase();
  if (!column_comment) column_comment = column_name;
  let null_flag = item.null_flag;
  let data_type = item.data_type;

  var classnm = "col-md-6 p-2";
  var ck1 = right(column_name, 5);
  var ck2 = "";
  var SEQ = right(column_name, 3);
  var TB = right(column_name, 2);
  var disabled = SampleSmIdx === camelCase(column_name) ? "disabled" : "";
  var Day = "";
  var notnulstr = null_flag !== 'Y' ? '<span class="notnull">*</span>' : '';
  var vHtml = "";
  var hidden = "";
  var hiddenClass = "";
  //console.log(column_name, ck1);
  var DATA_TYPE = dataTypeForm(data_type);

  if (column_name === 'ETC1'
    || column_name === 'ETC2'
    || camelCase(column_name) === 'frstRegisterId'
    //|| camelCase(column_name)==='frstRegistPnttm'
    || camelCase(column_name) === 'lastUpdusrId'
    //|| SEQ ==='SEQ'
    //|| camelCase(column_name)==='lastUpdtPnttm'
  ) {
    DATA_TYPE = "hidden";
    hiddenClass = " d-none ";
  }

  if (ck1 === '_CODE') {
    ck2 = column_name.replace('_CODE', "");
    //console.log(ck2);
    vHtml = `
              <!-- ${column_comment} -->
              <div  class="${classnm} ${hiddenClass}">
                  <label for="items.${Sample}VO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
                  <select class="custom-select" id="items.${Sample}VO.${camelCase(column_name)}"  v-model = "items.${Sample}VO.${camelCase(column_name)}" ${disabled}>
                      <option selected value="" >${column_comment}</option>
                      <option :value="item.name" v-for="item in selectBoxitems.${ck2.toUpperCase()}">{{item.label}}</option>
                  </select>
                  <!--  
                  ++ 안에는 컬럼 명으로 생성
                  @Input ==> items+(column_name)+Cng vue method function 만들기
                  v-model ==> items.+camelCase(column_name)+Info v-model 선언
                  JS 파일에서 필요한 코드성 데이터를 변수에 선언
                  제너레이터에서 생성한 JS 파일 확인
                  :options="selectBoxitems.CODEID"
                  
                  <multiselect  @Input="items${camelCase(column_name)}Cng" v-model="items.${camelCase(column_name)}Info" :options="selectBoxitems.CODEID" placeholder="${column_comment}" label="${camelCase(column_name)}Nm" track-by="${camelCase(column_name)}Nm">
                  <span slot="noResult" v-cloak>
                       검색어와 일치하는 내용이 없습니다.
                     </span>
                     <span slot="noOptions" v-cloak>
                       검색할 내용이 없습니다.
                     </span>
                </multiselect>
                    <pre class="d-none"><code>{{ items.${camelCase(column_name)}  }}</code></pre>
                    <pre class="d-none"><code>{{ items.${camelCase(column_name)}Info  }}</code></pre>

                  -->
              </div>`;
  } else {

    vHtml = `
              <!-- ${column_comment} -->
              <div  class="${classnm}  ${hiddenClass}">
                  <label for="items.${Sample}VO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
                  <input type="${DATA_TYPE}" id="items.${Sample}VO.${camelCase(column_name)}" class="form-control" v-model = "items.${Sample}VO.${camelCase(column_name)}" placeholder="${column_comment}" ${disabled} />
              </div>`;
  }
  //return str + ":" + utils.dataTypeInitValue(str);
  if (camelCase(column_name) === 'useAt') {
    vHtml = "";
    ck2 = "USEATE";
    vHtml = `
              <!-- ${column_comment} -->
              <div  class="${classnm} ${hiddenClass}">
              <label for="items.${Sample}VO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
                  <select class="custom-select" id="items.${Sample}VO.${camelCase(column_name)}"  v-model = "items.${Sample}VO.${camelCase(column_name)}" ${disabled}>
                      <option selected value="" >${column_comment}</option>
                      <option :value="item.name" v-for="item in selectBoxitems.${ck2.toUpperCase()}">{{item.label}}</option>
                  </select>
              </div>`;

  }

  if (camelCase(column_name) === 'frstRegistPnttm' || camelCase(column_name) === 'lastUpdtPnttm' || DATA_TYPE === "date") {
    vHtml = `
          <div  class="${classnm} ${hiddenClass}" >
          <label for="items.${Sample}VO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
           <div class="input-group">     
              <input type="date" id="items.${Sample}VO.${camelCase(column_name)}" class="datepicker form-control" v-model = "items.${Sample}VO.${camelCase(column_name)}" placeholder="${column_comment}" ${disabled} />
              <div class="input-group-append">
                  <span class="input-group-text"><i class="ti-calendar"></i></span>
              </div>
              </div>
          </div>`;
  }
  var Year = right(column_name, 4);
  var Month = right(column_name, 5);
  var Day = right(column_name, 3);
  //console.log(column_comment, column_name, "연도",Year,'월',  Month,'일', Day);
  if (Year === 'YEAR') {
    vHtml = `
      <div  class="${classnm} ${hiddenClass}" >
      <label for="items.${Sample}VO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
       <div class="input-group">     
          <input type="date" id="items.${Sample}VO.${camelCase(column_name)}" class="datepicker form-control" v-model = "items.${Sample}VO.${camelCase(column_name)}" placeholder="${column_comment}" disabled />
          <div class="input-group-append">
              <span class="input-group-text"><i class="ti-calendar"></i></span>
          </div>
          </div>
      </div>`;
  }
  if (Month === 'MONTH') {
    vHtml = `
      <div  class="${classnm} ${hiddenClass}" >
      <label for="items.${Sample}VO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
       <div class="input-group">     
          <input type="date" id="items.${Sample}VO.${camelCase(column_name)}" class="datepicker form-control" v-model = "items.${Sample}VO.${camelCase(column_name)}" placeholder="${column_comment}" disabled />
          <div class="input-group-append">
              <span class="input-group-text"><i class="ti-calendar"></i></span>
          </div>
          </div>
      </div>`;
  }

  if (Day === 'DAY') {
    vHtml = `
      <div  class="${classnm} ${hiddenClass}" >
       <div class="input-group">     
       <label for="items.${Sample}VO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
          <input type="date" id="items.${Sample}VO.${camelCase(column_name)}" class="datepicker form-control" v-model = "items.${Sample}VO.${camelCase(column_name)}" placeholder="${column_comment}" disabled />
          <div class="input-group-append">
              <span class="input-group-text"><i class="ti-calendar"></i></span>
          </div>
          </div>
      </div>`;
  }
  if (TB === "TB") {
    vHtml = `
      <div  class="${classnm} ${hiddenClass}" >
       <div class="input-group">     
       <label for="items.${Sample}VO.${camelCase(column_name)}">${notnulstr}${column_comment}########${TB}</label>
          <input type="text" id="items.${Sample}VO.${camelCase(column_name)}" class="form-control" v-model = "items.${Sample}VO.${camelCase(column_name)}" placeholder="${column_comment}" disabled/>
          <div class="input-group-append">
              <span class="input-group-text"><i class="ti-search"></i></span>
          </div>
          </div>
      </div>`;
  }
  //return str + ":" + utils.dataTypeInitValue(str);
  if (right(column_comment, 2) === '여부') {
    vHtml = "";
    ck2 = "";
    ck2 = "USEATE";
    vHtml = `
              <!-- ${column_comment} -->
              <div  class="${classnm} ${hiddenClass}">
              <label for="items.${Sample}VO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
                  <select class="custom-select" id="items.${Sample}VO.${camelCase(column_name)}"  v-model = "items.${Sample}VO.${camelCase(column_name)}">
                      <option selected value="" >${column_comment}</option>
                      <option :value="item.name" v-for="item in selectBoxitems.${ck2.toUpperCase()}">{{item.label}}</option>
                  </select>
              </div>`;

  }
  //console.log("######",TB);
  return vHtml;
}
const vueSearchBox = function(item) {
  let column_name = camelCase(item.column_name);
  let column_comment = item.column_comment;
  let null_flag = item.null_flag;
  let data_type = item.data_type;
  //let Sample = column_name.stringFirstUpperCase();
  //let SampleLg = column_name.toUpperCase();
  //let SampleSmIdxUcfirst = column_name.stringFirstUpperCase();
  //let sampleNmFirst = column_name.stringFirstUpperCase();
  if (!column_comment) column_comment = column_name;
  var classnm = "col-sm-6 col-md-3 col-lg-3 p-2";
  var ck1 = right(column_name, 5);
  var ck2 = "";
  var SEQ = right(column_name, 2);
  var disabled = "";
  var Day = "";
  var notnulstr = null_flag !== 'Y' ? '<span class="notnull">*</span>' : '';
  var vHtml = "";
  var hidden = "";
  var hiddenClass = "";
  //console.log(column_name, ck1);
  var DATA_TYPE = dataTypeForm(data_type);

  if (column_name === 'ETC1'
    || column_name === 'ETC2'
    || camelCase(column_name) === 'frstRegisterId'
    //|| camelCase(column_name)==='frstRegistPnttm'
    || camelCase(column_name) === 'lastUpdusrId'
    //|| SEQ ==='SEQ'
    //|| camelCase(column_name)==='lastUpdtPnttm'
  ) {
    DATA_TYPE = "hidden";
    hiddenClass = " d-none ";
  }
  console.log(column_name)

  if (ck1 === '_CODE') {
    let ck2 = column_name.replace('_CODE', "");
    //console.log(ck2);
    vHtml = `
              <!-- ${column_comment} -->
              <div  class="${classnm} ${hiddenClass}">
                  <label for="searchVO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
                  <select class="custom-select" id="searchVO.${camelCase(column_name)}"  v-model = "searchVO.${camelCase(column_name)}">
                      <option selected value="" >${column_comment}</option>
                      <option :value="item.name" v-for="item in selectBoxitems.${ck2.toUpperCase()}">{{item.label}}</option>
                  </select>
                  <!--  
                  ++ 안에는 컬럼 명으로 생성
                  @Input ==> items+(column_name)+Cng vue method function 만들기
                  v-model ==> items.+camelCase(column_name)+Info v-model 선언
                  JS 파일에서 필요한 코드성 데이터를 변수에 선언
                  제너레이터에서 생성한 JS 파일 확인
                  :options="selectBoxitems.CODEID"
                  
                  <multiselect  @Input="items${camelCase(column_name)}Cng" v-model="items.${camelCase(column_name)}Info" :options="selectBoxitems.CODEID" placeholder="${column_comment}" label="${camelCase(column_name)}Nm" track-by="${camelCase(column_name)}Nm">
                  <span slot="noResult" v-cloak>
                       검색어와 일치하는 내용이 없습니다.
                     </span>
                     <span slot="noOptions" v-cloak>
                       검색할 내용이 없습니다.
                     </span>
                </multiselect>
                    <pre class="d-none"><code>{{ items.${camelCase(column_name)}  }}</code></pre>
                    <pre class="d-none"><code>{{ items.${camelCase(column_name)}Info  }}</code></pre>

                  -->
              </div>`;
  } else {

    vHtml = `
              <!-- ${column_comment} -->
              <div  class="${classnm}  ${hiddenClass}">
                  <label for="searchVO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
                  <input type="${DATA_TYPE}" id="searchVO.${camelCase(column_name)}" class="form-control" v-model = "searchVO.${camelCase(column_name)}" placeholder="${column_comment}" />
              </div>`;
  }
  //return str + ":" + utils.dataTypeInitValue(str);
  if (camelCase(column_name) === 'useAt') {
    vHtml = "";
    ck2 = "";
    ck2 = "USEATE";
    vHtml = `
              <!-- ${column_comment} -->
              <div  class="${classnm} ${hiddenClass}">
              <label for="searchVO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
                  <select class="custom-select" id="searchVO.${camelCase(column_name)}"  v-model = "searchVO.${camelCase(column_name)}">
                      <option selected value="" >${column_comment}</option>
                      <option :value="item.name" v-for="item in selectBoxitems.${ck2.toUpperCase()}">{{item.label}}</option>
                  </select>
              </div>`;

  }

  if (camelCase(column_name) === 'frstRegistPnttm' || camelCase(column_name) === 'lastUpdtPnttm' || DATA_TYPE === "date") {
    vHtml = `
          <div  class="${classnm} ${hiddenClass}" >
          <label for="searchVO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
           <div class="input-group">     
              <input type="date" id="searchVO.${camelCase(column_name)}" class="datepicker form-control" v-model = "searchVO.${camelCase(column_name)}" placeholder="${column_comment}" />
              <div class="input-group-append">
                  <span class="input-group-text"><i class="ti-calendar"></i></span>
              </div>
              </div>
          </div>`;
  }
  var Year = right(column_name, 4);
  var Month = right(column_name, 5);
  var Day = right(column_name, 3);
  //console.log(column_comment, column_name, "연도",Year,'월',  Month,'일', Day);
  if (Year === 'YEAR') {
    vHtml = `
      <div  class="${classnm} ${hiddenClass}" >
      <label for="searchVO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
       <div class="input-group">     
          <input type="date" id="searchVO.${camelCase(column_name)}" class="datepicker form-control" v-model = "searchVO.${camelCase(column_name)}" placeholder="${column_comment}" />
          <div class="input-group-append">
              <span class="input-group-text"><i class="ti-calendar"></i></span>
          </div>
          </div>
      </div>`;
  }
  if (Month === 'MONTH') {
    vHtml = `
      <div  class="${classnm} ${hiddenClass}" >
      <label for="searchVO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
       <div class="input-group">     
          <input type="date" id="searchVO.${camelCase(column_name)}" class="datepicker form-control" v-model = "searchVO.${camelCase(column_name)}" placeholder="${column_comment}" />
          <div class="input-group-append">
              <span class="input-group-text"><i class="ti-calendar"></i></span>
          </div>
          </div>
      </div>`;
  }

  if (Day === 'DAY') {
    vHtml = `
      <div  class="${classnm} ${hiddenClass}" >
       <div class="input-group">     
       <label for="searchVO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
          <input type="date" id="searchVO.${camelCase(column_name)}" class="datepicker form-control" v-model = "searchVO.${camelCase(column_name)}" placeholder="${column_comment}" />
          <div class="input-group-append">
              <span class="input-group-text"><i class="ti-calendar"></i></span>
          </div>
          </div>
      </div>`;
  }
  //console.log("######",Year, Month, Day);

  //return str + ":" + utils.dataTypeInitValue(str);
  if (right(column_comment, 2) === '여부') {
    vHtml = "";
    ck2 = "";
    ck2 = "USEATE";
    vHtml = `
              <!-- ${column_comment} -->
              <div  class="${classnm} ${hiddenClass}">
              <label for="searchVO.${camelCase(column_name)}">${notnulstr}${column_comment}</label>
                  <select class="custom-select" id="searchVO.${camelCase(column_name)}"  v-model = "searchVO.${camelCase(column_name)}">
                      <option selected value="" >${column_comment}</option>
                      <option :value="item.name" v-for="item in selectBoxitems.${ck2.toUpperCase()}">{{item.label}}</option>
                  </select>
              </div>`;

  }
  return vHtml;

}
const vueVo = function(item) {
  let column_name = camelCase(item.column_name);
  let column_comment = item.column_comment;
  let data_type = item.data_type;
  return camelCase(column_name) + ":" + this.dataTypeInitValue(data_type) + "/** " + column_comment + "*/";
}
const voHtml= function(payload, type) {
  //console.log("voHtml payload",payload);
  //let tb = payload[0];
  let SampleVoPrivate = "";
  let SampleVoPublic = "";
  for (var item in payload) {
    let row = payload[item];
    let camelCaseNm = camelCase(row.column_name);
    let camelCaseNmFirst = camelCaseNm.capitalizeFirstLetter();
    let Pri = `
/** ${row.column_comment} */
private ${this.dataTypeFnc(
      row.data_type
    )} ${camelCaseNm} = ${this.dataTypeInitValue(row.data_type)};
`;
    SampleVoPrivate += Pri;
    let Pub = `
/**
 * ${row.column_comment}
 * ${camelCaseNm} attribute를 리턴한다.
 * @return the ${camelCaseNm}
 */
public ${this.dataTypeFnc(row.data_type)} get${camelCaseNmFirst}() {
  return ${camelCaseNm};
} 
/**
 * ${row.column_comment}
 * ${camelCaseNm} attribute 값을 설정한다.
 * @param ${camelCaseNm}
 *            the ${camelCaseNm} to set
 */
public void set${camelCaseNmFirst}(${this.dataTypeFnc(row.data_type)} ${camelCaseNm}) {
  this.${camelCaseNm} = ${camelCaseNm};
}
`;
    SampleVoPublic += Pub;
  }
  let vHtml = "";
  if (type === "public") {
    vHtml = SampleVoPrivate;
  }
  else if (type === "private") {
    vHtml = SampleVoPublic;
  } else {
    vHtml = SampleVoPrivate + "\n\t" + SampleVoPublic;
  }
  return vHtml;
}
module.exports = {
  camalFirst: capitalizeFirstLetter,
  dataTypeListHtml: dataTypeListHtml,
  dataTypeListHeaderHtml: dataTypeListHeaderHtml,
  dataType: dataType,
  dataTypeInitValue: dataTypeInitValue,
  dataTypeJavascript: dataTypeJavascript,
  dataTypeTs: dataTypeTs,
  dataTypeFnc: dataTypeFnc,
  dataTypeinitTuTb: dataTypeinitTuTb,
  dataTypeHtml: dataTypeHtml,
  dataTypeUpdateHtml: dataTypeUpdateHtml,
  dataTypeDetailHtml: dataTypeDetailHtml,
  JavaFleWrite: JavaFleWrite,
  vueVo: vueVo,
  voHtml: voHtml,
  vueComment: vueComment,
  vueCommentBody: vueCommentBody,
  vueInsertBox: vueInsertBox,
  vueSearchBox: vueSearchBox
};

