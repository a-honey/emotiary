import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const calculatePageInfo = async (limit: number, where: any) => {
  const totalItem = await prisma.diary.count({
    where,
  });

  const totalPage = Math.ceil(totalItem / limit);

  return { totalItem, totalPage };
};

export const calculatePageInfoForComment = async (
  limit: number,
  diary_id: string,
) => {
  const totalComment = await prisma.comment.count({
    where: { diaryId: diary_id, nestedComment: null },
  });

  const totalPage = Math.ceil(totalComment / limit);

  return { totalComment, totalPage };
}

export const userCalculatePageInfo = async (limit: number, where: any) => {
  const totalItem = await prisma.user.count({
    where,
  });

  const totalPage = Math.ceil(totalItem / limit);

  return { totalItem, totalPage };
};


export const calculatePageInfoForFriend = async (limit: number, where: any) => {
  const totalItem = await prisma.friend.count({
    where,
  });

  const totalPage = Math.ceil(totalItem / limit);

  return { totalItem, totalPage };
};