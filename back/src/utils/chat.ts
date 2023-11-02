import {
  currentUser,
  createRoomId,
  createChatRoom,
  getMyRoom,
  getAllMyRoom,
  getMyMessages,
  unreadMessage,
  changeReadStatus,
  deleteMessage,
  deleteRoom,
} from '../services/chatService';
import { PrismaClient } from '@prisma/client';
import { Server as SocketIoServer, Socket } from 'socket.io';
//TODO prismaClient.ts에서 import해와서 사용하기
const prisma = new PrismaClient();
import * as jwt from 'jsonwebtoken';

// 웹소켓을 이용한 1:1 채팅
interface ConnectedUsers {
  socketId: string;
  roomId: string | null;
  user: any; // Replace with the actual user type
}

export const chat =  (io: SocketIoServer) => {
  console.log('test');
  io.use((socket: Socket, next) => {
    const token = socket.handshake.query.token as string;

    console.log('ws', token);
    if (!token) {
      console.error('No token provided');
      return next(new Error('No token provided'));
    }

    try {
      console.log('ㅌ');
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decodedToken);
      socket.data.decodedToken = decodedToken;
      console.log(socket.data.decodedToken.id);
      next();
    } catch (error) {
      console.error('JWT verification failed:', error);
      next(new Error('Authentication error'));
    }
  });

  const connectedUsers: { [key: string]: ConnectedUsers } = {};

  io.on('connection', async (socket: Socket) => {
    console.log('connection');
    const currentUserId = socket.data.decodedToken.id.toString();
    const user = await currentUser(currentUserId); // Replace with your user retrieval logic

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
      console.log('roomId:' , roomId);
      const existingRoom = await getMyRoom(roomId);
      console.log('existingRoom', existingRoom);
      if (existingRoom) {
        connectedUsers[currentUserId].roomId = roomId;
        console.log(connectedUsers[currentUserId].roomId, 'Currently joined room');
        socket.join(roomId);
        console.log(`${user.username} joined [${roomId}] room`);
        const messages = await getMyMessages(roomId);
        console.log(messages);
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
      console.log('시작')
      const roomId = await createRoomId(currentUserId, chatPartnerId);
      console.log(roomId);
      let room = await getMyRoom(roomId);
      console.log(roomId, 'd')
      if (!room) {
        await createChatRoom(roomId);
      }
      console.log('방아이디', roomId);

      const createdMessage = await prisma.chatMessage.create({
        data: {
          roomId,
          message,
          sendUserId: currentUserId,
        },
      });

      console.log('createMessage', createdMessage);

      if (connectedUsers[chatPartnerId]) {
        const chatPartnerSocketId = connectedUsers[chatPartnerId].socketId;

        console.log('파트너아이디', chatPartnerId);
        if (connectedUsers[chatPartnerId].roomId === roomId) {
          socket.broadcast.to(roomId).emit('newMessage', {
            sendUserId: currentUserId,
            username: user.username,
            message,
          });
          console.log(`[${chatPartnerId}] sent a message: ${message}`);

          await changeReadStatus(createdMessage.id);
        }

        if (connectedUsers[chatPartnerId].roomId === null) {
          io.to(chatPartnerSocketId).emit('message', {
            sendUserId: currentUserId,
            username: user.username,
            messageId: createdMessage.id,
          });
          console.log('새로운메시지', message);
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
  })
});
};
