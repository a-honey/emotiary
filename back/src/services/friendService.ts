import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


/** @description 친구 여부 */
export const weAreFriends = async (userId: string, requestId: string) => {
  try {
    const friend = await prisma.friend.findUnique({
      where: {
        sentUserId_receivedUserId: {
          sentUserId: userId,
          receivedUserId: requestId,
        },
      },
    });
    return friend;
  } catch (error) {
    throw error;
  }
};

/** @description 친구 요청 */
export const createFriends = async (sentUserId: string, receivedUserId: string) => {
  try {
    const createdFriend = await prisma.friend.create({
      data: {
        sentUserId: sentUserId,
        receivedUserId: receivedUserId,
      },
    });
    return createdFriend;
  } catch (error) {
    throw error;
  }
};

/** @description 보낸 친구 요청 목록 */
export const listRequestsSent = async (userId: string) => {
  try {
    const requestsSent = await prisma.friend.findMany({
      where: {
        sentUserId: userId,
        status: false,
      },
      select: {
        receivedUser: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });
    return requestsSent;
  } catch (error) {
    throw error;
  }
};

/** @description 요청 취소 */
export const cancelRequest = async (userId: string, requestId: string) => {
  try {
    const deletedRequests = await prisma.friend.deleteMany({
      where: {
        sentUserId: userId,
        receivedUserId: requestId,
      },
    });
    return deletedRequests;
  } catch (error) {
    throw error;
  }
};

/** @description 받은 친구 요청 목록 */
export const listRequestsReceived = async (userId: string) => {
  try {
    const requestsReceived = await prisma.friend.findMany({
      where: {
        receivedUserId: userId,
        status: false,
      },
      select: {
        sentUser: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });
    return requestsReceived;
  } catch (error) {
    throw error;
  }
};

/** @description 친구 수락 */
export const acceptFriend = async (userId: string, requestId: string) => {
  try {
    const updatedFriends = await prisma.friend.updateMany({
      where: {
        sentUserId: requestId,
        receivedUserId: userId,
      },
      data: {
        status: true,
      },
    });
    return updatedFriends;
  } catch (error) {
    throw error;
  }
};

/** @description 친구 거절 */
export const rejectFriend = async (userId: string, requestId: string) => {
  try {
    const deletedFriends = await prisma.friend.deleteMany({
      where: {
        sentUserId: requestId,
        receivedUserId: userId,
      },
    });
    return deletedFriends;
  } catch (error) {
    throw error;
  }
};

export const getMyWholeFriends = async (userId: string) => {
  const friendList = await prisma.friend.findMany({
    where: {
      sentUserId: userId,
      status: true,
    },
  });

  return friendList;
};


// TODO 페이지네이션... 수정
/** @description 친구 목록 */
export const getMyFriends = async (userId: string, page: number, limit: number) => {
  try {
    const paginationOptions = page !== null && limit !== null ? { skip: (page - 1) * limit, take: limit } : {};

    const myFriendsSent = await prisma.friend.findMany({
      where: {
        sentUserId: userId,
        status: true,
      },
      select: {
        receivedUserId: true,
      },
    });

    const myFriendsReceived = await prisma.friend.findMany({
      where: {
        receivedUserId: userId,
        status: true,
      },
      select: {
        sentUserId: true,
      },
    });

    const uniqueFriendIds: string[] = [
      ...new Set(myFriendsSent.map((friend) => friend.receivedUserId)),
      ...new Set(myFriendsReceived.map((friend) => friend.sentUserId)),
    ];

    const users = await prisma.user.findMany({
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
      user: users,
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
    const deletedFriends = await prisma.friend.deleteMany({
      where: {
        OR: [
          { sentUserId: userId, receivedUserId: friendId },
          { sentUserId: friendId, receivedUserId: userId },
        ],
      },
    });
    return deletedFriends;
  } catch (error) {
    throw error;
  }
};