import { Prisma, PrismaClient } from '@prisma/client';
import { checkFriend, getMyWholeFriends, weAreFriends } from './friendService';
import axios from 'axios';
import { Emoji } from '../types/emoji';
import { calculatePageInfo } from '../utils/pageInfo';
import { DiaryResponseDTO, PaginationResponseDTO } from '../dtos/diaryDTO';
import { plainToClass } from 'class-transformer';
import { successApiResponseDTO } from '../utils/successResult';
import { emptyApiResponseDTO } from '../utils/emptyResult';
import { diaryUpload } from '../middlewares/uploadMiddleware';
import { sendEmail } from '../utils/email';
import { searchMusic } from '../utils/music';
import ytdl from 'ytdl-core';

import { generateError } from '../utils/errorGenerator';
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
  fileUrls: string[],
) => {
  const responseData = await axios.post(
    'http://kdt-ai-8-team02.elicecoding.com:5000/predict/diary',
    {
      text: inputData.content,
    },
  );
  console.log(responseData.data.emotion);
  const labels = responseData.data.emotion.map(
    (item: { label: string }) => item.label,
  );

  const emotionString = labels.join(',');

  inputData.emotion = emotionString;

  inputData.emoji = '❎';

  const diaryData = {
    ...inputData,
    author: {
      connect: {
        id: authorId,
      },
    },
  };

  // fileUrls 배열에 데이터가 있는 경우에만 filesUpload를 추가
  if (fileUrls && fileUrls.length > 0) {
    diaryData.filesUpload = {
      create: fileUrls.map((url) => ({
        url,
      })),
    };
  }

  const diary = await prisma.diary.create({
    data: diaryData,
    include: {
      author: true,
      filesUpload: true,
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
    include: {
      filesUpload: true,
    },
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
    include: { author: true, filesUpload: true },
  });

  if (diary == null) {
    const response = emptyApiResponseDTO();
    return response;
  }

  const friend = await checkFriend(userId, diary.authorId);

  const isAccessible =
    diary.authorId == userId || // 내글인 경우
    (friend && diary.is_public != 'private') || // 친구 글 (비공개 제외)
    diary.is_public == 'all'; // 모르는 사람 글 (전체공개만)

  if (isAccessible) {
    const diaryResponseData = plainToClass(DiaryResponseDTO, diary, {
      excludeExtraneousValues: true,
    });
    const response = successApiResponseDTO(diaryResponseData);

    return response;
  }
  //내 글이 아닌데 private일 경우
  const response = emptyApiResponseDTO();
  return response;
};

/**
 * @description 내 친구들의 다이어리 가져오기 (최신순)
 * @param userId (로그인 한 유저의 userId)
 * @param page
 * @param limit
 * @param select
 * @returns
 */
export const getFriendsDiaryService = async (
  userId: string,
  page: number,
  limit: number,
  emotion: string | undefined,
) => {
  // 친구 목록 읽어오기
  const friends = await getMyWholeFriends(userId);

  const friendIdList = friends.map((friend) => {
    return userId == friend.sentUserId
      ? friend.receivedUserId
      : friend.sentUserId;
  });

  const friendsDiaryQuery = {
    where: {
      // 친구 글 (비공개 제외)
      authorId: { in: friendIdList },
      NOT: [
        {
          is_public: 'private',
        },
      ],
    },
    skip: (page - 1) * limit,
    take: limit,
    include: { author: true },
  };

  if (emotion != 'all') {
    (friendsDiaryQuery.where as any).emotion = emotion;
  }

  // 친구들의 다이어리 가져오기 (최신순)
  const friendsDiary = await prisma.diary.findMany({
    ...friendsDiaryQuery,
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
  const { totalItem, totalPage } = await calculatePageInfo(
    limit,
    friendsDiaryQuery.where,
  );

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
  emotion: string,
) => {
  //TODO controller로 넘기기 refactoring
  const friends = await getMyWholeFriends(userId);

  const friendIdList = friends.map((friend) => {
    return userId == friend.sentUserId
      ? friend.receivedUserId
      : friend.sentUserId;
  });

  const allDiaryQuery = {
    skip: (page - 1) * limit,
    take: limit,
    where: {
      OR: [
        {
          // 전체공개 다이어리 ( 내 글 제외 )
          is_public: 'all',
          NOT: {
            authorId: userId,
          },
        },
        {
          // 친구 글 (비공개 제외)
          NOT: {
            is_public: 'private',
          },
          authorId: { in: friendIdList },
        },
      ],
    },
    include: { author: true },
  };

  if (emotion != 'all') (allDiaryQuery.where as any).emotion = emotion;

  // 친구 글 + 모르는 사람의 all 글 포함
  const allDiary = await prisma.diary.findMany({
    ...allDiaryQuery,
    orderBy: { createdDate: 'desc' },
  });

  if (allDiary.length == 0) {
    const response = emptyApiResponseDTO();
    return response;
  }

  const diaryResponseDataList = allDiary.map((diary) =>
    plainToClass(DiaryResponseDTO, diary, { excludeExtraneousValues: true }),
  );

  const { totalItem, totalPage } = await calculatePageInfo(
    limit,
    allDiaryQuery.where,
  );

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
  if (inputData.content) {
    const responseData = await axios.post(
      'http://kdt-ai-8-team02.elicecoding.com:5000/predict/diary',
      {
        text: inputData.content,
      },
    );
    const labels = responseData.data.emotion.map(
      (item: { label: string }) => item.label,
    );

    const emotionString = labels.join(',');

    inputData.emotion = emotionString;

    inputData.emoji = '❎';
  }

  const updatedDiary = await prisma.diary.update({
    where: { id: diaryId, authorId: userId },
    data: inputData,
    include: {
      filesUpload: true,
    },
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

export const mailService = async (
  friendEmail: string,
  diaryId: string,
  username: string,
) => {
  const diary = await prisma.diary.findUnique({
    where: {
      id: diaryId, // diaryId를 사용하여 다이어리를 식별
    },
  });

  if (!diary) {
    // 다이어리를 찾을 수 없을 때의 처리
    console.error('다이어리를 찾을 수 없습니다.');
    return;
  }
  const currentUrl = `http://localhost:5001`;
  await sendEmail(
    friendEmail,
    `추천 유저: ${username}`,
    `다음 다이어리를 추천드립니다: ${currentUrl}`,
    ``,
  );
  const response = successApiResponseDTO(null);
  return response;
};

export const selectedEmoji = async (
  selectedEmotion: string,
  diaryId: string,
  userId: string,
) => {
  const emojis = await prisma.emoji.findMany({
    where: {
      type: selectedEmotion,
    },
  });
  console.log(emojis);
  const emotionType = selectedEmotion;
  const musicData = await searchMusic(emotionType);
  const videoId = musicData.videoId;

  const info = await ytdl.getInfo(videoId);
  // 오디오 스트림 URL 가져오기
  const audioUrl = ytdl.chooseFormat(info.formats, { filter: 'audioonly' }).url;
  const urlLength = audioUrl.length;
  console.log(audioUrl);
  console.log(`URL 길이: ${urlLength} 자`);
  if (!musicData) {
    const errorMessage = '음악데이터가없습니다.';
    throw errorMessage;
  }

  const randomEmoji: Emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const emoji = randomEmoji.emotion;

  const updatedDiary = await prisma.diary.update({
    where: { id: diaryId, authorId: userId },
    data: { emoji, audioUrl },
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

export const searchDiaryService = async (title: string, content: string) => {
  const words = content.split(' ');
  const modifiedWords = words.map((word) => {
    return `${word}*`;
  });
  //TODO elastic search 찾아보기
  const queryContent: string = modifiedWords.join(' ');
  console.log(queryContent);
  const searchedDiary = await prisma.diary.findMany({
    where: {
      content: {
        search: queryContent,
      },
    },
  });
  return searchedDiary;
};
