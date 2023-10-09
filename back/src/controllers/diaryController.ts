import { NextFunction, Response } from "express";
import {
  createDiaryService,
  deleteDiaryService,
  getAllDiaryService,
  getDiaryByDiaryIdService,
  getDiaryByMonthService,
  getAllMyDiariesService,
  getFriendsDiaryServcie,
  updateDiaryService,
} from "../services/diaryService";
import { IRequest } from "types/user";

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
  next: NextFunction
) => {
  try {
    const inputData = req.body;
    const { id: userId } = req.user;

    const createdDiary = await createDiaryService(userId, inputData);

    return res.status(200).json(createdDiary);
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
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const diary = await getAllMyDiariesService(userId, page, limit);
    if (diary == null) return res.status(300).json([]);

    return res.status(200).json(diary);
  } catch (error) {
    next(error);
  }
};

export const getDiaryByDate = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const year = Number(req.query.year);
    const month = Number(req.query.month);
    const diary = await getDiaryByMonthService(userId, year, month);

    return res.status(200).json(diary);
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
  next: NextFunction
) => {
  try {
    const { diaryId } = req.params;
    const { id: userId } = req.user;
    const diary = await getDiaryByDiaryIdService(userId, diaryId);
    if (diary == null) return res.status(300).json([]);

    return res.status(200).json(diary);
  } catch (error) {
    next(error);
  }
};

export const getUsersDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user;
    const { select } = req.query; // friend or all
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const allDiary =
      select == "friend"
        ? await getFriendsDiaryServcie(userId, page, limit)
        : await getAllDiaryService(page, limit, select as string);

    if (allDiary == null) return res.status(300).json([]);

    return res.status(200).json(allDiary);
  } catch (error) {
    next(error);
  }
};

export const updateDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { diaryId } = req.params;
    const inputData = req.body;
    const updatedDiary = await updateDiaryService(diaryId, inputData);
    return res.status(200).send(updatedDiary);
  } catch (error) {
    next(error);
  }
};

export const deleteDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { diaryId } = req.params;
    const { id: userId } = req.user;
    const deletedDiary = await deleteDiaryService(userId, diaryId);

    return res.status(200).json(deletedDiary);
  } catch (error) {
    console.log(error.meta);
    next(error);
  }
};
