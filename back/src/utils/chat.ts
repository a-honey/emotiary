import {
  currentUser,
  createRoomId,
  createChatRoom,
  getMyRoom,
  getMyMessages,
  unreadMessage,
  changeReadStatus,
  deleteMessage,
  deleteRoom
} from '../services/chatService';
import { PrismaClient } from '@prisma/client';
import { Server as HttpServer } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';
import socketIoJwt from 'socketio-jwt';

const prisma = new PrismaClient();

interface ConnectedUsers {
  socketId: string;
  roomId: string | null;
  user: any; // Replace with the actual user type
}

export const chat = (server: HttpServer) => {
  const io = new SocketIoServer(server, {
    path: '/chat',
    cors: {
      origin: 'http://localhost:3000', // Replace with your actual frontend URL
      methods: ['GET', 'POST'],
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

  io.on("connection", async (socket: Socket) => {
    const currentUserId = socket.decoded_token.id;

    const user = await currentUser(currentUserId);

    if (user) {
      connectedUsers[currentUserId] = {
        socketId: socket.id,
        roomId: null,
        user,
      };
      console.log(`[${user.username}] connected`);
    }


    socket.on('initialize', async (userId: string) => {
      if (user) {
        const messages = await unreadMessage(userId);
        socket.emit('messages', messages);
        console.log(messages, 'New messages');
      }
    });

    socket.on("join", async (chatPartnerId: string) => {
      if (user) {
        const roomId = await createRoomId(currentUserId, chatPartnerId);
        const existingRoom = await getMyRoom(roomId);

        if (existingRoom) {
          connectedUsers[currentUserId].roomId = roomId;
          console.log(connectedUsers[currentUserId].roomId, 'Currently joined room');
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

    socket.on("sendMessage", async (chatPartnerId: string, message: string) => {
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

    socket.on("leave", async (chatPartnerId: string) => {
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
  return io;
};