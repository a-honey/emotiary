import { Request } from 'express';

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  description: string | null;
  profileImage: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface IRequest extends Request {
  user: IUser | null;
  token: string;
  refreshTokens: string[];
}
