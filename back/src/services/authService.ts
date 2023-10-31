import { PrismaClient, Prisma } from '@prisma/client';
import { sendEmail } from '../utils/email';
import { generateRandomPassowrd } from '../utils/password';
import bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { userResponseDTO } from '../dtos/userDTO';
import { successApiResponseDTO } from '../utils/successResult';
import { userCalculatePageInfo } from '../utils/pageInfo';
import { PaginationResponseDTO } from '../dtos/diaryDTO';
import { usersList } from '../utils/userList';

const prisma = new PrismaClient();

export const createUser = async (inputData: {
  username: string;
  password: string;
  email: string;
}) => {
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
};

export const myInfo = async (userId: string) => {
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
};

export const getAllUsers = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const pageSize = 10;

  const userList = await prisma.user.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      friendS: {
        where: { status: true },
      },
      friendR: {
        where: { status: true },
      },
      Diary: {
        where: {
          authorId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });

  userList.forEach((user) => {
    user.isFriend = user.friendS.length > 0 || user.friendR.length > 0;

    if (user.Diary.length > 0) {
      user.latestEmoji = user.Diary[0].emoji;
    } else {
      user.latestEmoji = '❎';
    }
  });

  const { totalItem, totalPage } = await userCalculatePageInfo(limit, {});

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  const userResponseDataList = userList.map((user) =>
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
  const pageSize = 10;

  const userList = await prisma.user.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      friendS: {
        where: {
          status: true,
        },
      },
      friendR: {
        where: {
          status: true,
        },
      },
      Diary: {
        where: {
          authorId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });

  const filteredUsers = userList.filter((user) => {
    const areFriends = user.friendS.length > 0 || user.friendR.length > 0;

    if (user.id !== userId && areFriends) {
      // 자기 자신이 아니면서 친구인 경우만 결과에 포함
      return true;
    }

    return false;
  });

  filteredUsers.forEach((user) => {
    user.isFriend = user.friendS.length > 0 || user.friendR.length > 0;

    if (user.Diary.length > 0) {
      user.latestEmoji = user.Diary[0].emoji;
    } else {
      user.latestEmoji = '❎';
    }
  });
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
};

export const updateUserService = async (
  userId: string,
  inputData: Prisma.UserUpdateInput,
) => {
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
};

export const deleteUserService = async (userId: string) => {
  // 사용자의 refreshTokens 먼저 삭제
  await prisma.refreshToken.deleteMany({
    where: {
      userId: userId,
    },
  });

  // 사용자의 친구 관계 삭제
  await prisma.friend.deleteMany({
    where : {
      OR: [{ sentUserId: userId }, { receivedUserId: userId }],
    }
  });

  // 사용자의 다이어리 삭제
  await prisma.diary.deleteMany({
    where: {
      authorId: userId,
    },
  });

  // 사용자 삭제
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return '사용자가 삭제되었습니다.';
};

export const forgotUserPassword = async (email: string) => {
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
};

export const resetUserPassword = async (email: string, password: string) => {
  const saltRounds = 10;

  // 새로운 비밀번호를 해시하여 저장
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 사용자의 비밀번호를 업데이트하여 재설정
  await prisma.user.update({
    where: { email: email },
    data: { password: hashedPassword },
  });
};

export const getUserFromDatabase = async (userId: string) => {
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

  let where = {};
  if (field === 'username') {
    where = {
      username: {
        contains: searchTerm,
      },
    };
  } else if (field === 'email') {
    where = {
      email: {
        contains: searchTerm,
      },
    };
  }

  const searchResults = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where,
    include: {
      profileImage: true,
    },
  });

  const { totalItem, totalPage } = await userCalculatePageInfo(limit, where);

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
