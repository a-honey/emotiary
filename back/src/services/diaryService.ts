import { PrismaClient, Prisma } from "@prisma/client";
import { v4 } from "uuid";
import { getMyWholeFriends } from "./friendService";

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
  inputData: Prisma.DiaryCreateInput
) => {
  const diary = await prisma.diary.create({
    data: {
      ...inputData,
      id: v4(),
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

// TODO counting 중복 함수로 뺄 수 있으면 빼기
// const countItemPage = async (
//   tableName: keyof PrismaClient,
//   field: string,
//   searchKeyWord: string,
//   page: number
// ) => {
//   const totalItem = await prisma[tableName].count({
//     where: {
//       [field]: searchKeyWord,
//     },
//   });

//   const totalPage = Math.ceil(totalItem / page);

//   return { totalItem, totalPage };
// };

/**
 * 특정 유저의 다이어리 목록 가져오기
 * @param userId
 * @param page
 * @param limit
 * @returns diaries (limit 개수먄큼 반환)
 */
export const getDiaryByUserIdService = async (
  userId: string,
  page: number,
  limit: number
) => {
  const diaries = await prisma.diary.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: { authorId: userId },
  });
  const totalItem = await prisma.diary.count({
    where: { id: userId },
  });
  const totalPage = Math.ceil(totalItem / page);

  return {
    data: diaries,
    totalItem,
    totalPage,
    currentPage: page,
    limit: limit,
  };
};

/**
 * @description 월별로 다이어리
 * @param userId
 * @param month
 * @returns
 */
export const getDiaryByMonthService = async (userId: string, month: number) => {
  const diary = await prisma.diary.findMany({
    where: {
      authorId: userId,
      createdDate: {
        gte: new Date(`2023-${month}`),
        lt: new Date(`2023-${month + 1}`),
      },
    },
  });

  return diary;
};

// export const getDiaryByDateService = async (
//   userId: string,
//   month: number,
//   day: number
// ) => {
//   const diary = await prisma.diary.findMany({
//     where: {
//       authorId: userId,
//       createdDate: {
//         gte: new Date(`2023-${month}-${day}`),
//         lt: new Date(`2023-${month}-${day + 1}`),
//       },
//     },
//   });

//   return diary;
// };
/**
 * 다이어리 하나 가져오기
 * @param diaryId
 * @returns
 */
export const getDiaryByDiaryIdService = async (diaryId: string) => {
  const diary = await prisma.diary.findUnique({
    where: { id: diaryId },
  });

  return diary;
};

/**
 * @description 내 친구들의 다이어리 가져오기
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
  select: string
) => {
  // step1. 친구 목록 읽어오기

  const friends = await getMyWholeFriends(userId);
  const friendIdList = friends.map((friend) => {
    return friend.userBId;
  });
  console.log(friendIdList);

  // step2. 친구들의 다이어리 가져오기
  const friendsDiary = await prisma.diary.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      NOT: {
        is_public: { contains: "private" },
      },
      authorId: { in: friendIdList },
    },
    orderBy: { createdDate: "desc" },
  });

  const totalItem = await prisma.diary.count({
    where: {
      NOT: {
        is_public: { contains: "private" },
      },
      authorId: { in: friendIdList },
    },
  });

  const totalPage = Math.ceil(totalItem / limit);

  return { data: friendsDiary, totalPage, totalItem, currentPage: page, limit };
};

// 모든 유저의 다이어리 가져오기
export const getAllDiaryService = async (
  page: number,
  limit: number,
  select: string
) => {
  const allDiary = await prisma.diary.findMany({
    where: {
      is_public: select,
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalItem = await prisma.diary.count({
    where: {
      is_public: select,
    },
  });

  const totalPage = Math.ceil(totalItem / limit);
  return { data: allDiary, totalPage, totalItem, currentPage: page, limit };
};

export const updateDiaryService = async (
  diaryId: string,
  inputData: Prisma.DiaryUpdateInput
) => {
  const updatedDiary = await prisma.diary.update({
    where: { id: diaryId },
    data: inputData,
  });

  return updatedDiary;
};

//TODO 유저확인하고 delete하는 절차 추가
export const deleteDiaryService = async (diaryId: string) => {
  const deletedDiary = await prisma.diary.delete({
    where: { id: diaryId },
  });

  return deletedDiary;
};
