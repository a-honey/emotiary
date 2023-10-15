import { Router } from "express";
import {
  userLogin,
  userRegister,
  getMyInfo,
  getAllUser,
  getUserId,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  refresh,
  loginCallback,
  userLogout,
} from "../controllers/userController";
import { localAuthentication } from "../middlewares/authenticateLocal";
import { jwtAuthentication } from "../middlewares/authenticateJwt";
import { fileUpload } from "../middlewares/uploadMiddleware";
import passport from "passport";
const userAuthRouter = Router();

// 회원가입
userAuthRouter.post("/register", userRegister);

userAuthRouter.post('/login', localAuthentication, userLogin);

userAuthRouter.get('/current', jwtAuthentication, getMyInfo);

userAuthRouter.get('/allUser', jwtAuthentication, getAllUser);

userAuthRouter.get("/logout", jwtAuthentication, userLogout);

userAuthRouter
  .route("/:userId")
  .get(getUserId)
  .put(jwtAuthentication, fileUpload, updateUser)
  .delete(jwtAuthentication, deleteUser);

// 비밀번호 재설정 이메일 보내기
userAuthRouter.post("/forgot-password", forgotPassword);

// 비밀번호 재설정
userAuthRouter.post("/reset-password", jwtAuthentication, resetPassword);

// refresh token사용
userAuthRouter.post('/refresh-token', refresh);

userAuthRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  })
);

userAuthRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  loginCallback
);


// TODO :이모지 추가용 나중에 코드 없앨 것
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
userAuthRouter.post('/add-emoji', async (req, res) => {
  try {
    const { type, emotion } = req.body; // 클라이언트에서 전송한 데이터
    const emojiData = {
      type,
      ...emotion, // 감정에 따른 이모지 데이터
    };
    
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