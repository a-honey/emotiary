import { ApiResponseDTO } from '../dtos/diaryDTO';

/**
 * @description 작성자가 아닐 경우 권한 없음의 DTO
 * @param status default 402
 * @returns new ApiResponseDTO(status, [], '작성자가 아니므로 수정/삭제가 불가합니다.');
 */
export const nonAuthorizedApiResponseDTO = (status: number = 402) => {
  return new ApiResponseDTO(
    status,
    [],
    '작성자가 아니므로 수정/삭제가 불가합니다.',
  );
};
