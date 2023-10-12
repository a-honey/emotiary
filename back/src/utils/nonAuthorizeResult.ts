import { ApiResponseDTO } from '../dtos/diaryDTO';

/**
 * @description 검색 결과가 없을 때 DTO
 * @param status default 300
 * @returns new ApiResponseDTO(status, [], '검색결과가 없습니다.');
 */
export const nonAuthorizedApiResponseDTO = (status: number = 402) => {
  return new ApiResponseDTO(status, [], '작성자가 아니므로 수정이 불가합니다.');
};
