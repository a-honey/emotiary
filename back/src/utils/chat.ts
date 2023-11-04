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
import { prisma } from '../../prisma/prismaClient';
import { Server as SocketIoServer, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

// 웹소켓을 이용한 1:1 채팅
interface ConnectedUsers {
  socketId: string;
  roomId: string | null;
  user: any; // Replace with the actual user type
}

export const chat = (io: SocketIoServer) => {
  io.use((socket: Socket, next) => {
    const token = socket.handshake.query.token as string;

    if (!token) {
      console.error('No token provided');
      return next(new Error('No token provided'));
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      socket.data.decodedToken = decodedToken;
      next();
    } catch (error) {
      console.error('JWT verification failed:', error);
      next(new Error('Authentication error'));
    }
  });

  const connectedUsers: { [key: string]: ConnectedUsers } = {};

  io.on('connection', async (socket: Socket) => {
    const currentUserId = socket.data.decodedToken.id.toString();
    const user = await currentUser(currentUserId); // Replace with your user retrieval logic

    if (user) {
      connectedUsers[currentUserId] = {
        socketId: socket.id,
        roomId: null,
        user,
      };
    }

    socket.onAny((eventName: string, ...args: any[]) => {});

    socket.on('initialize', async (userId: string) => {
      if (user) {
        const messages = await unreadMessage(userId);
        socket.emit('messages', messages);
      }
    });

    socket.on('join', async (chatPartnerId: string) => {
      if (user) {
        const roomId = await createRoomId(currentUserId, chatPartnerId);
        const existingRoom = await getMyRoom(roomId);

        if (existingRoom) {
          connectedUsers[currentUserId].roomId = roomId;

          socket.join(roomId);
          const messages = await getMyMessages(roomId);

          for (let message of messages) {
            if (message.sendUserId !== currentUserId) {
              if (!message.isRead) {
                await changeReadStatus(message.id);
              }
            }
          }
          socket.emit('messages', messages);
        } else {
          const newRoom = await createChatRoom(roomId);
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
            socket.broadcast.to(roomId).emit('newMessage', {
              sendUserId: currentUserId,
              username: user.username,
              message,
            });

            await changeReadStatus(createdMessage.id);
          }

          if (connectedUsers[chatPartnerId].roomId === null) {
            io.to(chatPartnerSocketId).emit('message', {
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
      connectedUsers[currentUserId].roomId = null;
      socket.leave(roomId);
    });

    socket.on('delete', async (chatPartnerId: string) => {
      if (user) {
        const roomId = `${currentUserId}-${chatPartnerId}`;
        await deleteMessage(roomId);
        await deleteRoom(roomId);
      }
    });

    socket.on('messageViewed', async (messageId: string) => {
      if (user) {
        await changeReadStatus(messageId);
      }
    });

    socket.on('disconnect', () => {
      if (user) {
        delete connectedUsers[currentUserId];
      }
    });
  });
};
