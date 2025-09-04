//var oracledb = require("oracledb");
var dbConfig = require("./config.js");
var mysql = require('mysql');
/**
 * 쿼리 식핼 후 결과 값 리턴
 * @param {쿼리문} query 
 * @param {콜백} callback 
 */
let queryDBOracle = function (query, callback) {
  return null;
};

let queryDB = function (query, callback) {

  if (dbConfig.db_type === 'mysql') {
    var connection = mysql.createConnection({
      host: dbConfig.mhost,
      user: dbConfig.muser,
      password: dbConfig.mpassword,
      database: dbConfig.mdatabase
    });

    connection.connect();

    connection.query(query, function (error, results, fields) {
      if (error) {
        return callback(error, JSON.stringify(error))
      }
      //console.log('##############', results, fields);
      return callback(null, results)
    });
  } else if (config.db_type === 'oracle') {
    oracledb.getConnection({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
    }, function (err, connection) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      connection.execute(query, [], {
        outFormat: oracledb.OBJECT
      }, function (err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return callback(err, JSON.stringify(err))
        }
        doRelease(connection);
        return callback(null, result)
      });
    });

    function doRelease(connection) {
      connection.release(function (err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
      });
    }
  } else if (config.db_type === 'pgsql') {
    return null;
  }

};




/**
 * 조회 후 결과 리턴
 * @param {명령어} commend 
 * @param {쿼리} sqlQuery 
 * @param {콜백} callback2 
 */
let getCommend = function (commend, sqlQuery, callback2) {
  let payLoad;
  console.log("commend ::: ", commend);
  if (commend === "table") {

    queryDB(sqlQuery, function (err, callback) {
      if (err) {
        payLoad = { result: 'error', msg: '쿼리조회중 에러가 발생했습니다.', data: null };
        console.error(err);
        callback2(null)
      }
      payLoad = { result: 'success', msg: '성공적으로 조회되었습니다.', data: callback };
      //console.log("###########", payLoad);
      callback2(payLoad)
    });
  } else if (commend === "query") {
    queryDB(sqlQuery, function (err, callback) {
      if (err) {
        payLoad = { result: 'error', msg: '쿼리조회중 에러가 발생했습니다.', data: null };
        console.error(err);
        callback2(null)
      }
      payLoad = { result: 'success', msg: '성공적으로 조회되었습니다.', data: callback };
      //console.log(payLoad.result);
      callback2(payLoad)
    });
  } else {
    payLoad = { result: 'error', msg: '명령어가 없습니다.', data: null };
    callback2(null)
  }

}

/**
 * 조회 후 결과 리턴
 * @param {명령어} commend 
 * @param {쿼리문} sqlQuery 
 * @param {저장파일명 경로포함} endfilename
 * @param {저장파일명 경로포함} endfilename 
 * @param {페키지 폴더} moduleDir 
 * @param {콜백함수} callback2 
 */
let getCommend2 = function (commend, sqlQuery, endfilename, moduleDir, item, callback2, callback3 = null) {
  let payLoad;

  if (commend === "table") {
    //console.log(sqlQuery);
    queryDB(sqlQuery, function (err, callback) {
      if (err) {
        payLoad = { result: 'error', msg: '쿼리조회중 에러가 발생했습니다.', data: null };
        console.error(err);
        callback2(null, null, null, null)
      }
      payLoad = { result: 'success', msg: '성공적으로 조회되었습니다.', data: callback };
      //console.log(payLoad.result);
      callback2(payLoad, endfilename, moduleDir, item, callback3)
    });
  } else if (commend === "query") {
    queryDB(sqlQuery, function (err, callback) {
      if (err) {
        payLoad = { result: 'error', msg: '쿼리조회중 에러가 발생했습니다.', data: null };
        console.error(err);
        callback2(null, null, null, null)
      }
      payLoad = { result: 'success', msg: '성공적으로 조회되었습니다.', data: callback };
      //console.log(payLoad.result);
      callback2(payLoad, endfilename, item)
    });
  } else {
    payLoad = { result: 'error', msg: '명령어가 없습니다.', data: null };
    callback2(null, null, null, null)
  }

}

/**
 * 사용안함
 * @param {*} payLoad 
 */
let getCommendFnc = function (payLoad) {
  return new Promise((resolve, error) => {
    resolve(payLoad)
  })
}

module.exports = {
  queryDB: queryDB,
  getCommend: getCommend,
  getCommend2: getCommend2
};