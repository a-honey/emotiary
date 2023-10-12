import { PrismaClient, Prisma } from '@prisma/client';
import { getMyWholeFriends, weAreFriends } from './friendService';
import axios from 'axios';
import { Emoji, emojiMapping, Emotion } from '../types/emoji';
import { calculatePageInfo } from '../utils/pageInfo';
import { countFavoriteByDiaryId } from './favoriteService';

const prisma = new PrismaClient();

/**
 * 다이어리 작성
 * @param title
 * @param content
 * @param authorId
 * @returns diary (새롭게 생성된 diary Object)
 */
export const createDiaryService = async (
  authorId: string,
  inputData: Prisma.DiaryCreateInput,
) => {
  // flask 테스트용
  const content = inputData.content;

  const response = await axios.post('http://127.0.0.1:5000/predict', {
    text: content,
  });

  // const emotion = response.data.emoji;
  const emotion = response.data;

  const emotionType = emotion.emoji;
  let emojiProperty: keyof Emoji = emojiMapping[emotion];

  const emojis = await prisma.emoji.findMany({
    where: {
      type: emotionType, // 이모지 테이블의 감정 유형 필드에 따라 변경
    },
  });

  const randomEmoji: Emoji = emojis[Math.floor(Math.random() * emojis.length)];

  emojiProperty = emojiMapping[emotionType] as keyof Emoji;

  // inputData에 emoji 추가
  inputData.emoji = String(randomEmoji[emojiProperty]);
  // 여기까지 flask 테스트용용용

  const diary = await prisma.diary.create({
    data: {
      ...inputData,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
    include: {
      author: true,
    },
  });

  return diary;
};

/**
 * 내 글 가져오기
 * @param userId
 * @param page
 * @param limit
 * @returns diaries (limit 개수먄큼 반환)
 */
export const getAllMyDiariesService = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const diaries = await prisma.diary.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: { authorId: userId },
    orderBy: { createdDate: 'desc' },
  });

  const { totalItem, totalPage } = await calculatePageInfo(limit, {
    authorId: userId,
  });

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  return {
    data: diaries,
    pageInfo,
  };
};

/**
 * @description 월별로 다이어리
 * @param userId
 * @param month
 * @returns
 */
export const getDiaryByMonthService = async (
  userId: string,
  year: number,
  month: number,
) => {
  const ltMonth = month == 12 ? 1 : month + 1;
  const ltYear = month == 12 ? year + 1 : year;

  const diary = await prisma.diary.findMany({
    where: {
      authorId: userId,
      createdDate: {
        gte: new Date(`${year}-${month}`),
        lt: new Date(`${ltYear}-${ltMonth}`),
      },
    },
    include: { author: true },
    orderBy: { createdDate: 'asc' },
  });

  return diary;
};

/**
 * 다이어리 하나 가져오기
 * @param diaryId
 * @returns
 */
export const getDiaryByDiaryIdService = async (
  userId: string,
  diaryId: string,
) => {
  const diary = await prisma.diary.findUnique({
    where: { id: diaryId },
    include: { author: true },
  });

  if (diary == null) return null;
  //TODO 좋아요 가져오기
  const favorite = await countFavoriteByDiaryId(diaryId);

  console.log(favorite);
  //내 글 일 경우 Done
  if (diary.authorId == userId) {
    return diary;
  }

  // 친구 (friend.status == true)
  // 친구 X 1. friend.status ==false  2. friend == null
  //친구 글 일 경우
  const friend = await weAreFriends(userId, diary.authorId);

  if (friend) {
    // 친구인 경우
    if (friend.status && diary.is_public != 'private') return diary;

    // 친구 신청 O 친구는 아님
    if (!friend.status && diary.is_public == 'all') return diary;
  }

  if (friend == null && diary.is_public == 'all') return diary;

  return null;
  // 모르는 사람 글 일 경우
};

/**
 * @description 내 친구들의 다이어리 가져오기 (최신순)
 * @param userId (로그인 한 유저의 userId)
 * @param page
 * @param limit
 * @param select
 * @returns
 */
export const getFriendsDiaryServcie = async (
  userId: string,
  page: number,
  limit: number,
) => {
  // 친구 목록 읽어오기
  const friends = await getMyWholeFriends(userId);
  const friendIdList = friends.map((friend) => {
    return friend.userBId;
  });

  // 친구들의 다이어리 가져오기 (최신순)
  const friendsDiary = await prisma.diary.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      NOT: {
        is_public: { contains: 'private' },
      },
      authorId: { in: friendIdList },
    },
    include: { author: true },
    orderBy: { createdDate: 'desc' },
  });

  const { totalItem, totalPage } = await calculatePageInfo(limit, {
    NOT: {
      is_public: { contains: 'private' },
    },
    authorId: { in: friendIdList },
  });

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  return { data: friendsDiary, pageInfo };
};

// 모든 유저의 다이어리 가져오기
export const getAllDiaryService = async (
  page: number,
  limit: number,
  select: string,
) => {
  const allDiary = await prisma.diary.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      is_public: select,
    },
    include: { author: true },
    orderBy: { createdDate: 'desc' },
  });
  const { totalItem, totalPage } = await calculatePageInfo(limit, {
    is_public: select,
  });

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };
  return { data: allDiary, pageInfo };
};

export const updateDiaryService = async (
  userId: string,
  diaryId: string,
  inputData: Prisma.DiaryUpdateInput,
) => {
  const updatedDiary = await prisma.diary.update({
    where: { id: diaryId, authorId: userId },
    data: inputData,
  });

  return updatedDiary;
};

export const deleteDiaryService = async (userId: string, diaryId: string) => {
  const deletedDiary = await prisma.diary.delete({
    where: { id: diaryId, authorId: userId },
  });

  return deletedDiary;
};
