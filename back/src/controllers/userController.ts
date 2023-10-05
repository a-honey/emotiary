import { Request, Response, NextFunction } from "express";
import { 
    createUser,
    myInfo,
    getUserInfo,
    updateUserService,
    deleteUserService,
    forgotUserPassword,
    resetUserPassword,
    getUserFromDatabase,
} from '../services/authService';
import {
    generateAccessToken,
    verifyRefreshToken,
} from '../utils/tokenUtils'
import { IRequest } from "types/user";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userRegister = async (req : Request, res : Response, next : NextFunction) => {
    try{
        // swagger 데이터전용
        // #swagger.tags = ['Users']
        const {username, email, password} = req.body;

        const user = await createUser(req.body);
        res.status(200).json({ data: user, message: '성공' });
    }catch(error){
        next(error);
    }
}

export const userLogin = async (req : IRequest, res : Response, next : NextFunction) => {
    try{
        // swagger 데이터전용
        // #swagger.tags = ['Users']
        const { email, password } = req.body;

        const user = {
            token: req.token,
            refreshToken : req.refreshTokens,
            id: req.user.id,
            name: req.user.username,
            email: req.user.email,
            uploadFile: req.user.profileImage,
        };

        return res.status(200).json({ data: user, message: '성공' });
    }catch(error){
        next(error);
    }
}

export const getMyInfo = async(
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    try{
        /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
        }] */

        const userId = req.user.id;
        const currentUserInfo = await myInfo(userId);
        
        res.status(200).json({ data: currentUserInfo, message: '성공' });
    }catch(error){
        next(error);
    }
}

export const getAllUser = async(
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    try{
        // #swagger.tags = ['Users']

        const allUsers = await prisma.user.findMany();
        res.status(200).json({ data: allUsers, message: '성공' });
    }catch(error){
        next(error);
    }
}

export const getUserId = async(
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    try{
        /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
        }] */

        const userId = req.params.userId;
        const userInfo = await getUserInfo(userId);

        res.status(200).json({ data: userInfo, message: '성공' });
    }catch(error){
        next(error);
    }
}

export const updateUser = async(
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    try{
        const userId = req.params.userId;

        // swagger 데이터전용
        /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
        }] */
        const { email, username, description, profileImage } = req.body;

        const updatedUser = await updateUserService(userId,{
            toUpdate : { ...req.body },
        });

        res.status(200).json({ data: updatedUser, message: '성공' });
    }catch(error){
        next(error);
    }
}

export const deleteUser = async(
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    try{
        /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
        }] */

        const userId = req.params.userId;

        const message = await deleteUserService(userId);

        res.status(200).json({ message });
    }catch(error){
        next(error);
    }
}

export const forgotPassword = async (req : IRequest, res : Response, next : NextFunction ) => {
    try{
        // #swagger.tags = ['Users']

        const { email } = req.body;

        const user = await prisma.user.findUnique({where : { email }});

        if(!user){
            return res.status(404).json({ data : [], message : '사용자를 찾을 수 없습니다.' });
        }

        await forgotUserPassword(email);

        return res.status(200).json({ message : '임시 비밀번호가 이메일로 전송되었습니다.' });
    }catch(error){
        next(error);
    }
}

export const resetPassword = async(req : IRequest, res : Response, next : NextFunction ) => {
    try{
        /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
        }] */

        const { email, password } = req.body;

        const user = await prisma.user.findUnique({where : { email }});

        if(!user){
            return res.status(404).json({data : [], message : '사용자를 찾을 수 없습니다.'});
        }
        
        await resetUserPassword(email, password);

        return res.status(200).json({ message : '비밀번호가 재설정되었습니다.'});
    }catch(error){
        next(error);
    }
}

export const refresh = async (req : IRequest, res : Response, next : NextFunction) => {
    // #swagger.tags = ['Users']

    const refreshToken = req.body.token;

    if (!refreshToken) {
        return res.status(401).json({ data : [], message: 'Refresh Token 없음' });
    }

    const userId = await verifyRefreshToken(refreshToken);

    if (!userId) {
        return res.status(403).json({ message: 'Refresh Token 만료 또는 유효하지 않음' });
    }

    const user = await getUserFromDatabase(userId);
    const accessToken = generateAccessToken(user);

    res.json({ data: accessToken, message: '성공' });
}
