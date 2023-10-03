import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Jwt } from "jsonwebtoken";
import { createUser } from '../services/authService';

export const userRegister = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const inputData = req.body;

        const user = await createUser(inputData);
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

export const userLogin = async (req : Request, res : Response, next : NextFunction) => {
    try{

    }catch(error){
        next(error);
    }
}