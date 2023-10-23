import { Request, Response, NextFunction, RequestHandler } from "express";
import { 
    createUser,
    myInfo,
    getUserInfo,
    updateUserService,
    deleteUserService,
    forgotUserPassword,
    resetUserPassword,
    getUserFromDatabase,
    areUsersFriends,
} from '../services/authService';
import {
    generateAccessToken,
    verifyRefreshToken,
} from '../utils/tokenUtils'
import { IRequest, IUser } from "types/user";
import { PrismaClient } from '@prisma/client';
import { userValidateDTO } from "../dtos/userDTO";
import { plainToClass } from "class-transformer";
import { emptyApiResponseDTO } from "../utils/emptyResult";

const prisma = new PrismaClient();

export const userRegister = async (req : Request, res : Response, next : NextFunction) => {
    try{
        // swagger 데이터전용
        // #swagger.tags = ['Users']
        const {username, email, password} = req.body;
        const inputData = plainToClass(userValidateDTO, req.body);

        // createUser 함수를 사용하여 새 사용자 생성
        const user = await createUser(inputData);

        return res.status(user.status).json(user);
    }catch(error){
        next(error);
    }
}

export const userLogin = async (req : IRequest, res : Response, next : NextFunction) => {
    try{
        // swagger 데이터전용
        // #swagger.tags = ['Users']
        const { email, password } = req.body;
        // 사용자 정보와 토큰 데이터를 사용하여 user 객체 생성
        const user = {
            token: req.token,
            refreshToken : req.refreshTokens,
            id: req.user.id,
            name: req.user.username,
            email: req.user.email,
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

        // myInfo 함수를 사용하여 현재 사용자의 정보 가져오기
        const currentUserInfo = await myInfo(userId);
        
        res.status(currentUserInfo.status).json(currentUserInfo);
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

        // 요청에서 page와 limit 값을 읽어옴
        const page: number = parseInt(req.query.page as string) || 1;
        const limit: number = parseInt(req.query.limit as string) || 10;
        const userId = req.user.id;

        // 모든 사용자 정보를 데이터베이스에서 가져오기
        const allUsers = await prisma.user.findMany({
            include: {
                filesUpload: true
            }
        });

        // 페이징 관련 정보 계산
        const totalUsers = allUsers.length;
        const totalPage = Math.ceil(totalUsers / limit);

        for (const user of allUsers) {

            const areFriends = await areUsersFriends(userId, user.id);
            user.isFriend = areFriends;


            const latestDiary = await prisma.diary.findFirst({
                where : {
                    authorId : user.id
                },
                orderBy : {
                    createdAt : 'desc'
                }
            });
            if(latestDiary) {
                user.latestEmoji = latestDiary.emoji;
            }
        }

        res.status(200).json({ 
            data: allUsers, 
            message: '성공', 
            totalPage : totalPage,
            totalItem : totalUsers,
            currentPage : page,
            limit : limit
        });
    }catch(error){
        next(error);
    }
}

export const getMyFriend = async(
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    try{
        const page: number = parseInt(req.query.page as string) || 1;
        const limit: number = parseInt(req.query.limit as string) || 10;
        const userId = req.user.id;
        const allUsers = await prisma.user.findMany({
            include: {
                filesUpload: true
            }
        });
        const filteredUsers = [];
        for (const user of allUsers) {
            if (user.id !== userId) { // 현재 사용자의 ID 제외
                const areFriends = await areUsersFriends(userId, user.id);
                user.isFriend = areFriends;

                const latestDiary = await prisma.diary.findFirst({
                    where: {
                        authorId: user.id,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                });

                if (latestDiary) {
                    user.latestEmoji = latestDiary.emoji;
                }

                if (areFriends) {
                    // 친구인 경우만 결과에 포함
                    filteredUsers.push(user);
                }
            }
        }
        const totalUsers = filteredUsers.length;
        const totalPage = Math.ceil(totalUsers / limit);
        res.status(200).json({
            data: filteredUsers,
            message: '성공',
            totalPage: totalPage,
            totalItem: filteredUsers.length,
            currentPage: page,
            limit: limit
        });
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

        // getUserInfo 함수를 사용하여 특정 사용자의 정보 가져오기
        const userInfo = await getUserInfo(userId);

        res.status(userInfo.status).json(userInfo);
    }catch(error){
        next(error);
    }
}

export const userLogout = async (req : IRequest, res : Response, next : NextFunction) => {
    try{
        const userId = req.user.id;

        /* #swagger.tags = ['Users']
         #swagger.security = [{
               "bearerAuth": []
        }] */

        // 현재 사용자의 Refresh Token 삭제
        await prisma.refreshToken.deleteMany({
            where : {
                userId : userId,
            },
        });

        res.status(200).json({message : '로그아웃 완료'});
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
        const { email, username, description } = req.body;
        const inputData = plainToClass(userValidateDTO, req.body);
        // updateUserService 함수를 사용하여 사용자 정보 업데이트
        const updatedUser = await updateUserService(userId, req.body);
        
        res.status(updatedUser.status).json(updatedUser);
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

        // deleteUserService 함수를 사용하여 사용자 삭제
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

        // 데이터베이스에서 사용자 이메일로 사용자 조회
        const user = await prisma.user.findUnique({where : { email }});

        if(!user){
            const response = emptyApiResponseDTO();
            return response;
        }

        // forgotUserPassword 함수를 사용하여 임시 비밀번호 생성 및 이메일로 전송
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

        // 데이터베이스에서 사용자 이메일로 사용자 조회
        const user = await prisma.user.findUnique({where : { email }});

        if(!user){
            const response = emptyApiResponseDTO();
            return response;
        }
        
        // resetUserPassword 함수를 사용하여 비밀번호 재설정
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
        const response = emptyApiResponseDTO();
        return response;
    }

    // Refresh Token을 사용하여 사용자 ID 확인
    const userId = await verifyRefreshToken(refreshToken);

    if (!userId) {
        return res.status(403).json({ message: 'Refresh Token 만료 또는 유효하지 않음' });
    }

    // 데이터베이스에서 사용자 정보 가져오고 재발급
    const user = await getUserFromDatabase(userId);
    const accessToken = generateAccessToken(user);

    res.json({ data: accessToken, message: '성공' });
}


export const profile = async (req : IRequest, res : Response, next : NextFunction) => {
    if(!req.isAuthenticated()){
        // 인증되지 않은 경우 홈 페이지로 리다이렉션
        return res.redirect('/');
    }

    try {
        // 현재 로그인한 사용자의 정보를 데이터베이스에서 가져오기
        const user = await prisma.user.findUnique({
            where : { id : req.user.id },
        });

        if(!user){
            const response = emptyApiResponseDTO();
            return response;
        }
        // 현재 사용자의 프로필 정보를 응답으로 반환
        return res.json({data : user, message : "성공"});
    }catch(error){
        next(error);
    }
}

export const loginCallback = (req : IRequest, res :Response) => {
    // 소셜 로그인 성공 시 홈 페이지로 리다이렉션
    res.redirect('/');
}