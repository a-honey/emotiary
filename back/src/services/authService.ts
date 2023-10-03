import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function verifyPassword(candidatePassword : string, hashedPassword : string){
    return await bcrypt.compare(candidatePassword, hashedPassword);
}

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