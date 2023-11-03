import { Request } from 'express';

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  description: string | null;
  profileImage: fileUpload[];
  updatedAt: Date;
  createdAt: Date;
  isFriend: Boolean;
}

export interface fileUpload {
  id?: number;
  url?: string;
  userId?: string;
  createdAt?: Date;
}
