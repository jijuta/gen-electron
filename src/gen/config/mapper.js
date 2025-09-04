const config = require("../config/config.js");
let rOracle = `
 SELECT A1.TABLE_COMMENTS TABLE_COMMENTS
 , A1.TABLE_NAME TABLE_NAME
 , A1.COLUMN_COMMENTS COLUMN_COMMENTS
 , A1.COLUMN_NAME COLUMN_NAME
 , (CASE
       WHEN B1.CONSTRAINT_TYPE = 'P'
          THEN 'Y'
    END) PK_FLAG
 , (CASE
       WHEN B1.CONSTRAINT_TYPE = 'R'
          THEN 'Y'
    END) FK_FLAG
 , A1.NULL_FLAG
 , A1.DATA_TYPE
 , TO_NUMBER(REGEXP_REPLACE(A1.DATA_LENGTH,'[^0-9]')) as DATA_LENGTH
FROM (SELECT B.COMMENTS TABLE_COMMENTS
         , A.TABLE_NAME TABLE_NAME
         , C.COMMENTS COLUMN_COMMENTS
         , A.COLUMN_NAME COLUMN_NAME
         , (CASE A.NULLABLE
               WHEN 'Y'
                  THEN 'Y'
            END) NULL_FLAG
         , A.DATA_TYPE DATA_TYPE
         , (CASE
               WHEN A.DATA_TYPE IN ('CHAR', 'VARCHAR2')
                  THEN '(' || A.DATA_LENGTH || ')'
               WHEN A.DATA_TYPE = 'NUMBER'
               AND A.DATA_SCALE = 0
               AND A.DATA_PRECISION IS NOT NULL
                  THEN '(' || A.DATA_PRECISION || ')'
               WHEN A.DATA_TYPE = 'NUMBER'
               AND A.DATA_SCALE <> 0
                  THEN '(' || A.DATA_PRECISION || ',' || A.DATA_SCALE
                       || ')'
            END
           ) DATA_LENGTH

         , A.COLUMN_ID
      FROM USER_TAB_COLUMNS A
         , USER_TAB_COMMENTS B
         , USER_COL_COMMENTS C
     WHERE (A.TABLE_NAME = B.TABLE_NAME)
       AND (    A.TABLE_NAME = C.TABLE_NAME
            AND A.COLUMN_NAME = C.COLUMN_NAME
           )) A1
 , (SELECT A.TABLE_NAME
         , A.COLUMN_NAME
         , B.CONSTRAINT_TYPE
      FROM USER_CONS_COLUMNS A
         , USER_CONSTRAINTS B
     WHERE (A.CONSTRAINT_NAME = B.CONSTRAINT_NAME)
       AND B.CONSTRAINT_TYPE IN ('P')) B1
WHERE (    A1.TABLE_NAME = B1.TABLE_NAME(+)
    AND A1.COLUMN_NAME = B1.COLUMN_NAME(+))
`;

let rPgsql = "";
function getTableinfoOracle(commend, tablename) {
   let sqlQuery = "";

   if (config.db_type === 'mysql') {
      sqlQuery = rMysql;
   } else if (config.db_type === 'oracle') {
      sqlQuery = rOracle;
   } else if (config.db_type === 'pgsql') {
      sqlQuery = rPgsql;
   }

   if (commend === "table_all") {
      sqlQuery += ` ORDER BY A1.TABLE_NAME, A1.COLUMN_ID `;
   } else if (commend === "table") {
      if (tablename) {
         sqlQuery += ` AND A1.TABLE_NAME = '${tablename}' ORDER BY A1.TABLE_NAME, A1.COLUMN_ID`;
      } else {
         console.log("테이블 명을 입력 하세요");
         sqlQuery = ""
      }
   } else {
      sqlQuery = ""
   }

   return new Promise((resolve, error) => {
      resolve(sqlQuery)
   })
}
let rMysql = `
SELECT
T1.TABLE_NAME AS TABLE_COMMENTS,
T1.TABLE_NAME, 
COLUMN_NAME AS COLUMN_COMMENT, 
COLUMN_NAME,
IS_NULLABLE,
IF(IS_NULLABLE='YES','Y',NULL) AS NULL_FLAG,
COLUMN_KEY,
IF(COLUMN_KEY='PRI','Y',NULL) AS PK_FLAG,
'' AS FK_FLAGE,
 DATA_TYPE, 
 REPLACE(REPLACE(REPLACE(COLUMN_TYPE,DATA_TYPE,''),'(',''),')','') AS DATA_LENGTH,   
 COLUMN_DEFAULT, 
 EXTRA
FROM
   (SELECT
       TABLE_NAME, TABLE_COMMENT
    FROM
       INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='FOODATARAK') T1,
   (SELECT
       TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, COLUMN_KEY, IS_NULLABLE, COLUMN_DEFAULT, EXTRA, COLUMN_COMMENT, ORDINAL_POSITION
    FROM
       INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='FOODATARAK') T2
WHERE
    T1.TABLE_NAME = T2.TABLE_NAME 
`;
function getTableinfo(commend, tablename) {
   let sqlQuery = "";

   if (config.db_type === 'mysql') {
      sqlQuery = rMysql;
      if (commend === "table_all") {
         sqlQuery += ` ORDER BY T1.TABLE_NAME, ORDINAL_POSITION `;
      } else if (commend === "table") {
         if (tablename) {
            sqlQuery += ` AND T1.TABLE_NAME = '${tablename}' ORDER BY T1.TABLE_NAME, ORDINAL_POSITION`;
         } else {
            console.log("테이블 명을 입력 하세요");
            sqlQuery = ""
         }
      } else {
         sqlQuery = ""
      }
   } else if (config.db_type === 'oracle') {
      sqlQuery = rOracle;
      if (commend === "table_all") {
         sqlQuery += ` ORDER BY A1.TABLE_NAME, A1.COLUMN_ID `;
      } else if (commend === "table") {
         if (tablename) {
            sqlQuery += ` AND A1.TABLE_NAME = '${tablename}' ORDER BY A1.TABLE_NAME, A1.COLUMN_ID`;
         } else {
            console.log("테이블 명을 입력 하세요");
            sqlQuery = ""
         }
      } else {
         sqlQuery = ""
      }
   } else if (config.db_type === 'pgsql') {
      sqlQuery = rPgsql;
   }





   return new Promise((resolve, error) => {
      resolve(sqlQuery)
   })
}

function getTable(tablename) {
   //let r = tablename ? " where table_name = '" + tablename +"'" : "";
   let r = "";
   return new Promise((resolve, error) => {
      resolve("SELECT * FROM all_all_tables " + r);
   })
}


module.exports = {
   getTableinfo: getTableinfo,
   getTable: getTable
};