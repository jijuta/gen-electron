
let dataTypeFnc = function (key2) {
    let datatypevalue = "";
    let key = key2.toUpperCase();
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
let dataTypeTs = function (key2) {
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
let dataTypeInitValue = function (key2) {
    let dataTypeInitValueMapper = "";
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
            dataTypeInitValueMapper = "''"
            break;
    }
    return dataTypeInitValueMapper;
}
let dataTypeJavascript = function (key2) {
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
let dataTypeinitTuTb = function (item, type) {
    let TU = item?item.toUpperCase():"";
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
module.exports = {
    dataTypeFnc : dataTypeFnc,
    dataTypeTs : dataTypeTs,
    dataTypeInitValue : dataTypeInitValue,
    dataTypeJavascript : dataTypeJavascript,
    dataTypeinitTuTb : dataTypeinitTuTbd
}