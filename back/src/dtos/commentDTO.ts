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

export class AuthorInCommentDTO {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  profileImage: string;
}

// exclude 사용해주기
export class commentResponseDTO {
  @Expose()
  id: string;

  @Expose()
  authorId: string;

  @Expose()
  diaryId: string;

  @Expose()
  content: string;

  @Expose()
  nestedComment: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  reComment: string;

  @Expose()
  @Type(() => AuthorInCommentDTO)
  author: AuthorInCommentDTO;
}
