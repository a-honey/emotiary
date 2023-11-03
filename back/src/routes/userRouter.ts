import { Router } from 'express';
import {
  userLogin,
  verifyEmail,
  emailVerified,
  userRegister,
  getMyInfo,
  getAllUser,
  getMyFriend,
  getUserId,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  refresh,
  loginCallback,
  userLogout,
  emailLink,
  testEmail,
  searchKeyword,
  expire,
} from '../controllers/userController';
import { localAuthentication } from '../middlewares/authenticateLocal';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
import { fileUpload } from '../middlewares/uploadMiddleware';
import { wrapAsyncController } from '../utils/wrapper';
import passport from 'passport';
const userAuthRouter = Router();
// TODO 스웨거 양식 추가
// TODO VALIDATE 좀더 찾아보기
// 회원가입
userAuthRouter.post('/register', wrapAsyncController(userRegister));

// 로그인
userAuthRouter.post(
  '/login',
  localAuthentication,
  wrapAsyncController(userLogin),
);

// 이메일 인증후 회원가입
userAuthRouter.post('/testregister', wrapAsyncController(testEmail));

// 이메일 인증
userAuthRouter.post('/email', wrapAsyncController(emailLink));

// 이메일 인증 토큰 검증
userAuthRouter.get('/verifyEmail/:token', wrapAsyncController(verifyEmail));

// 이메일 인증되었는지 확인
userAuthRouter.get('/verified', emailVerified);
// 유저 키워드 검색
userAuthRouter.get(
  '/search',
  jwtAuthentication,
  wrapAsyncController(searchKeyword),
);

// 현재 유저 정보
userAuthRouter.get(
  '/current',
  jwtAuthentication,
  wrapAsyncController(getMyInfo),
);

// 모든 유저 정보
userAuthRouter.get(
  '/allUser',
  jwtAuthentication,
  wrapAsyncController(getAllUser),
);

// 친구 유저 정보
userAuthRouter.get(
  '/myfriend',
  jwtAuthentication,
  wrapAsyncController(getMyFriend),
);

// 로그아웃
userAuthRouter.get(
  '/logout',
  jwtAuthentication,
  wrapAsyncController(userLogout),
);

// 토큰 만료 여부 체크
userAuthRouter.get(
  '/tokenExpire',
  jwtAuthentication,
  wrapAsyncController(expire),
);

// 특정 유저 정보, 유저 수정, 유저 탈퇴
userAuthRouter
  .route('/:userId')
  .get(jwtAuthentication, wrapAsyncController(getUserId))
  .put(jwtAuthentication, fileUpload, wrapAsyncController(updateUser))
  .delete(jwtAuthentication, wrapAsyncController(deleteUser));

// 비밀번호 재설정 이메일 보내기
userAuthRouter.post('/forgot-password', wrapAsyncController(forgotPassword));

// 비밀번호 재설정
userAuthRouter.post(
  '/reset-password',
  jwtAuthentication,
  wrapAsyncController(resetPassword),
);

// refresh token사용
userAuthRouter.post('/refresh-token', wrapAsyncController(refresh));

// 소셜 로그인
userAuthRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  }),
);

// 소셜 로그인 리디렉션
userAuthRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  loginCallback,
);

// TODO :이모지 추가용 나중에 코드 없앨 것
import { PrismaClient } from '@prisma/client';
import { searchMusic } from '../utils/music';
import ytdl from 'ytdl-core';
const prisma = new PrismaClient();
userAuthRouter.post('/add-emoji', async (req, res) => {
  try {
    const { type, emotion } = req.body; // 클라이언트에서 전송한 데이터
    const musicData = await searchMusic(type);
    const videoId = musicData.videoId;

    const info = await ytdl.getInfo(videoId);
    // 오디오 스트림 URL 가져오기
    const audioUrl = ytdl.chooseFormat(info.formats, {
      filter: 'audioonly',
    }).url;

    const emojiData = {
      type,
      emotion, // 감정에 따른 이모지 데이터
      audioUrl,
    };
    if (!musicData) {
      const errorMessage = '음악데이터가없습니다.';
      throw errorMessage;
    }

    await prisma.emoji.create({
      data: emojiData,
    });

    res.json({ message: '이모지가 추가되었습니다.' });
  } catch (error) {
    console.error('이모지 추가 중 오류 발생:', error);
    res.status(500).json({ error: '이모지 추가 중 오류 발생' });
  }
});

userAuthRouter.post('/delete-all-emojis', async (req, res) => {
  try {
    await prisma.emoji.deleteMany({}); // 이모지 테이블의 모든 레코드 삭제
    res.json({ message: '모든 이모지가 삭제되었습니다.' });
  } catch (error) {
    console.error('이모지 삭제 중 오류 발생:', error);
    res.status(500).json({ error: '이모지 삭제 중 오류 발생' });
  }
});

export default userAuthRouter;
