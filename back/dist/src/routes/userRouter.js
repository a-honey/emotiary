"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authenticateLocal_1 = require("../middlewares/authenticateLocal");
const authenticateJwt_1 = require("../middlewares/authenticateJwt");
const passport_1 = __importDefault(require("passport"));
const userAuthRouter = (0, express_1.Router)();
// 회원가입
userAuthRouter.post('/register', userController_1.userRegister);
userAuthRouter.post('/login', authenticateLocal_1.localAuthentication, userController_1.userLogin);
userAuthRouter.get('/current', authenticateJwt_1.jwtAuthentication, userController_1.getMyInfo);
userAuthRouter.get('/allUser', userController_1.getAllUser);
userAuthRouter.route('/:userId')
    .get(userController_1.getUserId)
    .put(authenticateJwt_1.jwtAuthentication, userController_1.updateUser)
    .delete(authenticateJwt_1.jwtAuthentication, userController_1.deleteUser);
// 비밀번호 재설정 이메일 보내기
userAuthRouter.post('/forgot-password', userController_1.forgotPassword);
// 비밀번호 재설정
userAuthRouter.post('/reset-password', authenticateJwt_1.jwtAuthentication, userController_1.resetPassword);
// refresh token사용
userAuthRouter.post('/refresh-token', userController_1.refresh);
userAuthRouter.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// userAuthRouter.get(
//     '/google/callback',
//     passport.authenticate('google', { failureRedirect : '/'}),
//     (req : Request, res : Response)=>{
//         res.redirect('/');
//     },
// );
exports.default = userAuthRouter;
//# sourceMappingURL=userRouter.js.map