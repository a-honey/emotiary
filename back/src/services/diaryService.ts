import { PrismaClient, Prisma } from '@prisma/client';
import { checkFriend, getMyWholeFriends, weAreFriends } from './friendService';
import axios from 'axios';
import { Emoji, emojiMapping, Emotion } from '../types/emoji';
import { calculatePageInfo } from '../utils/pageInfo';
import { DiaryResponseDTO, PaginationResponseDTO } from '../dtos/diaryDTO';
import { plainToClass } from 'class-transformer';
import { successApiResponseDTO } from '../utils/successResult';
import { emptyApiResponseDTO } from '../utils/emptyResult';

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
  // const content = inputData.content;

  // const response = await axios.post('http://127.0.0.1:5000/predict', {
  //   text: content,
  // });

  // // const emotion = response.data.emoji;
  // const emotion = response.data;

  // const emotionType = emotion.emoji;
  // let emojiProperty: keyof Emoji = emojiMapping[emotion];

  // const emojis = await prisma.emoji.findMany({
  //   where: {
  //     type: emotionType, // 이모지 테이블의 감정 유형 필드에 따라 변경
  //   },
  // });

  // const randomEmoji: Emoji = emojis[Math.floor(Math.random() * emojis.length)];

  // emojiProperty = emojiMapping[emotionType] as keyof Emoji;

  // // inputData에 emoji 추가
  // inputData.emoji = String(randomEmoji[emojiProperty]);
  // // 여기까지 flask 테스트용용용

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

  const diaryResponseData = plainToClass(DiaryResponseDTO, diary, {
    excludeExtraneousValues: true,
  });

  const response = successApiResponseDTO(diaryResponseData);
  return response;
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

  // 다이어리 결과 없을 때 빈 배열 값 반환
  if (diaries.length == 0) {
    const response = emptyApiResponseDTO();
    return response;
  }

  const { totalItem, totalPage } = await calculatePageInfo(limit, {
    authorId: userId,
  });

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  const diaryResponseDataList = diaries.map((diary) =>
    plainToClass(DiaryResponseDTO, diary, { excludeExtraneousValues: true }),
  );

  const response = new PaginationResponseDTO(
    200,
    diaryResponseDataList,
    pageInfo,
    '성공',
  );

  return response;
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

  // 검색 결과 없을 때 빈배열
  if (diary.length == 0) {
    const response = emptyApiResponseDTO();
    return response;
  }

  const diaryResponseData = diary.map((diary) => {
    return plainToClass(DiaryResponseDTO, diary, {
      excludeExtraneousValues: true,
    });
  });
  const response = successApiResponseDTO(diaryResponseData);
  return response;
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

  if (diary == null) {
    const response = emptyApiResponseDTO();
    return response;
  }

  const friend = await checkFriend(userId, diary.authorId);
  // //내 글 일 경우
  // const isMyDiary = diary.authorId == userId;
  // // 친구 글이면서 공개범위 priavate아닌 것
  // const isFriendDiaryToLook = friend && diary.is_public != 'private';
  // // 공개 범위 all인것 (친구 비친구)
  // const isPublicDiary = diary.is_public == 'all';

  const isAccessible =
    diary.authorId == userId ||
    (friend && diary.is_public != 'private') ||
    diary.is_public == 'all';

  if (isAccessible) {
    const diaryResponseData = plainToClass(DiaryResponseDTO, diary, {
      excludeExtraneousValues: true,
    });
    const response = successApiResponseDTO(diaryResponseData);

    return response;
  }
  // private 일 경우
  const response = emptyApiResponseDTO();
  return response;

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
    return friend.receivedUserId;
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

  // 친구가 없거나 친구가 쓴 글이 없을 경우
  if (friendsDiary.length == 0) {
    const response = emptyApiResponseDTO();
    return response;
  }
  const diaryResponseDataList = friendsDiary.map((diary) =>
    plainToClass(DiaryResponseDTO, diary, { excludeExtraneousValues: true }),
  );

  // 총 글 개수, 페이지 수
  const { totalItem, totalPage } = await calculatePageInfo(limit, {
    NOT: {
      is_public: { contains: 'private' },
    },
    authorId: { in: friendIdList },
  });

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };

  const response = new PaginationResponseDTO(
    200,
    diaryResponseDataList,
    pageInfo,
    '성공',
  );

  return response;
};

// 모르는 유저의 공개범위 all 다이어리 가져오기
export const getAllDiaryService = async (
  userId: string,
  page: number,
  limit: number,
  select: string,
) => {
  const friends = await getMyWholeFriends(userId);

  const friendIdList = friends.map((friend) => {
    return friend.receivedUserId;
  });

  // 친구 글 + 모르는 사람의 all 글 포함
  const allDiary = await prisma.diary.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      OR: [
        {
          is_public: select,
          NOT: {
            authorId: userId,
          },
        },
        {
          NOT: {
            is_public: { contains: 'private' },
          },
          authorId: { in: friendIdList },
        },
      ],
    },
    include: { author: true },
    orderBy: { createdDate: 'desc' },
  });

  if (allDiary.length == 0) {
    const response = emptyApiResponseDTO();
    return response;
  }

  const diaryResponseDataList = allDiary.map((diary) =>
    plainToClass(DiaryResponseDTO, diary, { excludeExtraneousValues: true }),
  );

  const { totalItem, totalPage } = await calculatePageInfo(limit, {
    OR: [
      { is_public: select },
      {
        NOT: {
          is_public: { contains: 'private' },
        },
        authorId: { in: friendIdList },
      },
    ],
  });

  const pageInfo = { totalItem, totalPage, currentPage: page, limit };
  const response = new PaginationResponseDTO(
    200,
    diaryResponseDataList,
    pageInfo,
    '성공',
  );

  return response;
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

  if (updatedDiary == null) {
    const response = emptyApiResponseDTO();
    return response;
  }
  const diaryResponseData = plainToClass(DiaryResponseDTO, updatedDiary, {
    excludeExtraneousValues: true,
  });

  const response = successApiResponseDTO(diaryResponseData);
  return response;
};

export const deleteDiaryService = async (userId: string, diaryId: string) => {
  const deletedDiary = await prisma.diary.delete({
    where: { id: diaryId, authorId: userId },
  });

  const diaryResponseData = plainToClass(DiaryResponseDTO, deletedDiary, {
    excludeExtraneousValues: true,
  });

  const response = successApiResponseDTO(diaryResponseData);
  return response;
};

//TODO 같은 감정의 일기 보여주기
