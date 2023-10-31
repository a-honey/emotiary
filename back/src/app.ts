import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger-output.json';
import bodyParser from 'body-parser';
import userAuthRouter from './routes/userRouter';
import passport from 'passport';
import diaryRouter from './routes/diaryRouter';
import favoriteRouter from './routes/favoriteRouter';
import friendRouter from './routes/friendRouter';
import commentRouter from './routes/commentRouter';
import { jwtStrategy, localStrategy, googleStrategy } from './config/passport';
import { Logger } from './config/logger';
import testAuthRouter from './routes/testRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { sendAlarm } from './utils/alarm';
import http from 'http';
// import { chat } from './utils/chat';
import { Server as SocketIoServer, Socket } from 'socket.io';
import {
  currentUser,
  createRoomId,
  createChatRoom,
  getMyRoom,
  getMyMessages,
  unreadMessage,
  changeReadStatus,
  deleteMessage,
  deleteRoom,
} from './services/chatService';
import { PrismaClient } from '@prisma/client';
import * as socketIoJwt from 'socketio-jwt';
const prisma = new PrismaClient();
import path = require('path');
// import axios, { AxiosResponse } from "axios";

// const app: Express & { io?: SocketIoServer } = express();
// const app: Express = express();
const app: Express & { io?: any } = express();
const server = http.createServer(app);
// export const io = chat(server);
app.use(cors());
app.use(bodyParser.json());
app.use(Logger);
sendAlarm();

app.use(passport.initialize());

const localStrategyInstance = localStrategy;
const jwtStrategyInstance = jwtStrategy;
const googleStrategyInstance = googleStrategy;

passport.use('local', localStrategyInstance);
passport.use('jwt', jwtStrategyInstance);
passport.use('google', googleStrategyInstance);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('기본 페이지');
});

//TODO node 부하테스트

const apiRouter = express.Router();
const router = express.Router();

apiRouter.use('/users', userAuthRouter);
apiRouter.use('/test', testAuthRouter);
apiRouter.use('/friend', friendRouter);
apiRouter.use('/diary', diaryRouter);
apiRouter.use('/favorites', favoriteRouter);
apiRouter.use('/comments', commentRouter);

app.use('/api', apiRouter);

// // 정적 파일 제공을 위한 미들웨어 설정
// app.use(express.static("public"));
app.use('/api/fileUpload', express.static('fileUpload'));
app.use(errorMiddleware);

// 웹소켓을 이용한 1:1 채팅
interface ConnectedUsers {
  socketId: string;
  roomId: string | null;
  user: any; // Replace with the actual user type
}

const io = new SocketIoServer(server, {
  path: '/chat',
  cors: {
    origin: 'http://localhost:3000', // Replace with your actual frontend URL
    methods: ['GET', 'POST', 'WEBSOCKET'],
  },
});

io.use(
  socketIoJwt.authorize({
    secret: process.env.JWT_SECRET_KEY,
    handshake: true,
    auth_header_required: true,
  }),
);

const connectedUsers: { [key: string]: ConnectedUsers } = {};

io.on('connection', async (socket: Socket) => {
  const currentUserId = (socket as any).decoded_token.id;

  const user = await currentUser(currentUserId);
  if (user) {
    connectedUsers[currentUserId] = {
      socketId: socket.id,
      roomId: null,
      user,
    };
    console.log(`[${user.username}] connected`);
  }

  socket.onAny((eventName: string, ...args: any[]) => {
    console.log(`이벤트 발생: ${eventName}, 데이터: ${args}`);
  });

  socket.on('initialize', async (userId: string) => {
    if (user) {
      const messages = await unreadMessage(userId);
      socket.emit('messages', messages);
      console.log(messages, 'New messages');
    }
  });

  socket.on('join', async (chatPartnerId: string) => {
    if (user) {
      const roomId = await createRoomId(currentUserId, chatPartnerId);
      const existingRoom = await getMyRoom(roomId);

      if (existingRoom) {
        connectedUsers[currentUserId].roomId = roomId;
        console.log(
          connectedUsers[currentUserId].roomId,
          'Currently joined room',
        );
        socket.join(roomId);
        console.log(`${user.username} joined [${roomId}] room`);
        const messages = await getMyMessages(roomId);

        for (let message of messages) {
          if (message.sendUserId !== currentUserId) {
            if (!message.isRead) {
              await changeReadStatus(message.id);
            }
          }
        }
        socket.emit('messages', messages);
        console.log(`${user.username}'s chat history loaded`);
      } else {
        const newRoom = await createChatRoom(roomId);
        console.log(`Room [${newRoom}] created`);
        connectedUsers[currentUserId].roomId = roomId;
        socket.join(newRoom.id);
      }
    }
  });

  socket.on('sendMessage', async (chatPartnerId: string, message: string) => {
    if (user) {
      const roomId = await createRoomId(currentUserId, chatPartnerId);
      let room = await getMyRoom(roomId);

      if (!room) {
        await createChatRoom(roomId);
      }

      const createdMessage = await prisma.chatMessage.create({
        data: {
          roomId,
          message,
          sendUserId: currentUserId,
        },
      });

      if (connectedUsers[chatPartnerId]) {
        const chatPartnerSocketId = connectedUsers[chatPartnerId].socketId;

        if (connectedUsers[chatPartnerId].roomId === roomId) {
          socket.to(roomId).emit('message', {
            sendUserId: currentUserId,
            username: user.username,
            message,
          });
          console.log(`[${chatPartnerId}] sent a message: ${message}`);

          await changeReadStatus(createdMessage.id);
        }

        if (connectedUsers[chatPartnerId].roomId === null) {
          io.to(chatPartnerSocketId).emit('newMessage', {
            sendUserId: currentUserId,
            username: user.username,
            messageId: createdMessage.id,
          });
        }
      }
    }
  });

  socket.on('leave', async (chatPartnerId: string) => {
    const roomId = await createRoomId(currentUserId, chatPartnerId);
    console.log(`[${roomId}] Leaving the room`);
    connectedUsers[currentUserId].roomId = null;
    socket.leave(roomId);
  });

  socket.on('delete', async (chatPartnerId: string) => {
    if (user) {
      const roomId = `${currentUserId}-${chatPartnerId}`;
      await deleteMessage(roomId);
      await deleteRoom(roomId);
      console.log(`Room [${roomId}] deleted`);
    }
  });

  socket.on('messageViewed', async (messageId: string) => {
    if (user) {
      await changeReadStatus(messageId);
    }
  });

  socket.on('disconnect', () => {
    if (user) {
      console.log(`User ${currentUserId} disconnected`);
      delete connectedUsers[currentUserId];
    }
  });
});

app.io = io;
export { app };
