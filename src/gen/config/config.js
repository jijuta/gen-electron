module.exports = {
  user: process.env.NODE_ORACLEDB_USER || "naraport",
  password: process.env.NODE_ORACLEDB_PASSWORD || "naraport",
  connectString:
    process.env.NODE_ORACLEDB_CONNECTIONSTRING ||
    "naraport5.saesolsoft.com/CYWOMEN",
  externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
  mhost: 'cast.saesolsoft.com',
  muser: 'saesol',
  mpassword: 'qwer1234!@#$',
  mdatabase: 'foodatarak',
  db_type: "mysql",
  dir_front: "../src/main/webapp/naraport",
  dir_java: "../src/main/java/egovframework/com",
  dir_Controller: "../src/main/java/egovframework/com/web",
  dir_mapper: "../src/main/resources/egovframework/mapper/com",
  dir_mapper_config: "../src/main/resources/egovframework/config",
  dir_validator: "../src/main/egovframework/com",
  dir_jsp: "../src/main/webapp/WEB-INF/jsp/egovframework/com",
  dir_titles: "../src/main/webapp/WEB-INF/jsp/egovframework/com",
  commend: process.argv[2] || "java",
  codedirTitle: process.argv[3],
  tablename: process.argv[4], // or dir
  codedir: process.argv[5],
  Sample: process.argv[6],
  PriKeyNm: process.argv[7], //기본키 필드명
  SampleSmIdx: process.argv[8], // 필드명 카멜
  ControllerDataTypeName: process.argv[9], // 기본키 대아터 타입
  DelYn: process.argv[10],
  ViewName: process.argv[10] // select view명
};
