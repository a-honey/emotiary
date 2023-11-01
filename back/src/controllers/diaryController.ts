import { NextFunction, Response } from 'express';
import {
  createDiaryService,
  deleteDiaryService,
  getAllDiaryService,
  getOneDiaryService,
  getDiaryByMonthService,
  getAllMyDiariesService,
  updateDiaryService,
  getFriendsDiaryService,
  mailService,
  selectedEmojis,
  searchDiaryService,
  getDiaryByDateService,
  verifyDiaryAuthor,
  getEmotionOftheMonthService,
} from '../services/diaryService';
import { IRequest } from 'types/user';
import { plainToClass } from 'class-transformer';
import { DiaryValidateDTO } from '../dtos/diaryDTO';
import { validate } from 'class-validator';
import { generateError } from '../utils/errorGenerator';
import { getMyWholeFriends } from '../services/friendService';
import {
  createdGPTComment,
  updatedGPTComment,
} from '../services/commentService';

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
  const fileUrls = res.locals.myData;
  const {
    body: inputData,
    user: { id: userId },
  } = req;

  const { createdDate } = inputData;

  // 해당 날짜에 다이어리 존재하는지 체크
  const checkExistedDiary = await getDiaryByDateService(userId, createdDate);

  if (checkExistedDiary) {
    console.log('이미 존재하지롱');
    return res.json('이미 존재하는 다이어리가 있어용 메롱 ');
  }
  const diaryInput = plainToClass(DiaryValidateDTO, inputData);

  // TODO 밸리데이터 수정 필요
  const errors = await validate(diaryInput);

  //TODO 추루 수정
  if (errors.length > 0) {
    const errorMessages = errors.map((error) => {
      return error.constraints;
    });
  }

  const createdDiary = await createDiaryService(userId, inputData, fileUrls);
  console.log(createDiary);

  // 일기 작성시 chatGPT를 활용한 댓글 한마디 추가
  createdGPTComment(inputData.content, userId, createdDiary.data.id);

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
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 8;

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
  const year = parseInt(req.query.year as string);
  const month = parseInt(req.query.month as string);
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
export const getOneDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const {
    params: { diaryId },
    user: { id: userId },
  } = req;

  const diary = await getOneDiaryService(userId, diaryId);

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
  /**
   * #swagger.tags = ['Diary']
   * #swagger.summary = '친구 요청'
   */
  const {
    query: { select, emotion },
    user: { id: userId },
  } = req;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 8;

  //친구목록 가져오기
  const friends = await getMyWholeFriends(userId);

  const friendIdList = friends.map((friend) => {
    return userId == friend.sentUserId
      ? friend.receivedUserId
      : friend.sentUserId;
  });

  // diary 데이터 가져오기
  const otherUsersDiary =
    select == 'friend'
      ? await getFriendsDiaryService(
          page,
          limit,
          emotion as string,
          friendIdList,
        )
      : await getAllDiaryService(
          userId,
          page,
          limit,
          emotion as string,
          friendIdList,
        );

  return res.status(otherUsersDiary.status).json(otherUsersDiary);
};

/**
 * @description 다이어리 업데이트
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const updateDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const {
    body: inputData,
    params: { diaryId },
    user: { id: userId },
  } = req;
  const { deleteData, ...updatedData } = inputData;

  await verifyDiaryAuthor(diaryId, userId);

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

  updatedGPTComment(inputData.content, userId, diaryId);

  return res.status(updatedDiary.status).json(updatedDiary);
};

/**
 * @description 다이어리 삭제
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const deleteDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const {
    params: { diaryId },
    user: { id: userId },
  } = req;

  await verifyDiaryAuthor(diaryId, userId);

  const deletedDiary = await deleteDiaryService(userId, diaryId);

  return res.status(deletedDiary.status).json(deletedDiary);
};

export const sendRecommendationEmail = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const { diaryId } = req.params;
  const { username } = req.user;
  const { friendEmail } = req.body;

  const sendMail = await mailService(friendEmail, diaryId, username);

  return res.status(sendMail.status).json(sendMail);
};

export const selectEmotion = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const { diaryId } = req.params;
  const { id: userId } = req.user;
  const { selectedEmotion, selectedEmoji } = req.body;

  await verifyDiaryAuthor(diaryId, userId);

  const updatedDiary = await selectedEmojis(
    selectedEmotion,
    selectedEmoji,
    diaryId,
    userId,
  );

  return res.status(updatedDiary.status).json(updatedDiary);
};

/**
 * @description 다이어리 검색 기능
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const searchDiary = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const {
    user: { id: userId },
  } = req;

  const friends = await getMyWholeFriends(userId);

  const friendIdList = friends.map((friend) => {
    return userId == friend.sentUserId
      ? friend.receivedUserId
      : friend.sentUserId;
  });

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 8;
  const { search } = req.body;
  const searchDiary = await searchDiaryService(
    userId,
    search,
    page,
    limit,
    friendIdList,
  );

  return res.status(200).json(searchDiary);
};

export const getEmotionOftheMonth = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const {
    user: { id: userId },
  } = req;
  const year = parseInt(req.query.year as string);
  const month = parseInt(req.query.month as string);
  const emotion = await getEmotionOftheMonthService(userId, year, month);

  return res.status(200).json(emotion);
};
