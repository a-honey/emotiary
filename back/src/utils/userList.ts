import { PrismaClient } from '@prisma/client';

export const usersList = async (
  page: number,
  pageSize: number,
  prisma: PrismaClient,
) => {
  const userIds = await prisma.user.findMany({ select: { id: true } });
  const userIdList = userIds.map((user) => user.id);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const batchIds = userIdList.slice(startIndex, endIndex);

  const users = await prisma.user.findMany({
    where: {
      id: { in: batchIds },
    },
    include: {
      profileImage: true,
    },
  });

  return users;
};
