"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStrategy = exports.jwtStrategy = void 0;
const jwt_1 = __importDefault(require("./strategy/jwt"));
exports.jwtStrategy = jwt_1.default;
const local_1 = __importDefault(require("./strategy/local"));
exports.localStrategy = local_1.default;
//# sourceMappingURL=passport.js.map