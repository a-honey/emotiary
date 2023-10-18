import { Request } from "express";

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  description: string | null;
  filesUpload: fileUpload[];
  updatedAt: Date;
  createdAt: Date;
  // isFriend : Boolean;
}

export interface fileUpload {
  url: string;
  user?: string;
  userId?: string;
  createdAt?: Date;
}

export interface IRequest extends Request {
  user: IUser | null;
  token: string;
  refreshTokens: string[];
}
