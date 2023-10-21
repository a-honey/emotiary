import { IError } from '../types/error';

/**
 * @param errorMessage
 * @param statusCode
 * @description 에러 생성 함수
 * @returns error
 */
export const generateError = (
  statusCode: number,
  errorMessage: string,
): IError => {
  const error: IError = new Error(errorMessage);
  error.statusCode = statusCode;
  return error;
};

//TODO statuscode 협의
