



# Docker CLI 환경 구축 및 테스트 서버 실행 가이드

### 1. Docker 환경 구축
```bash
# Colima 설치 (Docker Desktop 대신 사용)
brew install colima

# Colima 시작
colima start
```

### 2. Node.js 환경 구축
```bash
# Node.js 설치
brew install node

# 설치 확인
node -v

# Yarn 설치
npm install -g yarn

# 설치 확인
yarn -v
```

### 3. 프로젝트 설정
```bash
# 프로젝트 디렉토리 생성 및 이동
mkdir docker-test-server
cd docker-test-server

# 프로젝트 초기화
yarn init -y

# Express 설치
yarn add express
```

### 4. 서버 코드 작성
```javascript:index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({
        message: "Docker 테스트 서버가 정상적으로 작동중입니다.",
        timestamp: new Date().toISOString()
    });
});

const PORT = 3050;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행중입니다.`);
});
```

### 5. Dockerfile 작성
```dockerfile:Dockerfile
FROM node:22.11.0-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3050

CMD ["yarn", "start"]
```

### 6. .dockerignore 작성
```plaintext:.dockerignore
node_modules
.git
.gitignore
.env
*.log
```

### 7. Docker 이미지 빌드 및 실행
```bash
# 이미지 빌드
docker build -t test-server .

# 컨테이너 실행
docker run -p 3050:3050 test-server
```

### 8. 서버 테스트
```bash
# 새 터미널에서 실행
curl http://localhost:3050
```

### 9. Docker 종료
```bash
# 실행 중인 컨테이너 확인
docker ps

# 컨테이너 중지
docker stop [컨테이너_ID]

# Colima 중지
colima stop
```

### 10. 문제 해결 시 유용한 명령어
```bash
# 컨테이너 전체 목록 확인
docker ps -a

# 이미지 삭제
docker rmi test-server

# 강제 이미지 삭제
docker rmi -f test-server

# Colima 상태 확인
colima status
```

### 주의사항
1. 각 단계별로 오류가 없는지 확인
2. Node.js와 Yarn이 정상적으로 설치되었는지 확인
3. 포트 충돌이 없는지 확인 (3050 포트 사용 중인지 확인)
4. Docker 명령어는 Colima가 실행된 상태에서만 동작

