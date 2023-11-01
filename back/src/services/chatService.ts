import { PrismaClient } from '@prisma/client';
// import {ChatResponseDTO} from '../dtos/chatDTO';
// import { plainToClass } from 'class-transformer';
// import { successApiResponseDTO } from '../utils/successResult';
// import { emptyApiResponseDTO } from '../utils/emptyResult';
const prisma = new PrismaClient();

/** @description 현재 사용자 */
export const currentUser = async (currentUserId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

// /** @description 현재 사용자 */
// export const currentUser = async (currentUserId: string) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: currentUserId,
//       },
//       select: {
//         username: true,
//         profileImage: true,
//       },
//     });
//     return user;
//   } catch (error) {
//     throw error;
//   }
// }

/** @description roomId 생성 */
export const createRoomId = async (currentUserId: string, chatPartnerId: string) => {
  try {
    const roomId = `${currentUserId}-${chatPartnerId}`;
    return roomId;
  } catch (error) {
    throw error;
  }
}


/** @description 채팅룸 생성 */
export const createChatRoom = async (roomId: string) => {
  try {
    const room = await prisma.chatRoom.create({
      data: {
        id: roomId,
      },
    })
    return room;
  } catch (error) {
    throw error;
  }
}

/** @description 모든 채팅룸 가져오기 */
export const getAllMyRoom = async (currentUserId: string) => {
  try {
    const room = await prisma.chatRoom.findMany({
      where: {
        id: currentUserId,
      },
    })
    return room;
  } catch (error) {
    throw error;
  }
}

// /** @description 모든 채팅룸 가져오기 */
// export const getAllMyRoom = async (currentUserId: string) => {
//   try {
//     const room = await prisma.chatRoom.findMany({
//       where: {
//         id: currentUserId,
//       },
//       select: {
//         snedUser: {
//           select: {
//             id: true,
//             username: true,
//             profileImage: true,
//           },
//         },
//       },
//     })
//     return room;
//   } catch (error) {
//     throw error;
//   }
// }

/** @description 채팅룸 가져오기 */
export const getMyRoom = async (roomId: string) => {
  try {
    const room = await prisma.chatRoom.findUnique({
      where: {
        id: roomId,
      },
    })
    return room;
  } catch (error) {
    throw error;
  }
}

/** @description 메세지 가져오기 */
export const getMyMessages = async (roomId: string) => {
  try {
    const message = await prisma.chatMessage.findMany({
      where: {
        roomId,
      },
    })
    return message;
  } catch (error) {
    throw error;
  }
}

/** @description 읽지 않은 메세지 */
// export const unReadMessage = async (userId, chatPartnerId) => {
//   try {
//     message = await prisma.chatMessage.findMany({
//       where: {
//         id: userId,
//         AND: {
//           sendUser: chatPartnerId,
//           isRead: false,
//         },
//         orderBy: {createdAt: 'desc'}
//       },
//     })
//   } catch (error) {
//     throw error;
//   }
// }

  /** @description 읽지 않은 메세지 */
export const unreadMessage = async (chatPartnerId: string) => {
  try {
    const message = await prisma.chatMessage.findMany({
      where: {
          sendUserId: chatPartnerId,
          isRead: false,
        },
        orderBy: {createdAt: 'desc'},
    })
    return message;
  } catch (error) {
    throw error;
  }
}

/** @description 읽음 상태 변경 */
export const changeReadStatus = async (messageId: string) => {
  try {
    const message = await prisma.chatMessage.update({
      where: {
        id: messageId,
      },
      data: {
        isRead: true,
      },
    })
    return message;
  } catch (error) {
    throw error;
  }
}

/** @description 메세지 삭제 */
export const deleteMessage = async (roomId: string) => {
  try {
    const message = await prisma.chatMessage.deleteMany({
      where: {
        roomId,
      },
    })
    return message;
  } catch (error) {
    throw error;
  }
}

/** @description 룸 삭제 */
export const deleteRoom = async (roomId: string) => {
  try {
    const room = await prisma.chatRoom.deleteMany({
      where: {
        id: roomId,
      },
    })
    return room;
  } catch (error) {
    throw error;
  }
}