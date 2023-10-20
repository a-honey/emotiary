import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function searchFavorite(diary_id: string, user_id: string) {
  try {
    const favorite = await prisma.favorite.findFirst({
      where: { diaryId: diary_id, userId: user_id },
    });
    return favorite;
  } catch (error) {
    throw error;
  }
}

export async function addFavorite(diary_id: string, user_id: string) {
  try {
    const favorite = await prisma.favorite.create({
      data: { diaryId: diary_id, userId: user_id },
    });

    //count 추가
    const favoriteCount = await countFavoriteByDiaryId(diary_id);

    await prisma.diary.update({
      where: { id: diary_id },
      data: {
        favoriteCount,
      },
    });
    return favorite;
  } catch (error) {
    throw error;
  }
}

export async function deleteFavorite(diary_id: string, user_id: string) {
  try {
    const favorite = await prisma.favorite.deleteMany({
      where: { diaryId: diary_id, userId: user_id },
    });

    //count 삭제
    const favoriteCount = await countFavoriteByDiaryId(diary_id);

    await prisma.diary.update({
      where: { id: diary_id },
      data: {
        favoriteCount,
      },
    });

    return favorite;
  } catch (error) {
    throw error;
  }
}

export const countFavoriteByDiaryId = async (diaryId: string) => {
  try {
    const favorite = await prisma.favorite.count({
      where: { diaryId },
    });

    return favorite;
  } catch (error) {
    throw error;
  }
};
