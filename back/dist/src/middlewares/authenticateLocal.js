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
exports.localAuthentication = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret_1 = __importDefault(require("../passport-config/jwtSecret"));
const tokenUtils_1 = require("utils/tokenUtils");
const localAuthentication = (req, res, next) => {
    try {
        passport_1.default.authenticate("local", { session: false }, (error, user, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.log(error);
                next(error);
            }
            if (info) {
                console.log(info);
                next(info);
            }
            if (user) {
                const token = jsonwebtoken_1.default.sign({ id: user.id }, jwtSecret_1.default, {
                    expiresIn: "1d",
                });
                const refreshToken = (0, tokenUtils_1.generateRefreshToken)(user);
                yield (0, tokenUtils_1.storeRefreshTokenInDatabase)(user.id, refreshToken);
                req.token = token;
                req.user = user;
                req.RefreshToken = refreshToken;
                return next();
            }
        }))(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
exports.localAuthentication = localAuthentication;
//# sourceMappingURL=authenticateLocal.js.map