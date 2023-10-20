// import 'dotenv/config';
// import { app } from './src/app';
// import { NextFunction, Request, Response } from 'express';
// import { Server } from 'socket.io';
// // const {createServer} = require("http");s
// const PORT: number = parseInt(process.env.SERVER_PORT as string, 10) || 5001;
//
// // app.listen(PORT, () => {
// //   console.log(`✅ 정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
// // });
//
// const server = app.listen(PORT, () => {
//   console.log(`✅ 정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
// });
// // const io = new Server(app, { // 'Server' 클래스의 인스턴스를 생성하고 'app'을 사용하여 연결
// //   cors: {
// //     origin: `http://localhost:${PORT}`
// //   }
// // });
//
// app.io.attach(server);
//





import 'dotenv/config';
import express, { Express, NextFunction, Request, Response } from 'express';
import http from 'http'; // HTTP 서버를 만들기 위해 필요합니다.
import { Server } from 'socket.io';

const app: Express = express();
const PORT: number = parseInt(process.env.SERVER_PORT as string, 10) || 5001;

const httpServer = http.createServer(app); // Express 애플리케이션을 기반으로 HTTP 서버를 생성합니다.
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:3000`
  }
});


// 이 시점에서 'io'를 사용하여 Socket.io 서버 설정 및 이벤트 핸들링을 수행합니다.

httpServer.listen(PORT, () => {
  console.log(`✅ Express 및 Socket.io 서버를 시작하였습니다. http://localhost:${PORT}`);
});


// import 'dotenv/config';
// import { app } from './src/app';
// import { NextFunction, Request, Response } from 'express';
// import { Server as SocketIOServer } from 'socket.io';
// import http from 'http';
//
// const PORT: number = parseInt(process.env.SERVER_PORT as string, 10) || 5001;
//
// const server = http.createServer(app);
//
// const io = new SocketIOServer(server, {
//   path: '/chat',
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });
//
// app.io = io;
//
// server.listen(PORT, () => {
//   console.log(`✅ 정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
// });

