# 인증 서버 사용 가이드

## 🚀 서버 실행

### 1. 의존성 설치 (최초 1회)
```bash
npm install express cors nodemon
```

### 2. 서버 시작
```bash
# 방법 1: 직접 실행
node server.js

# 방법 2: 스크립트 사용
./start-server.sh

# 방법 3: nodemon으로 개발모드 실행
npx nodemon server.js
```

## 🔐 로그인 정보

**테스트 계정:**
- 이메일: `dokjin@gmail.com`
- 비밀번호: `dlsvmfk0033`

## 📡 API 엔드포인트

### POST `/v1/login`
로그인 인증

**요청:**
```json
{
  "email": "dokjin@gmail.com", 
  "password": "dlsvmfk0033"
}
```

**응답 (성공):**
```json
{
  "success": true,
  "userId": "dokjin",
  "userInfo": {
    "id": "dokjin",
    "email": "dokjin@gmail.com", 
    "name": "독진",
    "uuid": 1001
  },
  "token": "jwt_token_dokjin_1234567890",
  "loginData": {
    "id": "dokjin",
    "email": "dokjin@gmail.com",
    "authenticated": true
  },
  "message": "로그인 성공"
}
```

### GET `/health`
서버 상태 확인
```json
{
  "status": "OK",
  "message": "서버가 정상적으로 동작중입니다.",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔧 앱 설정

SaesolGen 앱의 로그인 화면에서:
1. **backendurl**: `http://localhost:8888`
2. **apiserverurl**: `https://dev.saesolsoft.com/code` (기존 유지)
3. **이메일**: `dokjin@gmail.com`
4. **비밀번호**: `dlsvmfk0033`

## 🐛 문제 해결

**서버가 시작되지 않는 경우:**
- 포트 8888이 이미 사용중인지 확인
- Node.js가 설치되어 있는지 확인
- 의존성이 설치되어 있는지 확인

**로그인이 실패하는 경우:**
- 서버가 실행중인지 확인 (http://localhost:8888/health)
- 이메일과 비밀번호를 정확히 입력했는지 확인
- 브라우저 개발자 도구에서 네트워크 에러 확인