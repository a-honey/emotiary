// user.dto.ts
import { IsString, IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

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

export class PaginationResponseDTO extends ApiResponseDTO {
  pageInfo: any;
  currentPage: number;
  limit: number;
  totalItem: number;
  totalPage: number;

  constructor(status: number, data: any, pageInfo: any, message: string) {
    super(status, data, message);
    this.pageInfo = pageInfo;
    this.currentPage = pageInfo.currentPage;
    this.limit = pageInfo.limit;
    this.totalItem = pageInfo.totalItem;
    this.totalPage = pageInfo.totalPage;
  }
}

export class DiaryResponseDTO {
  @IsUUID()
  @Expose()
  id: string;

  @IsUUID()
  @Expose()
  authorId: string;

  @IsDate()
  @Expose()
  createdDate: Date;

  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  content: string;

  @IsString()
  @Expose()
  is_public: string;

  @IsString()
  @Expose()
  emoji: string;

  //TODO 질문) 이것도 client에 보내줘야할까요
  // @IsString()
  // @Expose()
  // createdAt: Date;

  // @IsString()
  // @Expose()
  // updatedAt: Date;
}

//TODO validator 작성하기
export class DiaryParamDTO {
  @IsUUID()
  id: string;

  @IsUUID()
  authorId: string;
}

export class DiaryInputDTO {
  @IsDate()
  createdDate: Date;

  @IsString()
  @IsNotEmpty({ message: '제목을 입력해주세요' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '내용을 입력해주세요' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: '공개범위를 설정해주세요' })
  is_public: string;

  @IsString()
  emoji: string;
}
