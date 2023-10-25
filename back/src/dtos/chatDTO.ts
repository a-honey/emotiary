// // user.dto.ts
// import { IsString, IsDate, IsNotEmpty, IsUUID } from 'class-validator';
// import { Exclude, Expose, Type } from 'class-transformer';
// import 'reflect-metadata';
//
// export class ApiResponseDTO {
//   data: any;
//   message: string;
//   status: number;
//
//   constructor(status: number, data: any, message: string) {
//     this.data = data;
//     this.message = message;
//     this.status = status;
//   }
// }
//
// export class AuthorInChatDTO {
//   @Expose()
//   id: string;
//
//   @Expose()
//   username: string;
//
//   @Expose()
//   profileImage: string;
// }
//
// // exclude 사용해주기
// export class ChatResponseDTO {
//   @Expose()
//   id: string;
//
//   @Expose()
//   roomId: string;
//
//   @Expose()
//   sendUserId: string;
//
//   @Expose()
//   message: string;
//
//   @Expose()
//   createdAt: Date;
//
//   @Expose()
//   isRead: boolean;
//
//
//   @Expose()
//   @Type(() => AuthorInChatDTO)
//   author: AuthorInChatDTO;
// }