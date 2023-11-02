import { prisma } from '../../prisma/prismaClient';
import { PrismaClient } from '@prisma/client';

/**
 *
 * @param tableName
 * @param limit
 * @param where
 * @returns
 */
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
