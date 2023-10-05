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
exports.storeRefreshTokenInDatabase = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const jwtSecret_1 = __importDefault(require("../passport-config/jwtSecret"));
const generateAccessToken = (user) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, jwtSecret_1.default, {
        expiresIn: '1d',
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, jwtSecret_1.default, {
        expiresIn: "30d", // 예: 30일
    });
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
const storeRefreshTokenInDatabase = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.RefreshToken.create({
            data: {
                userId,
                token: refreshToken,
            },
        });
    }
    catch (error) {
        throw error;
    }
});
exports.storeRefreshTokenInDatabase = storeRefreshTokenInDatabase;
//# sourceMappingURL=tokenUtils.js.map