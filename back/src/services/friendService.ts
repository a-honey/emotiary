import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @description 친구 여부 */
export const weAreFriends = async (userId: string, requestId: string) => {
  try {
    return await prisma.friend.findUnique({
      where: {
        userAId_userBId: {
          userAId: userId,
          userBId: requestId,
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const createFriends = async (userAId: string, userBId: string) => {
  try {
    return await prisma.friend.create({
      data: {
        userAId: userAId,
        userBId: userBId,
      },
    });
  } catch (error) {
    throw error;
  }
};

// /** @description 친구 요청 */
// export const requestFriend = async (userId: string, requestId: string) => {
//     try {
//         await prisma.friend.createMany({
//             data: [
//                 {
//                     userAId: userId,
//                     userBId: requestId,
//                     // status: false,
//                 },
//                 {
//                     userAId: requestId,
//                     userBId: userId,
//                     // status: false,
//                 },
//             ],
//         });
//         return requestFriend;
//     } catch (error) {
//         throw error;
//     }
//     };

/** @description 친구 요청 목록 */
export const friendRequestList = async (userId: string) => {
  try {
    return await prisma.friend.findMany({
      where: {
        userBId: userId,
        status: false,
      },
      select: {
        userA: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

/** @description 친구 수락 */
export const acceptFriend = async (userId: string, requestId: string) => {
  try {
    return await prisma.friend.updateMany({
      where: {
        OR: [
          { userAId: requestId, userBId: userId },
          { userAId: userId, userBId: requestId },
        ],
      },
      data: {
        status: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

/** @description 친구 거절 */
export const rejectFriend = async (userId: string, requestId: string) => {
  try {
    return await prisma.friend.deleteMany({
      where: {
        OR: [
          { userAId: requestId, userBId: userId },
          { userAId: userId, userBId: requestId },
        ],
      },
    });
  } catch (error) {
    throw error;
  }
};

/** @description 친구 목록 */
// export const getMyFriends = async (userId: string, page: number, limit: number ) => {
//     try {
//         const paginationOptions =
//             page !== null && limit !== null
//                 ? { skip: (page - 1) * limit, take: limit }
//                 : {};
//         const allFrinedCount = await prisma.friend.count();
//         const totalPages = Math.ceil(allFrinedCount / limit);
//         const friends  = await prisma.friend.findMany({
//             where: {
//                 OR: [
//                     { userAId: userId, status: true, },
//                     { userBId: userId, status: true, },
//                 ],
//                 // userAId: userAId,
//                 // status: true,
//             },
//             select: {
//                 OR:[
//                     {
//                         userA: {
//                             select: {
//                                 id: true,
//                                 username: true,
//                                 profileImage: true,
//                         },
//                     },
//                     },
//                     userB: {
//                         select: {
//                             id: true,
//                             username: true,
//                             profileImage: true,
//                         },
//                         },
//                         ],
//                 // orderBy: { id: 'asc' },
//                 ...paginationOptions,
//             },
//
//         });
//         return {
//             user: friends,
//             currentPage: page,
//             totalPages: totalPages,
//         };
//     } catch (error) {
//         throw error;
//     }
// };

export const getMyWholeFriends = async (userId: string) => {
  const friendList = await prisma.friend.findMany({
    where: {
      userAId: userId,
      status: true,
    },
  });

  return friendList;
};

/** @description 친구 목록 */
export const getMyFriends = async (
  userId: string,
  page: number,
  limit: number
) => {
  try {
    const paginationOptions =
      page !== null && limit !== null
        ? { skip: (page - 1) * limit, take: limit }
        : {};
    const myFriendsA = await prisma.friend.findMany({
      where: {
        userAId: userId,
        status: true,
      },
      select: {
        userBId: true,
      },
    });

    const myFriendsB = await prisma.friend.findMany({
      where: {
        userBId: userId,
        status: true,
      },
      select: {
        userAId: true,
      },
    });

    const uniqueFriendIds: string[] = [
      ...new Set(myFriendsA.map((friend) => friend.userBId)),
      ...new Set(myFriendsB.map((friend) => friend.userAId)),
    ];
    const user = await prisma.user.findMany({
      where: {
        id: {
          in: uniqueFriendIds,
        },
      },
      select: {
        id: true,
        username: true,
      },
      // orderBy: { id: 'asc' },
      // ...paginationOptions,
    });
    const allUserCount = await prisma.user.count({
      where: { id: { in: uniqueFriendIds } },
    });
    const totalPages = Math.ceil(allUserCount / limit);
    return {
      user: user,
      currentPage: page,
      totalPages: totalPages,
    };
  } catch (error) {
    throw error;
  }
};

/** @description 친구 삭제 */
export const deleteFriend = async (userId: string, friendId: string) => {
  try {
    return await prisma.friend.deleteMany({
      where: {
        OR: [
          { userAId: userId, userBId: friendId },
          { userAId: friendId, userBId: userId },
        ],
      },
    });
  } catch (error) {
    throw error;
  }
};
