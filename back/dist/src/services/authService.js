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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateAccessToken = exports.getUserById = exports.resetUserPassword = exports.forgotUserPassword = exports.deleteUserService = exports.updateUserService = exports.getUserInfo = exports.myInfo = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const email_1 = require("../utils/email");
const password_1 = require("../utils/password");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const createUser = (inputData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = inputData;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: { username, password: hashedPassword, email },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const myInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myInfo = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return myInfo;
    }
    catch (error) {
        throw error;
    }
});
exports.myInfo = myInfo;
const getUserInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return userInfo;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserInfo = getUserInfo;
const updateUserService = (userId, { toUpdate }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (toUpdate.password) {
            delete toUpdate.password;
        }
        const updatedUser = yield prisma.user.update({
            where: {
                id: userId,
            },
            data: toUpdate,
        });
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserService = updateUserService;
const deleteUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield prisma.user.delete({
            where: {
                id: userId,
            },
        });
        return deletedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUserService = deleteUserService;
const forgotUserPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tempPassword = (0, password_1.generateRandomPassowrd)();
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(tempPassword, saltRounds);
        yield prisma.user.update({
            where: { email: email },
            data: { password: hashedPassword },
        });
        yield (0, email_1.sendEmail)(email, '비밀번호 재설정', `임시 비밀번호 : ${tempPassword}`);
    }
    catch (error) {
        throw error;
    }
});
exports.forgotUserPassword = forgotUserPassword;
const resetUserPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        yield prisma.user.update({
            where: { email: email },
            data: { password: hashedPassword },
        });
    }
    catch (error) {
        throw error;
    }
});
exports.resetUserPassword = resetUserPassword;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserById = getUserById;
const generateAccessToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = Math.random().toString().substring(2) + Math.random().toString(36).substring(2);
        return refreshToken;
    }
    catch (error) {
        throw error;
    }
});
exports.generateAccessToken = generateAccessToken;
const verifyRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshTokenData = yield prisma.refreshToken.findUnique({
            where: {
                token: refreshToken,
            },
        });
        if (!refreshTokenData) {
            return null;
        }
        return refreshTokenData.userId;
    }
    catch (error) {
        throw error;
    }
});
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=authService.js.map