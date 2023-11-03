import { Request, Response } from 'express';
import {
  createUser,
  myInfo,
  getAllUsers,
  getMyFriends,
  getUserInfo,
  logout,
  updateUserService,
  deleteUserService,
  forgotUserPassword,
  resetUserPassword,
  getUserFromDatabase,
  getUsers,
  emailLinked,
  verifyToken,
  registerUser,
} from '../services/authService';
import { generateAccessToken, verifyRefreshToken } from '../utils/tokenUtils';
import { IRequest } from 'types/request';
import { userValidateDTO } from '../dtos/userDTO';
import { plainToClass } from 'class-transformer';
import { emptyApiResponseDTO } from '../utils/emptyResult';
import { generateRefreshToken } from '../utils/tokenUtils';
import { storeRefreshTokenInDatabase } from '../utils/tokenUtils';
import { prisma } from '../../prisma/prismaClient';
import { generateError } from '../utils/errorGenerator';

export const userRegister = async (req: Request, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = '회원가입'
  const { username, email, password } = req.body;

  await plainToClass(userValidateDTO, req.body);

  // createUser 함수를 사용하여 새 사용자 생성
  const user = await createUser(req.body);

  return res.status(user.status).json(user);
};

export const userLogin = async (req: IRequest, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = '로그인'
  const { email, password } = req.body;

  await plainToClass(userValidateDTO, req.body);
  const myInfo = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      profileImage: true,
    },
  });
  if (!myInfo) {
    const response = emptyApiResponseDTO();
    return response;
  }
  // 사용자 정보와 토큰 데이터를 사용하여 user 객체 생성
  const user = {
    token: req.token,
    refreshToken: req.refreshTokens,
    id: req.user.id,
    name: req.user.username,
    email: req.user.email,
    profileImage: myInfo.profileImage,
  };

  return res.status(200).json({ data: user, message: '성공' });
};

export const getMyInfo = async (req: IRequest, res: Response) => {
  /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
     #swagger.summary = '현재 유저 정보'
        }] */

  const userId = req.user.id;

  // myInfo 함수를 사용하여 현재 사용자의 정보 가져오기
  const currentUserInfo = await myInfo(userId);

  res.status(currentUserInfo.status).json(currentUserInfo);
};

export const getAllUser = async (req: IRequest, res: Response) => {
  // #swagger.tags = ['Users']
  //     #swagger.security = [{
  //         "bearerAuth": []
  // #swagger.summary = '모든 유저 정보'
  //  }]

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const userId = req.user.id;

  const allUsers = await getAllUsers(userId, page, limit);

  return res.status(allUsers.status).json(allUsers);
};

export const getMyFriend = async (req: IRequest, res: Response) => {
  /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
     #swagger.summary = '친구 유저 정보'
        }] */

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const userId = req.user.id;

  const allMyFriends = await getMyFriends(userId, page, limit);

  return res.status(allMyFriends.status).json(allMyFriends);
};

export const getUserId = async (req: IRequest, res: Response) => {
  /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
     #swagger.summary = '특정 유저 정보'               
        }] */

  const userId = req.params.userId;

  // getUserInfo 함수를 사용하여 특정 사용자의 정보 가져오기
  const userInfo = await getUserInfo(userId);

  res.status(userInfo.status).json(userInfo);
};

export const userLogout = async (req: IRequest, res: Response) => {
  /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
     #swagger.summary = '로그아웃'               
        }] */

  const userId = req.user.id;
  await logout(userId);

  res.status(200).json({ message: '로그아웃되었습니다.' });
};

export const updateUser = async (req: IRequest, res: Response) => {
  // swagger 데이터전용
  /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
     #swagger.summary = '유저 정보 수정'               
        }] */

  const { email, username, description } = req.body;

  const userId = req.params.userId;
  await plainToClass(userValidateDTO, req.body);
  // updateUserService 함수를 사용하여 사용자 정보 업데이트
  const updatedUser = await updateUserService(userId, req.body);

  res.status(updatedUser.status).json(updatedUser);
};

export const deleteUser = async (req: IRequest, res: Response) => {
  /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
     #swagger.summary = '유저 탈퇴'
        }] */

  const loginId = req.user.id;
  const userIdToDelete = req.params.userId;

  if (loginId !== userIdToDelete) {
    return res.status(403).json({ message: '권한이 없습니다.' });
  }

  // deleteUserService 함수를 사용하여 사용자 삭제
  await deleteUserService(userIdToDelete);

  res.status(200).json({ message: '사용자가 삭제되었습니다.' });
};

export const forgotPassword = async (req: IRequest, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = '임시 비밀번호 발급'

  const { email } = req.body;

  // forgotUserPassword 함수를 사용하여 임시 비밀번호 생성 및 이메일로 전송
  await forgotUserPassword(email);

  return res
    .status(200)
    .json({ message: '임시 비밀번호가 이메일로 전송되었습니다.' });
};

export const resetPassword = async (req: IRequest, res: Response) => {
  /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
     #swagger.summary = '비밀번호 초기화'
        }] */
  const { email, password } = req.body;

  // resetUserPassword 함수를 사용하여 비밀번호 재설정
  await resetUserPassword(email, password);

  return res.status(200).json({ message: '비밀번호가 재설정되었습니다.' });
};

export const refresh = async (req: IRequest, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = '리프레시 토큰'

  const refreshToken = req.body.token;

  if (!refreshToken) {
    const response = emptyApiResponseDTO();
    return response;
  }

  // Refresh Token을 사용하여 사용자 ID 확인
  const userId = await verifyRefreshToken(refreshToken);

  if (!userId) {
      generateError(403,"refreshToken이 유효하지않음");
  }

  // 유저 정보 가져오고
  const user = await getUserFromDatabase(userId);
  // accessToken 재발급
  const accessToken = generateAccessToken(user);
  // refreshToken 재발급
  const newRefreshToken = generateRefreshToken(user);
  // 생성한 refreshToken DB에 저장
  await storeRefreshTokenInDatabase(userId, newRefreshToken);

  res.json({ data: { accessToken, newRefreshToken }, message: '성공' });
};

export const loginCallback = (req: IRequest, res: Response) => {
  // 소셜 로그인 성공 시 홈 페이지로 리다이렉션
  res.redirect('/');
};

export const searchKeyword = async (req: IRequest, res: Response) => {
  /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
     #swagger.summary = '키워드에 맞는 유저 정보 검색'
        }] */

  const searchTerm = req.query.searchTerm as string;
  const field = req.query.field as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const searchKeyword = await getUsers(searchTerm, field, page, limit);

  return res.status(searchKeyword.status).json(searchKeyword);
};

// 선 이메일 인증 요청
export const emailLink = async (req: IRequest, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = '회원가입 전 이메일 인증'

  const { email } = req.body;

  await emailLinked(email);

  res.json({ message: '이메일을 확인해주세요' });
};

// 이메일인증 확인
export const verifyEmail = async (req: IRequest, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = '이메일 인증 토큰 확인'

  const { token } = req.params;

  await verifyToken(token);

  res.redirect('/api/users/verified');
};

export const emailVerified = (req: IRequest, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = '이메일 인증 확인'

  res.send('이메일이 성공적으로 인증되었습니다.');
};

// 이메일 인증 후 회원가입
export const testEmail = async (req: IRequest, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = '이메일 인증 후 회원가입'

  const { email, username, password } = req.body;

  const userRegister = await registerUser(email, username, password);

  return res.status(userRegister.status).json(userRegister);
};

export const expire = async (req: IRequest, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = '토큰 만료 여부 확인'

  res.status(200).json({ message: 'Token is valid' });
};
