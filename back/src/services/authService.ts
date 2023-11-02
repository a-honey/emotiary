import { PrismaClient, Prisma } from '@prisma/client';
import { generateRandomPassowrd } from '../utils/password';
import bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { userResponseDTO } from '../dtos/userDTO';
import { successApiResponseDTO } from '../utils/successResult';
import { userCalculatePageInfo } from '../utils/pageInfo';
import { PaginationResponseDTO } from '../dtos/diaryDTO';
import { emailToken, sendEmail } from '../utils/email';
import { emptyApiResponseDTO } from '../utils/emptyResult';
import { getMyWholeFriends } from './friendService';

//TODO prismaClient.ts에서 import해와서 사용하기
const prisma = new PrismaClient();

export const createUser = async (inputData: Prisma.UserCreateInput) => {
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
  const friendList = await getMyWholeFriends(userId);

  const friendIds = friendList.map((friend) => {
    return userId == friend.sentUserId
      ? friend.receivedUserId
      : friend.sentUserId;
  });

  const userList = await prisma.user.findMany({
    take: limit,
    skip: (page - 1) * limit,
    include: {
      profileImage: true,
    },
  });
  for (const user of userList) {
    const firstDiary = await prisma.diary.findFirst({
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdDate: 'asc',
      },
    });
    if (firstDiary) {
      user.latestEmoji = firstDiary.emoji;
    }
  }
  friendIds.push(userId);
  const friendsWithIsFriend = userList.map((friend) => {
    friend.isFriend = friendIds.includes(friend.id);
    return friend;
  });

  const { totalItem, totalPage } = await userCalculatePageInfo(limit, {});

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  const userResponseDataList = friendsWithIsFriend.map((user) =>
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
  const friendList = await getMyWholeFriends(userId);

  const friendIds = friendList.map((friend) => {
    return userId == friend.sentUserId
      ? friend.receivedUserId
      : friend.sentUserId;
  });

  const friendsInfo = await prisma.user.findMany({
    take: limit,
    skip: (page - 1) * limit,
    where: {
      id: {
        in: friendIds, // 친구의 ID 목록
      },
    },
    include: {
      profileImage: true,
    },
  });
  for (const friend of friendsInfo) {
    const firstDiary = await prisma.diary.findFirst({
      where: {
        authorId: friend.id,
      },
      orderBy: {
        createdDate: 'asc',
      },
    });
    if (firstDiary) {
      friend.latestEmoji = firstDiary.emoji;
    }
  }
  const friendsWithIsFriend = friendsInfo.map((friend) => {
    friend.isFriend = true; // 또는 false
    return friend;
  });

  const totalItem = friendsWithIsFriend.length;
  const totalPage = Math.ceil(totalItem / limit);

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  const userResponseDataList = friendsWithIsFriend.map((user) =>
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

export const logout = async (userId: string) => {
  await prisma.refreshToken.deleteMany({
    where: {
      userId: userId,
    },
  });
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
  const UserResponseDTO = plainToClass(userResponseDTO, updatedUser, {
    excludeExtraneousValues: true,
  });
  const response = successApiResponseDTO(UserResponseDTO);
  return response;
};

export const deleteUserService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    // 사용자를 찾을 수 없는 경우 적절한 오류 처리를 수행
    const response = emptyApiResponseDTO();
    return response;
  }

  // 사용자의 refreshTokens 먼저 삭제
  await prisma.refreshToken.deleteMany({
    where: {
      userId: userId,
    },
  });

  // 사용자의 친구 관계 삭제
  await prisma.friend.deleteMany({
    where: {
      OR: [{ sentUserId: userId }, { receivedUserId: userId }],
    },
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
};

export const forgotUserPassword = async (email: string) => {
  // 데이터베이스에서 사용자 이메일로 사용자 조회
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const response = emptyApiResponseDTO();
    return response;
  }

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
  // 데이터베이스에서 사용자 이메일로 사용자 조회
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const response = emptyApiResponseDTO();
    return response;
  }

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

export const emailLinked = async (email: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      isVerified: false,
    },
  });

  const result = emailToken();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      verificationToken: result.token,
      verificationTokenExpires: result.expires,
    },
  });

  let baseUrl;
  if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:5001';
  } else {
    baseUrl = 'https://kdt-ai-8-team02.elicecoding.com';
  }
  const verifyUrl = `${baseUrl}/api/users/verifyEmail/${result.token}`;

  await sendEmail(
    email,
    '이메일 인증',
    '',
    `<p>눌러 주세요</p>
        <p><a href = "${verifyUrl}">Verify Email</a></p>
        <p>${result.expires}</p>`,
  );
};

export const verifyToken = async (token: string) => {
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
      verificationTokenExpires: {
        gte: new Date(),
      },
    },
  });

  if (!user) {
    throw { message: '토큰이 유효하지 않습니다.' };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    },
  });
};

export const registerUser = async (
  email: string,
  username: string,
  password: string,
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.isVerified) {
    throw { message: '이메일 인증이 필요합니다.' };
  }

  // 비밀번호를 해시하여 저장 (안전한 비밀번호 저장)
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      username,
      password: hashedPassword,
    },
  });

  const UserResponseDTO = plainToClass(userResponseDTO, user, {
    excludeExtraneousValues: true,
  });

  const response = successApiResponseDTO(UserResponseDTO);
  return response;
};
