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

/** @description 친구 요청 */
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

/** @description 보낸 친구 요청 목록 */
export const listRequestsSent = async (userId: string) => {
  try {
    return await prisma.friend.findMany({
      where: {
        userAId: userId,
        status: false,
    },
    select: {
        userB: {
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

/** @description 요청 취소 */
export const cancelRequest = async (userId: string, requestId: string) => {
  try {
    return await prisma.friend.deleteMany({
      where: {
        userAId: userId,
        userBId: requestId,
      },
    });
  } catch (error) {
    throw error;
  }
};

/** @description 받은 친구 요청 목록 */
export const listRequestsReceived = async (userId: string) => {
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
        userAId: requestId,
        userBId: userId,
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
        userAId: requestId,
        userBId: userId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getMyWholeFriends = async (userId: string) => {
  const friendList = await prisma.friend.findMany({
    where: {
      userAId: userId,
      status: true,
    },
  });

  return friendList;
};


// TODO 페이지네이션... 수정
/** @description 친구 목록 */
export const getMyFriends = async (userId: string, page: number, limit: number) => {
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
      orderBy: { id: 'asc' },
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
