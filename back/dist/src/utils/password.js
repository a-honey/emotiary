"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPassowrd = void 0;
const generateRandomPassowrd = () => {
    const length = 10;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPassword = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomPassword += charset[randomIndex];
    }
    return randomPassword;
};
exports.generateRandomPassowrd = generateRandomPassowrd;
//# sourceMappingURL=password.js.map