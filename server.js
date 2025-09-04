const express = require('express');
const mysql = require('mysql2/promise');
const { Client } = require('pg');
// const cors = require('cors'); // CORS 모듈이 없어서 수동으로 처리
const app = express();
const PORT = 8888;

// 미들웨어 설정 - CORS 수동 처리
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());

// 하드코딩된 사용자 정보
const users = {
  'dokjin@gmail.com': {
    password: 'dlsvmfk0033',
    userId: 'dokjin',
    userInfo: {
      id: 'dokjin',
      email: 'dokjin@gmail.com',
      name: '독진',
      uuid: 1001
    }
  }
};

// 데이터베이스 연결 설정
const dbConnections = {
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'codeigniter',
    password: 'codeigniter123',
    database: 'codeigniter_db'
  },
  postgresql: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres123',
    database: 'testdb'
  }
};

// MySQL 연결 함수
async function getMySQLConnection() {
  return await mysql.createConnection(dbConnections.mysql);
}

// PostgreSQL 연결 함수
async function getPostgreSQLConnection(database = 'testdb') {
  const client = new Client({
    ...dbConnections.postgresql,
    database: database
  });
  await client.connect();
  return client;
}

// 로그인 엔드포인트
app.post('/v1/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('로그인 시도:', { email, password });
  
  // 사용자 인증
  const user = users[email];
  if (!user) {
    return res.status(401).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.'
    });
  }
  
  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: '비밀번호가 일치하지 않습니다.'
    });
  }
  
  // 로그인 성공 - 스토어에서 필요한 데이터 구조로 응답
  const loginResponse = {
    success: true,
    userId: user.userId,
    userInfo: user.userInfo,
    token: `jwt_token_${user.userId}_${Date.now()}`,
    loginData: {
      id: user.userId,
      email: user.userInfo.email,
      authenticated: true
    },
    message: '로그인 성공'
  };
  
  console.log('로그인 성공:', loginResponse);
  res.json(loginResponse);
});

// 로그인 데이터 조회 엔드포인트 (필요시)
app.get('/getLoginData', (req, res) => {
  res.json({
    id: 'dokjin',
    email: 'dokjin@gmail.com',
    authenticated: true
  });
});

// =================== CODE API 엔드포인트들 ===================

// 1. 스키마 목록 조회 (/code/schemas)
app.get('/code/schemas', async (req, res) => {
  try {
    const connection = await getMySQLConnection();
    
    // MySQL 스키마 조회
    const [mysqlSchemas] = await connection.execute(
      "SELECT 'mysql' as dbtype_name, schema_name as database_name FROM information_schema.schemata ORDER BY schema_name"
    );
    
    await connection.end();
    
    // PHP와 동일한 구조로 응답
    const result = {
      mysql: mysqlSchemas,
      pgsql: [
        { dbtype_name: 'pgsql', database_name: 'testdb' },
        { dbtype_name: 'pgsql', database_name: 'public' }
      ],
      oracle: []
    };
    
    res.json(result);
  } catch (error) {
    console.error('스키마 조회 오류:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// 2. MySQL 테이블 목록 조회 (/code/mysqltlist/{schema})
app.get('/code/mysqltlist/:schema', async (req, res) => {
  try {
    const schema = req.params.schema;
    const connection = await getMySQLConnection();
    
    const query = `
      SELECT 'mysql' as dbtype, table_schema as table_schema, 
             table_name as table_name, 
             if(table_comment='', table_name, table_comment) as table_comment
      FROM INFORMATION_SCHEMA.TABLES
      WHERE table_schema = ?
    `;
    
    const [tables] = await connection.execute(query, [schema]);
    await connection.end();
    
    res.json(tables);
  } catch (error) {
    console.error('테이블 목록 조회 오류:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 3. MySQL 테이블 정보 조회 (/code/mysqltinfo/{type}/{schema}/{tablename})
app.get('/code/mysqltinfo/:type/:schema/:tablename', async (req, res) => {
  try {
    const { schema, tablename } = req.params;
    const connection = await getMySQLConnection();
    
    const query = `
      SELECT 'mysql' as dbtype_name, ? as schemaname,
             if(T1.table_comment='', T1.TABLE_NAME, T1.table_comment) as table_comment,
             T1.TABLE_NAME as table_name,
             COLUMN_NAME AS label,
             if(column_comment='', COLUMN_NAME, column_comment) as column_comment,
             COLUMN_NAME as column_name,
             IS_NULLABLE as is_nullable,
             IF(IS_NULLABLE='YES','Y',NULL) AS null_flag,
             COLUMN_KEY as column_key,
             IF(COLUMN_KEY='PRI','Y',NULL) AS pk_flag,
             '' AS fk_flage,
             DATA_TYPE as data_type,
             REPLACE(REPLACE(REPLACE(COLUMN_TYPE,DATA_TYPE,''),'(',''),')','') AS data_length,
             COLUMN_DEFAULT as column_default,
             EXTRA as extra,
             ORDINAL_POSITION
      FROM
      (SELECT TABLE_NAME, TABLE_COMMENT
       FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA=?) T1,
      (SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, COLUMN_KEY, 
              IS_NULLABLE, COLUMN_DEFAULT, EXTRA, COLUMN_COMMENT, ORDINAL_POSITION
       FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=?) T2
      WHERE T1.TABLE_NAME = T2.TABLE_NAME 
        AND T1.TABLE_NAME = ?
      ORDER BY T1.TABLE_NAME, ORDINAL_POSITION
    `;
    
    const [columns] = await connection.execute(query, [schema, schema, schema, tablename]);
    await connection.end();
    
    res.json(columns);
  } catch (error) {
    console.error('테이블 정보 조회 오류:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 4. MySQL 데이터 조회 (/code/mysqllist/{type}/{schema}/{table})
app.get('/code/mysqllist/:type/:schema/:table', async (req, res) => {
  try {
    const { schema, table } = req.params;
    const connection = await getMySQLConnection();
    
    const query = `SELECT * FROM \`${schema}\`.\`${table}\` LIMIT 1000`;
    const [rows] = await connection.execute(query);
    await connection.end();
    
    res.json(rows);
  } catch (error) {
    console.error('데이터 조회 오류:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 5. MySQL 전체 테이블 목록과 컬럼 정보 (/code/mysqltlistall/{schema})
app.get('/code/mysqltlistall/:schema', async (req, res) => {
  try {
    const schema = req.params.schema;
    const connection = await getMySQLConnection();
    
    // 테이블 목록 조회
    const tableQuery = `
      SELECT 'mysql' as dbtype, table_schema as table_schema, 
             table_name as table_name, table_name as label,
             if(table_comment='', table_name, table_comment) as table_comment
      FROM INFORMATION_SCHEMA.TABLES
      WHERE table_schema = ?
    `;
    
    const [tables] = await connection.execute(tableQuery, [schema]);
    
    // 각 테이블의 컬럼 정보 조회
    const result = [];
    for (const table of tables) {
      const columnQuery = `
        SELECT 'mysql' as dbtype_name, ? as schemaname,
               if(T1.table_comment='', T1.TABLE_NAME, T1.table_comment) as table_comment,
               T1.TABLE_NAME as table_name,
               COLUMN_NAME AS label,
               if(column_comment='', COLUMN_NAME, column_comment) as column_comment,
               COLUMN_NAME as column_name,
               IS_NULLABLE as is_nullable,
               IF(IS_NULLABLE='YES','Y',NULL) AS null_flag,
               COLUMN_KEY as column_key,
               IF(COLUMN_KEY='PRI','Y',NULL) AS pk_flag,
               DATA_TYPE as data_type,
               REPLACE(REPLACE(REPLACE(COLUMN_TYPE,DATA_TYPE,''),'(',''),')','') AS data_length,
               COLUMN_DEFAULT as column_default,
               EXTRA as extra
        FROM
        (SELECT TABLE_NAME, TABLE_COMMENT
         FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA=?) T1,
        (SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, COLUMN_KEY, 
                IS_NULLABLE, COLUMN_DEFAULT, EXTRA, COLUMN_COMMENT, ORDINAL_POSITION
         FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=?) T2
        WHERE T1.TABLE_NAME = T2.TABLE_NAME 
          AND T1.TABLE_NAME = ?
        ORDER BY ORDINAL_POSITION
      `;
      
      const [columns] = await connection.execute(columnQuery, [schema, schema, schema, table.table_name]);
      table.children = columns;
      result.push(table);
    }
    
    await connection.end();
    res.json(result);
  } catch (error) {
    console.error('전체 테이블 목록 조회 오류:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// ================================
// PostgreSQL API 엔드포인트들
// ================================

// PGSQL 테이블 목록 조회 (/code/pgsqltlist/{database})
app.get('/code/pgsqltlist/:database', async (req, res) => {
  try {
    const database = req.params.database;
    const client = await getPostgreSQLConnection(database);
    
    const query = `
      SELECT 'pgsql' as dbtype, 
             current_database() as table_schema, 
             tablename as table_name, 
             COALESCE(description, tablename) as table_comment
      FROM pg_tables 
      WHERE schemaname = 'public'
    `;
    
    const result = await client.query(query);
    await client.end();
    
    res.json(result.rows);
  } catch (error) {
    console.error('PGSQL 테이블 목록 조회 오류:', error);
    res.status(500).json({ error: 'PostgreSQL query failed' });
  }
});

// PGSQL 테이블 정보 조회 (/code/pgsqltinfo/{type}/{database}/{tablename})
app.get('/code/pgsqltinfo/:type/:database/:tablename', async (req, res) => {
  try {
    const { database, tablename } = req.params;
    const client = await getPostgreSQLConnection(database);
    
    const query = `
      SELECT 'pgsql' as dbtype_name, 
             current_database() as schemaname,
             COALESCE(t.description, c.table_name) as table_comment,
             c.table_name,
             c.column_name as label,
             COALESCE(d.description, c.column_name) as column_comment,
             c.column_name,
             c.data_type,
             CASE 
               WHEN c.is_nullable = 'YES' THEN 'Y'
               ELSE 'N'
             END as is_nullable,
             CASE 
               WHEN tc.constraint_type = 'PRIMARY KEY' THEN 'PRI'
               WHEN tc.constraint_type = 'UNIQUE' THEN 'UNI'
               ELSE ''
             END as column_key,
             c.column_default,
             COALESCE(c.character_maximum_length, c.numeric_precision, 0) as character_maximum_length
      FROM information_schema.columns c
      LEFT JOIN information_schema.table_constraints tc 
        ON c.table_name = tc.table_name 
        AND c.table_schema = tc.table_schema
      LEFT JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
        AND c.column_name = kcu.column_name
      LEFT JOIN pg_class t ON t.relname = c.table_name
      LEFT JOIN pg_description td ON t.oid = td.objoid AND td.objsubid = 0
      LEFT JOIN pg_attribute a ON a.attrelid = t.oid AND a.attname = c.column_name
      LEFT JOIN pg_description d ON a.attrelid = d.objoid AND a.attnum = d.objsubid
      WHERE c.table_name = $1 AND c.table_schema = 'public'
      ORDER BY c.ordinal_position
    `;
    
    const result = await client.query(query, [tablename]);
    await client.end();
    
    res.json(result.rows);
  } catch (error) {
    console.error('PGSQL 테이블 정보 조회 오류:', error);
    res.status(500).json({ error: 'PostgreSQL query failed' });
  }
});

// PGSQL 데이터 조회 (/code/pgsqllist/{type}/{database}/{table})
app.get('/code/pgsqllist/:type/:database/:table', async (req, res) => {
  try {
    const { database, table } = req.params;
    const client = await getPostgreSQLConnection(database);
    
    const query = `SELECT * FROM "${table}" LIMIT 1000`;
    const result = await client.query(query);
    await client.end();
    
    res.json(result.rows);
  } catch (error) {
    console.error('PGSQL 데이터 조회 오류:', error);
    res.status(500).json({ error: 'PostgreSQL query failed' });
  }
});

// PGSQL 전체 테이블 목록과 컬럼 정보 (/code/pgsqltlistall/{database})
app.get('/code/pgsqltlistall/:database', async (req, res) => {
  try {
    const database = req.params.database;
    const client = await getPostgreSQLConnection(database);
    
    // 테이블 목록 조회
    const tableQuery = `
      SELECT 'pgsql' as dbtype, 
             current_database() as table_schema, 
             tablename as table_name, 
             tablename as label,
             COALESCE(description, tablename) as table_comment
      FROM pg_tables 
      WHERE schemaname = 'public'
    `;
    
    const tableResult = await client.query(tableQuery);
    const tables = tableResult.rows;
    
    // 각 테이블의 컬럼 정보 조회
    const result = [];
    for (const table of tables) {
      const columnQuery = `
        SELECT 'pgsql' as dbtype_name, 
               current_database() as schemaname,
               COALESCE(t.description, c.table_name) as table_comment,
               c.table_name,
               c.column_name as label,
               COALESCE(d.description, c.column_name) as column_comment,
               c.column_name,
               c.data_type,
               CASE 
                 WHEN c.is_nullable = 'YES' THEN 'Y'
                 ELSE 'N'
               END as is_nullable,
               CASE 
                 WHEN tc.constraint_type = 'PRIMARY KEY' THEN 'PRI'
                 WHEN tc.constraint_type = 'UNIQUE' THEN 'UNI'
                 ELSE ''
               END as column_key,
               c.column_default,
               COALESCE(c.character_maximum_length, c.numeric_precision, 0) as character_maximum_length
        FROM information_schema.columns c
        LEFT JOIN information_schema.table_constraints tc 
          ON c.table_name = tc.table_name 
          AND c.table_schema = tc.table_schema
        LEFT JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
          AND c.column_name = kcu.column_name
        LEFT JOIN pg_class t ON t.relname = c.table_name
        LEFT JOIN pg_description td ON t.oid = td.objoid AND td.objsubid = 0
        LEFT JOIN pg_attribute a ON a.attrelid = t.oid AND a.attname = c.column_name
        LEFT JOIN pg_description d ON a.attrelid = d.objoid AND a.attnum = d.objsubid
        WHERE c.table_name = $1 AND c.table_schema = 'public'
        ORDER BY c.ordinal_position
      `;
      
      const columnResult = await client.query(columnQuery, [table.table_name]);
      table.children = columnResult.rows;
      result.push(table);
    }
    
    await client.end();
    res.json(result);
  } catch (error) {
    console.error('PGSQL 전체 테이블 목록 조회 오류:', error);
    res.status(500).json({ error: 'PostgreSQL query failed' });
  }
});

// 서버 상태 확인
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: '서버가 정상적으로 동작중입니다.',
    timestamp: new Date().toISOString()
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 인증 서버가 포트 ${PORT}에서 실행중입니다.`);
  console.log(`테스트 URL: http://localhost:${PORT}/health`);
  console.log(`로그인 정보:`);
  console.log(`  이메일: dokjin@gmail.com`);
  console.log(`  비밀번호: dlsvmfk0033`);
});