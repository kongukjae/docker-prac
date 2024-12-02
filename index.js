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
