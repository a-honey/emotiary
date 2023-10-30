import { NextFunction, Response } from 'express';
import {
  createDiaryService,
  deleteDiaryService,
  getAllDiaryService,
  getDiaryByDiaryIdService,
  getDiaryByMonthService,
  getAllMyDiariesService,
  updateDiaryService,
  getFriendsDiaryService,
  mailService,
  selectedEmoji,
  searchDiaryService,
} from '../services/diaryService';
import { IRequest } from 'types/user';
import { plainToClass } from 'class-transformer';
import { DiaryValidateDTO } from '../dtos/diaryDTO';
import { validate } from 'class-validator';
import { generateError } from '../utils/errorGenerator';

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
  // const fileUrls = res.locals.myData;
  const fileUrls = ['test'];

  // const { emoji,...inputData } = req.body;
  const inputData = req.body;

  const diaryInput = plainToClass(DiaryValidateDTO, inputData);

  // TODO 밸리데이터 수정 필요
  const errors = await validate(diaryInput);

  //TODO 추루 수정
  if (errors.length > 0) {
    const errorMessages = errors.map((error) => {
      return error.constraints;
    });
  }

  //throw generateError(400, errors[0].constraints);
  // console.log('!!!!!!!!!!!!', errors[0].constraints);

  const { id: userId } = req.user;

  const createdDiary = await createDiaryService(userId, inputData, fileUrls);
  console.log(createDiary);
  return res.status(createdDiary.status).json(createdDiary);
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
  //authorId
  const { id: userId } = req.user;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;

  const myDiaries = await getAllMyDiariesService(userId, page, limit);

  return res.status(myDiaries.status).json(myDiaries);
};

export const getDiaryByDate = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  //authorId
  const { userId } = req.params;
  const year = Number(req.query.year);
  const month = Number(req.query.month);
  const MonthlyDiary = await getDiaryByMonthService(userId, year, month);

  return res.status(MonthlyDiary.status).json(MonthlyDiary);
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
  const { diaryId } = req.params;
  const { id: userId } = req.user;
  const diary = await getDiaryByDiaryIdService(userId, diaryId);

  return res.status(diary.status).json(diary);
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
  const { id: userId } = req.user;
  const { select } = req.query; // friend or all
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const { emotion } = req.query;
  // diary 데이터 가져오기

  const otherUsersDiary =
    select == 'friend'
      ? await getFriendsDiaryService(userId, page, limit, emotion as string)
      : await getAllDiaryService(userId, page, limit, emotion as string);
  return res.status(otherUsersDiary.status).json(otherUsersDiary);
};

export const updateDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId } = req.user;
  const { diaryId } = req.params;
  const inputData = req.body;
  const { deleteData, ...updatedData } = inputData;
  const diaryInput = plainToClass(DiaryValidateDTO, updatedData);

  // TODO 밸리데이터 수정 필요
  const errors = await validate(diaryInput);
  // const errorMessages = [];
  if (errors.length > 0) {
    console.log('!!!!!!!!!!!!', errors[0].constraints);
    // errorMessages = errors.map((error) => {
    //   return error.constraints;
    // });
  }
  // throw generateError(400, errors[0].constraints?.isString);
  // return res.status(400).json(errors);
  const updatedDiary = await updateDiaryService(userId, diaryId, updatedData);

  return res.status(updatedDiary.status).json(updatedDiary);
};

export const deleteDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const { diaryId } = req.params;
  const { id: userId } = req.user;
  const deletedDiary = await deleteDiaryService(userId, diaryId);

  return res.status(deletedDiary.status).json(deletedDiary);
};

export const sendRecommendationEmail = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { diaryId } = req.params;
    const { username } = req.user;
    const { friendEmail } = req.body;

    const sendMail = await mailService(friendEmail, diaryId, username);

    return res.status(sendMail.status).json(sendMail);
  } catch (error) {
    next(error);
  }
};

export const selectEmotion = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { diaryId } = req.params;
    const { id: userId } = req.user;
    const { selectedEmotion } = req.body;

    const updatedDiary = await selectedEmoji(selectedEmotion, diaryId, userId);

    return res.status(updatedDiary.status).json(updatedDiary);
  } catch (error) {
    next(error);
  }
};

export const searchDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const search = req.body;
  const searchDiary = await searchDiaryService(search);

  return res.status(200).json(searchDiary);
};
