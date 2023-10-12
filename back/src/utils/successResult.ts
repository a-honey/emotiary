import { ApiResponseDTO } from '../dtos/diaryDTO';

/**
 * @description 검색 결과가 존재할 때 DTO
 * @param responseData
 * @param status default 200
 * @returns new ApiResponseDTO(status, responseData, '성공');
 */
export const successApiResponseDTO = (
  responseData: any,
  status: number = 200,
) => {
  return new ApiResponseDTO(status, responseData, '성공');
};
