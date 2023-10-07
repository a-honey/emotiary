import { NextFunction, Response } from "express";
import joi from "joi";
import { IRequest } from "types/user";

const nameReg: RegExp = /^[a-zA-Z가-힣]+$/;
const passwordReg: RegExp = /^[a-zA-Z0-9!@#;:'-_=+,./?]+$/;

const validateSchema = (schema: joi.ObjectSchema) => {
    return (req : IRequest, res : Response, next : NextFunction) => {
        const { error } = schema.validate(req.body);
        if(error){
            const errorMessage = error.details[0].message;
            next(errorMessage);
        }
        next();
    }
}

const emailErrorMessage = {
    stringMin : "Email을 4글자 이상만 입력가능합니다.",
    Required : "Email을 입력해주세요",
    Email : "email형식이 아닙니다."
}

const passwordErrorMessage = {
    stringMin : "password는 4글자 이상만 입력가능합니다.",
    stringMax : "password는 30글자 이하만 입력가능합니다.",
    Required : "password을 입력해주세요",
    Password : "비밀번호는 영문 대소문자, 숫자, 특수문자(!@#;:'-_=+,./?)만 입력가능합니다."
}

const usernameErrorMessage = {
    stringMin : "username은 2글자 이상만 입력가능합니다.",
    stringMax : "username은 30글자 이하만 입력가능합니다.",
    Required : "username을 입력해주세요",
    Username : "이름은 한글 또는 영문 대소문자만 입력가능합니다."
}


const registerSchema = joi.object({
    email: joi.string().min(4).required().email().messages({
      "string.min": emailErrorMessage.stringMin,
      "any.required" : emailErrorMessage.Required,
      "string.email" : emailErrorMessage.Email, 
    }),
    username: joi.string().min(2).max(30).required().pattern(nameReg).messages({
      "string.pattern.base": usernameErrorMessage.Username,
      "string.min": usernameErrorMessage.stringMin,
      "string.max": usernameErrorMessage.stringMax,
      "any.required" : usernameErrorMessage.Required,
    }),
    password: joi.string().min(4).max(30).required().pattern(passwordReg).messages({
        "string.pattern.base": passwordErrorMessage.Password,
        "string.min": passwordErrorMessage.stringMin,
        "string.max": passwordErrorMessage.stringMax,
        "any.required" : passwordErrorMessage.Required,
    }),
    description: joi.string().optional(),
    uploadFile: joi.any(),
});

const userUpdateSchema = joi.object({
    email: joi.string().min(4).optional().email().messages({
        "string.min": emailErrorMessage.stringMin,
        "string.email" : emailErrorMessage.Email, 
    }),
    username: joi.string().min(2).max(30).optional().pattern(nameReg).messages({
        "string.pattern.base": usernameErrorMessage.Username,
        "string.min": usernameErrorMessage.stringMin,
        "string.max": usernameErrorMessage.stringMax,
    }),
    description: joi.string().optional(),
    uploadFile: joi.any(),
});

export const RegisterValidator = validateSchema(registerSchema);

export const updateValidator = validateSchema(userUpdateSchema);