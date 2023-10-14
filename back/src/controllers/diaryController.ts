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
import { DiaryValidateDTO } from '../dtos/diaryDTO';
import { validate } from 'class-validator';

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
    const diaryInput = plainToClass(DiaryValidateDTO, inputData);

    // TODO 밸리데이터 수정 필요
    const errors = await validate(diaryInput);
    if (errors.length > 0) return res.status(400).json(errors);
    console.log('!!!!!!!!!!!!', errors);

    const { id: userId } = req.user;

    const createdDiary = await createDiaryService(userId, inputData);

    return res.status(createdDiary.status).json(createdDiary);
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

    return res.status(myDiaries.status).json(myDiaries);
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

    return res.status(MonthlyDiary.status).json(MonthlyDiary);
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

    return res.status(diary.status).json(diary);
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
        : await getAllDiaryService(userId, page, limit, select as string);

    return res.status(otherUsersDiary.status).json(otherUsersDiary);
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

    const diaryInput = plainToClass(DiaryValidateDTO, inputData);

    // TODO 밸리데이터 수정 필요
    const errors = await validate(diaryInput);
    if (errors.length > 0) return res.status(400).json(errors);
    console.log('!!!!!!!!!!!!', errors);
    const updatedDiary = await updateDiaryService(userId, diaryId, inputData);

    return res.status(updatedDiary.status).json(updatedDiary);
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

    return res.status(deletedDiary.status).json(deletedDiary);
  } catch (error) {
    //TODO ErrorGenerator 생성 후 status code랑 error.meta 동적으로 할당해주기
    console.log('!!!!!!!!!!!!!!!!!!!!!', error.meta);
    next(error);
  }
};
