import { inputAI } from './comment';
import { IUser } from './user';
import { Request } from 'express';

export interface IRequest extends Request {
  user: IUser | null;
  token: string;
  refreshTokens: string[];
  expiresAt: number;
  inputAI: inputAI;
}
