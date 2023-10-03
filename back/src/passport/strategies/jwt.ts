import passportJWT from 'passport-jwt';
import jwtSecret from '../jwtSecret';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwtStrategy = new JWTStrategy(
    {
        jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey : jwtSecret,
    },
    async (jwtPayload, done) => {
        try{
            const user = await prisma.user.findUnique({
                where : {
                    id : jwtPayload.sub,
                },
            });

            if (!user){
                return done(null, false, {message : '사용자를 찾을 수 없습니다.'});
            }

            return done(null, user);
        }catch(error){
            return done(error);
        }
    }
);

export default jwtStrategy;