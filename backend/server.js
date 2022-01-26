const express = require('express');
const morgan = require('morgan');
// 서버 사용 시간 자동 디버깅
const cors = require('cors');
const routes = require('./routes');
const app = express();

// HTTPS 설정
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('/home/ubuntu/Workspace/certs/privkey.pem'),
    cert: fs.readFileSync('/home/ubuntu/Workspace/certs/fullchain.pem')
};

// 아래 세팅 사용시 주의점
// 기존에 했던 DB내 데이터가 전부 날아가기때문에
// 첫 세팅시에만 사용하는것을 추천함
// force true인 경우에는 강제적으로 models에 있는 값을 읽어서 강제적으로 동기화 시켜버린다.
// 처음 DB세팅에만 사용하고 반드시 force:false로 바꾸던가 주석처리
// const sequelize = require('sequelize')
// sequelize.sync({force: true}).then(() => {
//     console.log("DB제어 성공")
// }).catch(error => {
//     console.log(error);
// })
// --  --

const PORT = 8001;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
// req.body를 미들웨어 없이 수신하고 접근했을 때 => undefined문제 해결 body-parser / 또는 multer를 사용해야하는데 9-10라인을 사용해 해결
app.use(morgan("dev"));
// cross-origin 이슈 시에 사용하는 라이브러리
app.use(cors());

// routes를 사용 => server.js에는 서버 관련된 내용만 두기 위함
app.use("/", routes);

// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
https.createServer(options, app).listen(PORT, () => console.log(`Server listening on ${PORT}`));