import {
  currentUser,
  createRoomId,
  createChatRoom,
  getMyRoom,
  getMyMessages,
  unreadMessage,
  changeReadStatus,
  deleteMessage,s
  deleteRoom
} from '../services/chatService';
import { PrismaClient } from '@prisma/client';
import { Server as HttpServer } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';

// import * as socketIoJwt from 'socketio-jwt';
// const prisma = new PrismaClient();
// const path = require('path');

// interface ConnectedUsers {
//   socketId: string;
//   roomId: string | null;
//   user: any; // Replace with the actual user type
// }

// export const chat = (server: HttpServer) => {
//   const io = new SocketIoServer(server, {
//     path: '/chat',
//     cors: {
//       origin: 'http://localhost:3000', // Replace with your actual frontend URL
//       methods: ['GET', 'POST',  'WEBSOCKET'],

//     },

//   });

//   console.log('hi')
//   io.use(
//     socketIoJwt.authorize({
//       secret: process.env.JWT_SECRET_KEY,
//       handshake: true,
//       auth_header_required: true,
//     }),
//   );

//   const connectedUsers: { [key: string]: ConnectedUsers } = {};

//   io.on("connection", async (socket: Socket) => {
//     socket.emit('hello', '안녕!')
//     const currentUserId = (socket as any).decoded_token.id;

//     const user = await currentUser(currentUserId);
//     if (user) {
//       connectedUsers[currentUserId] = {
//         socketId: socket.id,
//         roomId: null,
//         user,
//       };
//       console.log(`[${user.username}] connected`);
//     }


//     socket.on('initialize', async (userId: string) => {
//       if (user) {
//         const messages = await unreadMessage(userId);
//         socket.emit('messages', messages);
//         console.log(messages, 'New messages');
//       }
//     });

//     socket.on("join", async (chatPartnerId: string) => {
//       if (user) {
//         const roomId = await createRoomId(currentUserId, chatPartnerId);
//         const existingRoom = await getMyRoom(roomId);

//         if (existingRoom) {
//           connectedUsers[currentUserId].roomId = roomId;
//           console.log(connectedUsers[currentUserId].roomId, 'Currently joined room');
//           socket.join(roomId);
//           console.log(`${user.username} joined [${roomId}] room`);
//           const messages = await getMyMessages(roomId);

//           for (let message of messages) {
//             if (message.sendUserId !== currentUserId) {
//               if (!message.isRead) {
//                 await changeReadStatus(message.id);
//               }
//             }
//           }
//           socket.emit('messages', messages);
//           console.log(`${user.username}'s chat history loaded`);
//         } else {
//           const newRoom = await createChatRoom(roomId);
//           console.log(`Room [${newRoom}] created`);
//           connectedUsers[currentUserId].roomId = roomId;
//           socket.join(newRoom.id);
//         }
//       }
//     });

//     socket.on("sendMessage", async (chatPartnerId: string, message: string) => {
//       if (user) {
//         const roomId = await createRoomId(currentUserId, chatPartnerId);
//         let room = await getMyRoom(roomId);

//         if (!room) {
//           await createChatRoom(roomId);
//         }

//         const createdMessage = await prisma.chatMessage.create({
//           data: {
//             roomId,
//             message,
//             sendUserId: currentUserId,
//           },
//         });

//         if (connectedUsers[chatPartnerId]) {
//           const chatPartnerSocketId = connectedUsers[chatPartnerId].socketId;

//           if (connectedUsers[chatPartnerId].roomId === roomId) {
//             socket.to(roomId).emit('message', {
//               sendUserId: currentUserId,
//               username: user.username,
//               message,
//             });
//             console.log(`[${chatPartnerId}] sent a message: ${message}`);

//             await changeReadStatus(createdMessage.id);
//           }

//           if (connectedUsers[chatPartnerId].roomId === null) {
//             io.to(chatPartnerSocketId).emit('newMessage', {
//               sendUserId: currentUserId,
//               username: user.username,
//               messageId: createdMessage.id,
//             });
//           }
//         }
//       }
//     });

//     socket.on("leave", async (chatPartnerId: string) => {
//       const roomId = await createRoomId(currentUserId, chatPartnerId);
//       console.log(`[${roomId}] Leaving the room`);
//       connectedUsers[currentUserId].roomId = null;
//       socket.leave(roomId);
//     });

//     socket.on('delete', async (chatPartnerId: string) => {
//       if (user) {
//         const roomId = `${currentUserId}-${chatPartnerId}`;
//         await deleteMessage(roomId);
//         await deleteRoom(roomId);
//         console.log(`Room [${roomId}] deleted`);
//       }
//     });

//     socket.on('messageViewed', async (messageId: string) => {
//       if (user) {
//         await changeReadStatus(messageId);
//       }
//     });

//     socket.on('disconnect', () => {
//       if (user) {
//         console.log(`User ${currentUserId} disconnected`);
//         delete connectedUsers[currentUserId];
//       }
//     });
//   });
//   return io;
// };



// 웹소켓을 이용한 1:1 채팅
interface ConnectedUsers {
  socketId: string;
  roomId: string | null;
  user: any; // Replace with the actual user type
}


  // io.use(
  //   socketIoJwt.authorize({
  //     secret: process.env.JWT_SECRET_KEY,
  //     handshake: true,
  //     auth_header_required: true,
  //   }),
  // );

  // io.use((socket: Socket, next) => {
  //   const token = socket.handshake.auth.token as string;
  
  //   if (!token) {
  //     console.error('No token provided');
  //     return next(new Error('Authentication error'));
  //   }
  
  //   try {
  //     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  //     socket.data.decodedToken = decodedToken;
  //     next();
  //   } catch (err) {
  //     console.error('JWT verification failed:', err);
  //     next(new Error('Authentication error'));
  //   }
  // });
//   const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//   io.use((socket: Socket, next) => {
//     const token = socket.handshake.auth.token as string;
  
//     if (!token) {
//       console.error('No token provided');
//       return next(new Error('No token provided'));
//     }
  
//     try {
//       const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
//       socket.data.decodedToken = decodedToken;
//       next();
//     } catch (error) {
//       console.error('JWT verification failed:', error);
//       next(new Error('Authentication error'));
//     }
//   });

//   const connectedUsers: { [key: string]: ConnectedUsers } = {};

// // io.on('connection', async (socket: Socket) => {
// //   // const currentUserId = (socket as any).decoded_token.id;
// //   // const decodedToken = socket.data.decodedToken;
// //   // const currentUserId = (socket as any).decodedToken.id;
// //   const currentUserId = socket.decoded;
// io.on('connection', async (socket: Socket) => {
//   const currentUserId = (socket.data.decodedToken).id;

//   const user = await currentUser(currentUserId);
//   if (user) {
//     connectedUsers[currentUserId] = {
//       socketId: socket.id,
//       roomId: null,
//       user,
//     };
//     console.log(`[${user.username}] connected`);
//   }


//TODO 토큰없음! 
export const chat =  
io.use((socket: Socket, next) => {
  const token = socket.handshake.query.token as string;

  console.log(token);
  if (!token) {
    console.error('No token provided');
    return next(new Error('No token provided'));
  }

  try {
    console.log('ㅌ')
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken)
    socket.data.decodedToken = decodedToken;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    next(new Error('Authentication error'));
  }
});

const connectedUsers: { [key: string]: ConnectedUsers } = {};

io.on('connection', async (socket: Socket) => {
  // const currentUserId = (socket.data.decodedToken as any).id;
  const currentUserId = socket.data.decoded;

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
  });
};