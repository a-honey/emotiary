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
exports.jwtAuthentication = void 0;
const passport_1 = __importDefault(require("passport"));
const jwtAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        passport_1.default.authenticate("jwt", { session: false }, (error, user, info) => {
            if (error) {
                console.log(error);
                next(error);
            }
            if (info) {
                console.log(info);
                next(info);
            }
            req.user = user;
            next();
        })(req, res, next);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.jwtAuthentication = jwtAuthentication;
//# sourceMappingURL=authenticateJwt.js.map