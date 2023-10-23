import {
    IsString,
    IsOptional,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import 'reflect-metadata';
import { fileUpload } from '../types/user';

export class ApiResponseDTO<T>{
    data : T;
    message : string;
    status : number;

    constructor(status: number, data: T, message: string) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}

export class userResponseDTO{
    @Expose()
    id : string;

    @Expose()
    username : string;

    @Expose()
    email : string;

    @Exclude()
    password : string;

    @Expose()
    description : string | null;

    @Expose()
    filesUpload : fileUpload[];

    @Expose()
    createdAt : Date;

    @Expose()
    updatedAt : Date;

    @Expose()
    isFriend: boolean;
}

export class userValidateDTO{
    @IsOptional()
    @IsString()
    email : string;

    @IsOptional()
    @IsString()
    username : string;

    @IsOptional()
    @IsString()
    password : string;

    @IsOptional()
    @IsString()
    description? : string;

    @IsOptional()
    @IsString({ each: true })
    filesUpload: fileUpload[];

    @IsOptional()
    isFriend : boolean;
}