import { Router } from 'express';
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
} from '../controllers/userController';
import { localAuthentication } from '../middlewares/authenticateLocal';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
import { RegisterValidator, updateValidator } from '../utils/validators/userValidator';
import passport from 'passport';
const userAuthRouter = Router();

// 회원가입
userAuthRouter.post('/register', RegisterValidator, userRegister);

userAuthRouter.post('/login', localAuthentication, userLogin);

userAuthRouter.get('/current', jwtAuthentication, getMyInfo);

userAuthRouter.get('/allUser',getAllUser);

userAuthRouter.get('/logout', jwtAuthentication, userLogout);

userAuthRouter.route('/:userId')
    .get(getUserId)
    .put(jwtAuthentication, updateValidator, updateUser)
    .delete(jwtAuthentication, deleteUser);

// 비밀번호 재설정 이메일 보내기
userAuthRouter.post("/forgot-password", forgotPassword);

// 비밀번호 재설정
userAuthRouter.post("/reset-password", jwtAuthentication, resetPassword);

// refresh token사용
userAuthRouter.post('/refresh-token', refresh);

userAuthRouter.get('/google',
    passport.authenticate('google',{scope: [
        'https://www.googleapis.com/auth/userinfo.email', 
        'https://www.googleapis.com/auth/userinfo.profile'
    ]})
);

userAuthRouter.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    loginCallback
);

export default userAuthRouter;