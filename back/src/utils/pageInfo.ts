import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const calculatePageInfo = async (limit: number, where: any) => {
  const totalItem = await prisma.diary.count({
    where,
  });

  const totalPage = Math.ceil(totalItem / limit);

  return { totalItem, totalPage };
};
