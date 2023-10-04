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
} from '../controllers/userController';
import { localAuthentication } from '../middlewares/authenticateLocal';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
const userAuthRouter = Router();

// 회원가입
userAuthRouter.post('/register', userRegister);

userAuthRouter.post('/login', localAuthentication, userLogin);

userAuthRouter.get('/current', jwtAuthentication, getMyInfo);

userAuthRouter.get('/allUser',getAllUser);

userAuthRouter.route('/:userId')
    .get(getUserId)
    .put(jwtAuthentication, updateUser)
    .delete(jwtAuthentication, deleteUser);

// 비밀번호 재설정 이메일 보내기
userAuthRouter.post('/forgot-password', forgotPassword);

// 비밀번호 재설정
userAuthRouter.post('/reset-password', jwtAuthentication, resetPassword);

export default userAuthRouter;