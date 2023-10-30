import { AxiosError } from 'axios';

// 사실 현재 탬플릿없음
export interface Error extends AxiosError {
  code: string;
}

export interface PaginationType {
  pageInfo: {
    totalItem: number;
    totalPage: number;
    currentPage: number;
    limit: number;
  };
}
