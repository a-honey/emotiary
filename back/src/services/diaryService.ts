import { PrismaClient, Prisma } from "@prisma/client";
import { v4 } from "uuid";
import { getMyWholeFriends, weAreFriends } from "./friendService";

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
  limit: number
) => {
  const diaries = await prisma.diary.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: { authorId: userId },
  });
  const totalItem = await prisma.diary.count({
    where: { authorId: userId },
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
export const getDiaryByMonthService = async (
  userId: string,
  year: number,
  month: number
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
  diaryId: string
) => {
  const diary = await prisma.diary.findUnique({
    where: { id: diaryId },
  });

  //내 글 일 경우 Done
  if (diary.authorId == userId) {
    return diary;
  }

  // 친구 (friend.status == true)
  // 친구 X 1. friend.status ==false  2. friend == null
  //친구 글 일 경우
  const friend = await weAreFriends(userId, diary.authorId);

  // const isFriend = friend.status;
  if (friend) {
    // 친구인 경우
    if (friend.status && diary.is_public != "private") return diary;

    // 친구 신청 O 친구는 아님
    if (!friend.status && diary.is_public == "all") return diary;
  }

  if (friend == null && diary.is_public == "all") return diary;

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
  limit: number
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

//TODO 유저확인하고 update하는 절차 추가
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

//TODO 검색 결과 없을 시
export const deleteDiaryService = async (userId: string, diaryId: string) => {
  const diary = await prisma.diary.findUnique({
    where: { id: diaryId },
  });

  if (diary.authorId == userId) {
    const deletedDiary = await prisma.diary.delete({
      where: { id: diaryId },
    });

    return deletedDiary;
  }

  if (diary.authorId != userId) {
    //TODO 에러 수정
    throw new Error("회원 불일치");
  }
};
