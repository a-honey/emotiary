// import { Request, Response, NextFunction } from "express";
// import {
// } from '../services/chatService';
// import { IRequest } from "types/user";
// const jwt = require('jsonwebtoken');
// const path = require('path');
// import dotenv from 'dotenv';

// export const chatAuth = async (req : IRequest, res : Response, next : NextFunction) => {
//     try {
//         req.decoded = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
//         return next();
//     }  catch (error) {
//         // Token has been expired
//         if (error.name === 'TokenExpiredError') {
//             console.log('auth TokenExpiredError');
//             next();
//             // return res.status(419).json({
//             //     code: 419,
//             //     message: 'Token has been expired.'
//             // }); 
//         }
//         // JsonWebTokenError
//         if (error.name === 'JsonWebTokenError') {
//             console.log('JsonWebTokenError');
//             next();
//             // return res.status(401).json({
//             //     code: 401,
//             //     message: 'Invalid token.'
//             // });
//         }
//     }
// }
const jwt = require('jsonwebtoken');
const io = require('socket.io');
const config = process.env;
import { Server as SocketIoServer, Socket } from 'socket.io';

export const authSocket = (socket: Socket, next) => {
    // front에서 query에 토큰을 객체에 담아 보내준다.
    const token = socket.handshake.query.token;
    
    // query가 존재하고, query.token이 존재한다면 verify 실행
    if(socket.handshake.query && socket.handshake.query.token){
      // 앞단에서 query를 통해 가져온 token과 env 파일의 token에 verify 진행
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      
      socket.decoded = decoded;
    }else {
      const socketError = new Error('증명되지 않은 소켓')
      return next(socketError)
    }
    next()
  }