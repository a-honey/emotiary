import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const socketIoJwt = require('socketio-jwt');
import { Server as SocketIOServer } from 'socket.io';

export const chat = (io: SocketIOServer) => {

  io.use(
    socketIoJwt.authorize({
      secret: process.env.JWT_SECRET_KEY,
      handshake: true,
      auth_header_required: true,
    }),
  );

// 소켓 연결 & 로그인
  io.on("connection", (socket)=> {
    const userId = socket.decoded_token.id;
    console.log(`${userId} connected`);


    socket.on("join", async (chatPartnerId : string) => {
      // 채팅방
      const roomId = `${userId}-${chatPartnerId}`;

      //채팅방 입장
      socket.join(roomId);

      // roomId에 해당하는 기존 채팅 메시지가 있는 경우 검색하고 내보냄
      const messages = await prisma.chatMessage.findMany({
        where: { roomId },
      });

      socket.emit("messages", messages);
    });

    socket.on("sendMessage", async (chatPartnerId: string, message: string) => {
    // 마찬가지로 나와 상대방 ID를 기반으로 룸 ID를 만든 다음 보낼 메시지를 데이터베이스에 저장하고 상대방에게 보낸다.
    const roomId = `${userId}-${chatPartnerId}`;

    await prisma.chatMessage.create({
      data: {
        roomId,
        message,
        sendUserId: userId,
      },
    });
    // 상대방에게 브로드캐스팅
    io.to(roomId).emit("message", { sendUserId: userId, message });
  });

    // 패팅방 퇴장
    socket.on("leave", async(chatPartnerId: string) => {
      const roomId = `${userId}-${chatPartnerId}`;

      // 사용자가 방을 나가면, 해당 방과 속해있는 메시지를 데이터베이스에서 삭제한다
      await prisma.chatMessage.deleteMany({
        where: { roomId },
      });
      await prisma.chatRoom.delete({
        where: { id: roomId },
      });
      socket.leave(roomId);
    });

    socket.on("messageViewed", async (messageId) => {
    // isRead 를 true로 업데이트
      await prisma.chatMessage.update({
        where: { id: messageId },
        data: { isRead: true },
      });
    });

    socket.on("disconnect",()=> {
    console.log(`${userId}  disconnected`);
    });
  });
};
