//기본 플러그인
const fs = require("fs");
const shell = require("shelljs");
const camelCase = require("camelcase");
//const tbl = require("./config/ctrl.js");

//사용자 플러그인 및 환경 설정
var res = require("../config/db.js");
var sqls = require("../config/mapper.js");
var config = require("../config/config.js");

let sqlQuery = "";
sqlQuery = sqls.getTableinfo;

if (config.commend === "all") {
  sqlQuery += ` ORDER BY A1.TABLE_NAME, A1.COLUMN_ID `;
} else if (config.commend === "one") {
  if (config.tablename) {
    sqlQuery += ` AND A1.TABLE_NAME = '${
      config.tablename
    }' ORDER BY A1.TABLE_NAME, A1.COLUMN_ID`;
  } else {
    console.log("테이블 명을 입력 하세요");
    retrun;
  }
}

if (config.commend === "one") {
  res.queryDB(sqlQuery, function(err, callback) {
    if (err) {
      console.error(metaData);
    }
    //console.log(rows)
    setJavaGen(callback.rows);
  });
}

if (config.commend === "commend") {
  console.log(sqls.getUserTable);
  res.queryDB("SELECT TABLE_NAME FROM USER_TABLES", function(err, callback) {
    if (err) {
      console.error(metaData);
    }
    //console.log(rows)
    items = callback.rows;
    let commendString = "";
    for (var item in items) {
      let row = items[item];
      console.log("node gjava.js one " + row.TABLE_NAME);

      commendString += `
node gjava.js one ${row.TABLE_NAME}`;
      //console.log("+++++++++++++++++++++++")
    }
    fs.writeFile("./commend.bat", commendString, function(err) {
      if (err) throw err;
      console.log("./test.json" + "Saved!");
    });
  });
}

let setJavaGen = function(items) {
  //console.log(items)
  let table_info = items[0];
  console.log("+++ table_info", table_info);

  let itemsJson = JSON.stringify(items);
  let itemsJs = `
module.exports = {
    tableInfo : '',
    ${table_info.TABLE_NAME} : ${itemsJson}
}
`;

  let ctrl = fs.readFileSync("./config/ctrl.txt");

  fs.writeFile("./data/" + table_info.TABLE_NAME + ".js", itemsJs, function(
    err
  ) {
    if (err) throw err;
    console.log("./test.json" + "Saved!");
  });

  fs.writeFile("./data/" + table_info.TABLE_NAME + ".json", itemsJson, function(
    err
  ) {
    if (err) throw err;
    console.log("./test.json" + "Saved!");
  });

  fs.writeFile(
    "./data/" + camelCase(table_info.TABLE_NAME) + ".java",
    ctrl,
    function(err) {
      if (err) throw err;
      console.log("./test.json" + "Saved!");
    }
  );

  for (var item in items) {
    let row = items[item];
    //console.log(row)
    //console.log("+++++++++++++++++++++++")
  }
};
