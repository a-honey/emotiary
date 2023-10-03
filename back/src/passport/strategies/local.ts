import passportLocal from 'passport-local';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const LocalStrategy = passportLocal.Strategy;

const localStrategy = new LocalStrategy(
    {
        usernameField : 'email',
        passwordField : 'password',
    },
    async (email, password, done) => {
        try{
            const user = await prisma.user.findUnique({
                where : {
                    email,
                },
            });

            if (!user){
                return done(null, false, {message : '사용자를 찾을 수 없습니다.'});
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if(!isValidPassword){
                return done(null, false, { message : '비밀번호가 일치하지 않습니다. '});
            }

            return done(null, user);
        }catch(error){
            return done(error);
        }
    }
);

export default localStrategy;