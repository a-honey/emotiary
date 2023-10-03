import passport from "passport";
import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { IRequest, IUser } from "types/user";
import jwtSecret from "../passport-config/jwtSecret";

export const localAuthentication = (
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    try{
        passport.authenticate(
            "local",
            {session : false },
            (error : Error, user : IUser, info : any) => {
                if(error){
                    console.log(error);
                    next(error);
                }

                if(info){
                    console.log(info);
                    next(info);
                }

                if(user){
                    const token = jwt.sign({ id : user.id }, jwtSecret, {
                        expiresIn : "1d",
                    });
                    req.token = token;
                    req.user = user;
                    next();
                }
            }
        )(req,res,next);
    }catch(error){
        next(error);
    }
};