import { PrismaClient, Prisma } from '@prisma/client';
import { sendEmail } from '../utils/email';
import { generateRandomPassowrd } from '../utils/password';
import bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { userResponseDTO } from '../dtos/userDTO';
import { successApiResponseDTO } from '../utils/successResult';
import { userCalculatePageInfo } from '../utils/pageInfo';
import { PaginationResponseDTO } from '../dtos/diaryDTO';
import { prisma } from '../../prisma/prismaClient';

export const createUser = async (inputData: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const { username, password, email } = inputData;

    // 비밀번호를 해시하여 저장 (안전한 비밀번호 저장)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성 및 저장
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, email },
    });

    const UserResponseDTO = plainToClass(userResponseDTO, user, {
      excludeExtraneousValues: true,
    });

    const response = successApiResponseDTO(UserResponseDTO);
    return response;
  } catch (error) {
    throw error;
  }
};

export const myInfo = async (userId: string) => {
  try {
    // 사용자 ID를 기반으로 내 정보 조회
    const myInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profileImage: true,
      },
    });
    const UserResponseDTO = plainToClass(userResponseDTO, myInfo, {
      excludeExtraneousValues: true,
    });

    const response = successApiResponseDTO(UserResponseDTO);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (
  userId: string,
  page: number,
  limit: number,
) => {
  // 모든 사용자 정보를 데이터베이스에서 가져오기
  const allUsers = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      profileImage: true,
    },
  });

  for (const user of allUsers) {
    const areFriends = await areUsersFriends(userId, user.id);
    user.isFriend = areFriends;

    const latestDiary = await prisma.diary.findFirst({
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (latestDiary) {
      user.latestEmoji = latestDiary.emoji;
    }
  }

  const { totalItem, totalPage } = await userCalculatePageInfo(limit, {});

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  const userResponseDataList = allUsers.map((user) =>
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

export const getMyFriends = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const allUsers = await prisma.user.findMany({
    include: {
      profileImage: true,
    },
  });
  const filteredUsers = [];
  for (const user of allUsers) {
    if (user.id !== userId) {
      const areFriends = await areUsersFriends(userId, user.id);
      user.isFriend = areFriends;

      const latestDiary = await prisma.diary.findFirst({
        where: {
          authorId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (latestDiary) {
        user.latestEmoji = latestDiary.emoji;
      }

      if (areFriends) {
        // 친구인 경우만 결과에 포함
        filteredUsers.push(user);
      }
    }
  }
  const totalItem = filteredUsers.length;
  const totalPage = Math.ceil(totalItem / limit);

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  const userResponseDataList = filteredUsers.map((user) =>
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

export const getUserInfo = async (userId: string) => {
  try {
    // 사용자 ID를 기반으로 사용자 정보 조회
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profileImage: true,
      },
    });
    const response = successApiResponseDTO(userInfo);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserService = async (
  userId: string,
  inputData: Prisma.UserUpdateInput,
) => {
  try {
    if (inputData.password) {
      delete inputData.password; // 비밀번호는 여기서 업데이트하지 않음
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: inputData,
      include: {
        profileImage: {
          select: {
            url: true, // url 필드만 선택
          },
        },
      },
    });
    const response = successApiResponseDTO(updatedUser);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUserService = async (userId: string) => {
  try {
    // 해당 사용자의 Refresh Token 삭제
    await prisma.refreshToken.deleteMany({
      where: {
        userId: userId,
      },
    });

    // 사용자 삭제
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return '사용자가 삭제되었습니다.';
  } catch (error) {
    throw error;
  }
};

export const forgotUserPassword = async (email: string) => {
  try {
    // 임시 비밀번호 생성
    const tempPassword = generateRandomPassowrd();
    const saltRounds = 10;

    // 임시 비밀번호를 해시하여 저장
    const hashedPassword = await bcrypt.hash(tempPassword, saltRounds);

    // 사용자의 비밀번호를 업데이트하여 초기화
    await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword },
    });

    // 사용자에게 임시 비밀번호를 이메일로 전송
    await sendEmail(
      email,
      '비밀번호 재설정',
      `임시 비밀번호 : ${tempPassword}`,
      ``,
    );
  } catch (error) {
    throw error;
  }
};

export const resetUserPassword = async (email: string, password: string) => {
  try {
    const saltRounds = 10;

    // 새로운 비밀번호를 해시하여 저장
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 사용자의 비밀번호를 업데이트하여 재설정
    await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword },
    });
  } catch (error) {
    throw error;
  }
};

export const getUserFromDatabase = async (userId: string) => {
  try {
    // 데이터베이스에서 해당 사용자 정보 조회
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const areUsersFriends = async (userId1: string, userId2: string) => {
  try {
    const friendShip = await prisma.friend.findFirst({
      where: {
        OR: [
          {
            sentUserId: userId1,
            receivedUserId: userId2,
          },
          {
            sentUserId: userId2,
            receivedUserId: userId1,
          },
        ],
      },
    });
    if (userId1 === userId2) {
      return true;
    } else {
      if (friendShip) {
        return friendShip.status;
      } else {
        return false;
      }
    }
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (
  searchTerm: string,
  field: string,
  page: number,
  limit: number,
) => {
  if (!field || (field !== 'username' && field !== 'email')) {
    throw { error: '올바른 필드 값을 지정하세요.' };
  }

  let searchResults;

  if (field === 'username') {
    // Prisma를 사용하여 username을 포함하는 유저 검색
    searchResults = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        username: {
          contains: searchTerm,
        },
      },
      include: {
        profileImage: true,
      },
    });
  } else if (field === 'email') {
    // Prisma를 사용하여 email을 포함하는 유저 검색
    searchResults = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        email: {
          contains: searchTerm,
        },
      },
      include: {
        profileImage: true,
      },
    });
  }

  const totalItem = searchResults.length;
  const totalPage = Math.ceil(totalItem / limit);

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  const userResponseDataList = searchResults.map((user) =>
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
