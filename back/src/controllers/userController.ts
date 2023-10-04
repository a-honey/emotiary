import { Request, Response, NextFunction } from "express";
import { 
    createUser,
    myInfo,
    getUserInfo,
    updateUserService,
    deleteUserService,
    forgotUserPassword,
    resetUserPassword,
} from '../services/authService';
import { IRequest } from "types/user";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userRegister = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const inputData = req.body;
        const user = await createUser(inputData);
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

export const userLogin = async (req : IRequest, res : Response, next : NextFunction) => {
    try{
        const user = {
            token: req.token,
            id: req.user.id,
            name: req.user.username,
            email: req.user.email,
            uploadFile: req.user.profileImage,
        };

        return res.status(200).json(user);
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
        const userId = req.user.id;
        const currentUserInfo = await myInfo(userId);
        
        res.status(200).json(currentUserInfo);
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
        const allUsers = await prisma.user.findMany();
        res.status(200).json(allUsers);
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
        const userId = parseInt(req.params.userId, 10);
        const userInfo = await getUserInfo(userId);

        res.status(200).json(userInfo);
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
        const userId = parseInt(req.params.userId, 10);

        const updatedUser = await updateUserService(userId,{
            toUpdate : { ...req.body },
        });

        res.status(200).json(updatedUser);
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
        const userId = parseInt(req.params.userId, 10);

        const deletedUser = await deleteUserService(userId);

        res.status(200).json(deletedUser);
    }catch(error){
        next(error);
    }
}

export const forgotPassword = async (req : IRequest, res : Response, next : NextFunction ) => {
    try{
        const { email } = req.body;

        const user = await prisma.user.findUnique({where : { email }});

        if(!user){
            return res.status(404).json({message : '사용자를 찾을 수 없습니다.'});
        }

        await forgotUserPassword(email);

        return res.status(200).json({ message : '임시 비밀번호가 이메일로 전송되었습니다.'});
    }catch(error){
        next(error);
    }
}

export const resetPassword = async(req : IRequest, res : Response, next : NextFunction ) => {
    try{
        const { email, password } = req.body;
        console.log(req.body);
        const user = await prisma.user.findUnique({where : { email }});

        if(!user){
            return res.status(404).json({message : '사용자를 찾을 수 없습니다.'});
        }
        
        await resetUserPassword(email, password);

        return res.status(200).json({ message : '비밀번호가 재설정되었습니다.'});
    }catch(error){
        next(error);
    }
}