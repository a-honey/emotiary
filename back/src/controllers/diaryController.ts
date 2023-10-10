import { NextFunction, Response } from 'express';
import {
  createDiaryService,
  deleteDiaryService,
  getAllDiaryService,
  getDiaryByDiaryIdService,
  getDiaryByMonthService,
  getAllMyDiariesService,
  getFriendsDiaryServcie,
  updateDiaryService,
} from '../services/diaryService';
import { IRequest } from 'types/user';
import { plainToClass } from 'class-transformer';
import { DiaryResponseDTO, PaginationResponseDTO } from '../dtos/diaryDTO';
import { emptyApiResponseDTO } from '../utils/emptyResult';
import { successApiResponseDTO } from '../utils/successResult';
/**
 * 다이어리 생성
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const createDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const inputData = req.body;
    //authorId
    const { id: userId } = req.user;

    const createdDiary = await createDiaryService(userId, inputData);

    const diaryResponseData = plainToClass(DiaryResponseDTO, createdDiary, {
      excludeExtraneousValues: true,
    });

    const response = successApiResponseDTO(diaryResponseData);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * 내 글 가져오기
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getAllMyDiaries = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    //authorId
    const { id: userId } = req.user;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const myDiaries = await getAllMyDiariesService(userId, page, limit);

    // 다이어리 결과 없을 때 빈 배열 값 반환
    if (myDiaries == null) {
      const response = emptyApiResponseDTO();
      return res.status(response.status).json(response);
    }

    const diaryResponseDataList = myDiaries.data.map((diary) =>
      plainToClass(DiaryResponseDTO, diary, { excludeExtraneousValues: true }),
    );

    const PaginationResponseData = new PaginationResponseDTO(
      200,
      diaryResponseDataList,
      myDiaries.pageInfo,
      '성공',
    );

    return res.status(200).json(PaginationResponseData);
  } catch (error) {
    next(error);
  }
};

export const getDiaryByDate = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    //authorId
    const { userId } = req.params;
    const year = Number(req.query.year);
    const month = Number(req.query.month);
    const MonthlyDiary = await getDiaryByMonthService(userId, year, month);

    if (MonthlyDiary == null) {
      const response = emptyApiResponseDTO();
      return res.status(response.status).json(response);
    }

    const response = successApiResponseDTO(MonthlyDiary);
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
/**
 * 다이어리 하나 가져오기 (diaryId)
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getDiaryByDiaryId = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { diaryId } = req.params;
    const { id: userId } = req.user;
    const diary = await getDiaryByDiaryIdService(userId, diaryId);

    if (diary == null) {
      const response = emptyApiResponseDTO();
      return res.status(response.status).json(response);
    }

    const diaryResponseData = plainToClass(DiaryResponseDTO, diary, {
      excludeExtraneousValues: true,
    });

    const response = successApiResponseDTO(diaryResponseData);
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * 다른 유저(친구 or 모든 유저)의 다이어리 가져오기
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getOtherUsersDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId } = req.user;
    const { select } = req.query; // friend or all
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // diary 데이터 가져오기
    const otherUsersDiary =
      select == 'friend'
        ? await getFriendsDiaryServcie(userId, page, limit)
        : await getAllDiaryService(page, limit, select as string);

    // 검색 결과 null인 경우
    if (otherUsersDiary == null) {
      const response = emptyApiResponseDTO();
      return res.status(response.status).json(response);
    }

    const diaryResponseDataList = otherUsersDiary.data.map((diary) =>
      plainToClass(DiaryResponseDTO, diary, { excludeExtraneousValues: true }),
    );

    const PaginationResponseData = new PaginationResponseDTO(
      200,
      diaryResponseDataList,
      otherUsersDiary.pageInfo,
      '성공',
    );

    return res.status(200).json(PaginationResponseData);
  } catch (error) {
    next(error);
  }
};

export const updateDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId } = req.user;
    const { diaryId } = req.params;
    const inputData = req.body;
    const updatedDiary = await updateDiaryService(userId, diaryId, inputData);

    if (updatedDiary == null) {
      const response = emptyApiResponseDTO();
      return res.status(response.status).json(response);
    }

    const diaryResponseData = plainToClass(DiaryResponseDTO, updatedDiary, {
      excludeExtraneousValues: true,
    });

    const response = successApiResponseDTO(diaryResponseData);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { diaryId } = req.params;
    const { id: userId } = req.user;
    const deletedDiary = await deleteDiaryService(userId, diaryId);

    const diaryResponseData = plainToClass(DiaryResponseDTO, deletedDiary, {
      excludeExtraneousValues: true,
    });

    const response = successApiResponseDTO(diaryResponseData);

    return res.status(response.status).json(response);
  } catch (error) {
    //TODO ErrorGenerator 생성 후 status code랑 error.meta 동적으로 할당해주기
    console.log('!!!!!!!!!!!!!!!!!!!!!', error.meta);
    next(error);
  }
};
