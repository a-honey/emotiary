import { PrismaClient } from '@prisma/client';
//TODO prismaClient.ts에서 import해와서 사용하기
const prisma = new PrismaClient();
import { FriendResponseDTO, PaginationResponseDTO } from '../dtos/friendDTO';
import { userResponseDTO } from '../dtos/userDTO';
import { emptyApiResponseDTO } from '../utils/emptyResult';
import { successApiResponseDTO } from '../utils/successResult';
import {
  calculatePageInfoForFriend,
  userCalculatePageInfo,
} from '../utils/pageInfo';
import { plainToClass } from 'class-transformer';

export const checkFriend = async (userId: string, requestId: string) => {
  const friend = await prisma.friend.findFirst({
    where: {
      OR: [
        {
          sentUserId: userId,
          receivedUserId: requestId,
        },
        {
          sentUserId: requestId,
          receivedUserId: userId,
        },
      ],
      status: true,
    },
  });
  return friend;
};

/** @description 친구 여부 */
export const weAreFriends = async (userId: string, requestId: string) => {
  const friend = await prisma.friend.findUnique({
    where: {
      sentUserId_receivedUserId: {
        sentUserId: userId,
        receivedUserId: requestId,
      },
    },
  });
  return friend;
};

/** @description 친구 요청 */
export const createFriends = async (
  sentUserId: string,
  receivedUserId: string,
) => {
  const friend = await prisma.friend.create({
    data: {
      sentUserId: sentUserId,
      receivedUserId: receivedUserId,
    },
  });
  const friendResponseData = plainToClass(FriendResponseDTO, friend, {
    excludeExtraneousValues: true,
  });
  const response = successApiResponseDTO(friendResponseData);
  return response;
};

/** @description 보낸 친구 요청 목록 */
export const listRequestsSent = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const friend = await prisma.friend.findMany({
    skip: (page - 1) * limit,
    take: limit,
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
    orderBy: { id: 'asc' },
  });

  if (friend.length == 0) {
    const response = emptyApiResponseDTO();
    return response;
  }

  const { totalItem, totalPage } = await calculatePageInfoForFriend(limit, {
    sentUserId: userId,
  });

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  const friendResponseDataList = friend.map((friend) =>
    plainToClass(FriendResponseDTO, friend, {
      excludeExtraneousValues: true,
    }),
  );
  const response = new PaginationResponseDTO(
    200,
    friendResponseDataList,
    pageInfo,
    '성공',
  );

  return response;
};

/** @description 요청 취소 */
export const cancelRequest = async (userId: string, requestId: string) => {
  const friend = await prisma.friend.deleteMany({
    where: {
      sentUserId: userId,
      receivedUserId: requestId,
    },
  });
  const friendResponseData = plainToClass(FriendResponseDTO, friend, {
    excludeExtraneousValues: true,
  });
  const response = successApiResponseDTO(friendResponseData);
  return response;
};

/** @description 받은 친구 요청 목록 */
export const listRequestsReceived = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const friend = await prisma.friend.findMany({
    skip: (page - 1) * limit,
    take: limit,
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
    orderBy: { id: 'asc' },
  });

  if (friend.length == 0) {
    const response = emptyApiResponseDTO();
    return response;
  }

  const { totalItem, totalPage } = await calculatePageInfoForFriend(limit, {
    receivedUserId: userId,
  });

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  const friendResponseDataList = friend.map((friend) =>
    plainToClass(FriendResponseDTO, friend, {
      excludeExtraneousValues: true,
    }),
  );
  const response = new PaginationResponseDTO(
    200,
    friendResponseDataList,
    pageInfo,
    '성공',
  );
  return response;
};

/** @description 친구 수락 */
export const acceptFriend = async (userId: string, requestId: string) => {
  const friend = await prisma.friend.updateMany({
    where: {
      sentUserId: requestId,
      receivedUserId: userId,
    },
    data: {
      status: true,
    },
  });
  const friendResponseData = plainToClass(FriendResponseDTO, friend, {
    excludeExtraneousValues: true,
  });
  const response = successApiResponseDTO(friendResponseData);
  return response;
};

/** @description 친구 거절 */
export const rejectFriend = async (userId: string, requestId: string) => {
  const friend = await prisma.friend.deleteMany({
    where: {
      sentUserId: requestId,
      receivedUserId: userId,
    },
  });
  const friendResponseData = plainToClass(FriendResponseDTO, friend, {
    excludeExtraneousValues: true,
  });
  const response = successApiResponseDTO(friendResponseData);
  return response;
};

/**
 * @description 나의 모든 친구 가져오기
 * @param userId
 * @returns
 */
export const getMyWholeFriends = async (userId: string) => {
  const friendList = await prisma.friend.findMany({
    where: {
      OR: [{ sentUserId: userId }, { receivedUserId: userId }],
      status: true,
    },
  });
  return friendList;
};

/** @description 친구 목록 */
export const getMyFriends = async (
  userId: string,
  page: number,
  limit: number,
) => {
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
    skip: (page - 1) * limit,
    take: limit,
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
  });
  if (users.length == 0) {
    const response = emptyApiResponseDTO();
    return response;
  }

  const { totalItem, totalPage } = await userCalculatePageInfo(limit, {
    id: {
      in: uniqueFriendIds,
    },
  });

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  const userResponseDataList = users.map((user) =>
    plainToClass(userResponseDTO, user, { excludeExtraneousValues: true }),
  );
  const response = new PaginationResponseDTO(
    200,
    userResponseDataList,
    pageInfo,
    '성공',
  );
  return response;
};

/** @description 친구 삭제 */
export const deleteFriend = async (userId: string, friendId: string) => {
  const friend = await prisma.friend.deleteMany({
    where: {
      OR: [
        { sentUserId: userId, receivedUserId: friendId },
        { sentUserId: friendId, receivedUserId: userId },
      ],
    },
  });
  const friendResponseData = plainToClass(FriendResponseDTO, friend, {
    excludeExtraneousValues: true,
  });
  const response = successApiResponseDTO(friendResponseData);
  return response;
};
