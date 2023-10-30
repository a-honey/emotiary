import { prisma } from '../../prisma/prismaClient';
import { PrismaClient } from '@prisma/client';

export const calculatePageInfo = async (
  tableName: keyof PrismaClient,
  limit: number,
  where: any,
) => {
  const totalItem = await (prisma[tableName] as any).count({
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
};

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
