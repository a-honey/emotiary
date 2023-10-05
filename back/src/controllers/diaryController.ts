import { NextFunction, Request, Response } from "express";
import {
  createDiaryService,
  deleteDiaryService,
  getAllDiaryService,
  getDiaryByDiaryIdService,
  getDiaryByUserIdService,
  getFriendsDiaryServcie,
  updateDiaryService,
} from "../services/diaryService";

/**
 * 다이어리 생성
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const createDiary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inputData = req.body;
    const { userId } = req.params;
    const authorId = Number(userId);
    const createdDiary = await createDiaryService(authorId, inputData);

    return res.status(200).json(createdDiary);
  } catch (error) {
    next(error);
  }
};

/**
 * 특정 유저에 대한 다이어리 가져오기 (userId)
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getDiaryByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(req.params.userId);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const diary = await getDiaryByUserIdService(userId, page, limit);
  if (diary == null) return res.status(300).json([]);

  return res.status(200).json(diary);
};

/**
 * 다이어리 하나 가져오기 (diaryId)
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getDiaryByDiaryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { diaryId } = req.params;

    const diary = await getDiaryByDiaryIdService(diaryId);
    if (diary == null) return res.status(300).json([]);

    return res.status(200).json(diary);
  } catch (error) {
    next(error);
  }
};

export const getAllDiary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { select } = req.query; // friend or all
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const allDiary =
      select == "friend"
        ? await getFriendsDiaryServcie(userId, page, limit)
        : await getAllDiaryService(page, limit);

    if (allDiary == null) return res.status(300).json([]);

    return res.status(200).json(allDiary);
  } catch (error) {
    next(error);
  }
};

export const updateDiary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { diaryId } = req.params;
    const inputData = req.body;
    const updatedDiary = await updateDiaryService(diaryId, inputData);
    console.log(updatedDiary);
    return res.status(200).send(updatedDiary);
  } catch (error) {
    next(error);
  }
};

export const deleteDiary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { diaryId } = req.params;
    const deletedDiary = await deleteDiaryService(diaryId);

    return res.status(200).json(deletedDiary);
  } catch (error) {
    console.log(error.meta);
    next(error);
  }
};
