# gen-electron
Quasar Electron Code Generator Application with Node.js Authentication Server

## 필수 요구사항
Node.js 14+ 버전이 필요합니다.
```bash
nvm use v14.19.1
```

## 의존성 설치
```bash
yarn
```

## app.js 복사 (OS별)
```bash
# Windows
yarn copy:win

# macOS
yarn copy:mac
```

## 애플리케이션 시작
```bash
# Electron 앱 시작
yarn start

# Node.js 인증 서버 시작 (포트 8888)
node server.js
```

## 빌드
```bash
yarn build
```
