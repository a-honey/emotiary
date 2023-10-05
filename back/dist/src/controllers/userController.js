"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.resetPassword = exports.forgotPassword = exports.deleteUser = exports.updateUser = exports.getUserId = exports.getAllUser = exports.getMyInfo = exports.userLogin = exports.userRegister = void 0;
const authService_1 = require("../services/authService");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputData = req.body;
        const user = yield (0, authService_1.createUser)(inputData);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            token: req.token,
            id: req.user.id,
            name: req.user.username,
            email: req.user.email,
            uploadFile: req.user.profileImage,
        };
        return res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.userLogin = userLogin;
const getMyInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const currentUserInfo = yield (0, authService_1.myInfo)(userId);
        res.status(200).json(currentUserInfo);
    }
    catch (error) {
        next(error);
    }
});
exports.getMyInfo = getMyInfo;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.user.findMany();
        res.status(200).json(allUsers);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUser = getAllUser;
const getUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userInfo = yield (0, authService_1.getUserInfo)(userId);
        res.status(200).json(userInfo);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserId = getUserId;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updatedUser = yield (0, authService_1.updateUserService)(userId, {
            toUpdate: Object.assign({}, req.body),
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const deletedUser = yield (0, authService_1.deleteUserService)(userId);
        res.status(200).json(deletedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        yield (0, authService_1.forgotUserPassword)(email);
        return res.status(200).json({ message: '임시 비밀번호가 이메일로 전송되었습니다.' });
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        yield (0, authService_1.resetUserPassword)(email, password);
        return res.status(200).json({ message: '비밀번호가 재설정되었습니다.' });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
const refresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh Token 없음' });
    }
    const userId = yield (0, authService_1.verifyRefreshToken)(refreshToken);
    if (!userId) {
        return res.status(403).json({ message: 'Refresh Token 만료 또는 유효하지 않음' });
    }
    const user = yield (0, authService_1.getUserById)(userId);
    const accessToken = (0, authService_1.generateAccessToken)(userId);
    res.json({ accessToken });
});
exports.refresh = refresh;
//# sourceMappingURL=userController.js.map