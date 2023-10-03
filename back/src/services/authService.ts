import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { IUser } from '../types/user';

const prisma = new PrismaClient();

export async function createUser(inputData : { 
    username : string,
    password: string,
    email : string,
    }){
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
}

export async function myInfo(userId : number){
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
}

export async function getUserInfo(userId : number){
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
}

export async function updateUserService(userId : number, {toUpdate} : {toUpdate : Partial<IUser>}){
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
}

export async function deleteUserService(userId : number){
    try{
        const deletedUser = await prisma.user.delete({
            where : {
                id : userId,
            },
        });
        return deletedUser;
    }catch(error){
        throw error;
    }
}