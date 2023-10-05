import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../utils/email';
import { generateRandomPassowrd } from '../utils/password';
import bcrypt from 'bcrypt';
import { IUser } from '../types/user';

const prisma = new PrismaClient();

export const createUser = async (inputData : { 
    username : string,
    password: string,
    email : string,
    }) => {
        try{
            const { username, password, email } = inputData;

            const hashedPassword = await bcrypt.hash(password,10);

            const user = await prisma.user.create({
                data : { username, password : hashedPassword, email},
            });

            return user;
        }catch(error){
            throw error;
        }
};

export const myInfo = async (userId : string) => {
    try{
        const myInfo = await prisma.user.findUnique({
            where : {
                id : userId,
            },
        });
        return myInfo;
    }catch(error){
        throw error;
    }
};

export const getUserInfo = async(userId : string) => {
    try{
        const userInfo = await prisma.user.findUnique({
            where : {
                id : userId,
            },
        });
        return userInfo;
    }catch(error){
        throw error;
    }
};

export const updateUserService = async (
    userId : string, 
    {toUpdate} : {toUpdate : Partial<IUser>}
    ) => {
    try{
        if(toUpdate.password){
            delete toUpdate.password;
        }

        const updatedUser = await prisma.user.update({
            where : {
                id : userId,
            },
            data : toUpdate,
        });
        return updatedUser;
    }catch(error){
        throw error;
    }
};

export const deleteUserService = async (userId : string) => {
    try{
        await prisma.refreshToken.deleteMany({
            where: {
                userId: userId,
            },
        });

        await prisma.user.delete({
            where : {
                id : userId,
            },
        });

        return "사용자가 삭제되었습니다.";
    }catch(error){
        throw error;
    }
}

export const forgotUserPassword = async (email : string) => {
    try{
        const tempPassword = generateRandomPassowrd();
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(tempPassword, saltRounds);

        await prisma.user.update({
            where : { email : email },
            data : { password : hashedPassword },
        });

        await sendEmail(email, '비밀번호 재설정', `임시 비밀번호 : ${tempPassword}`);
    }catch(error){
        throw error;
    }
}

export const resetUserPassword = async ( 
    email : string,
    password : string
    ) => {
        try{
            const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await prisma.user.update({
            where : { email : email },
            data : { password : hashedPassword },
        });
        }catch(error){
            throw error;
        }
    }

    export const getUserFromDatabase = async (userId : string) => {
        try{
            const user = await prisma.user.findUnique({
                where : {
                    id : userId,
                },
            });
            return user;
        }catch(error){
            throw error;
        }
    }