// user.dto.ts
import { IsString, IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import 'reflect-metadata';

export class ApiResponseDTO {
  data: any;
  message: string;
  status: number;

  constructor(status: number, data: any, message: string) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}
export class AuthorInFriendDTO {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  profileImage: string;
}

export class FriendResponseDTO {
  @Expose()
  id: string;

  @Expose()
  sentUserId : string;

  @Expose()
  receivedUserId: string;

  @Expose()
  status: boolean;

  @Expose()
  @Type(() => AuthorInFriendDTO)
  author: AuthorInFriendDTO;
}
