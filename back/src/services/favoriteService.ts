import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function searchFavorite(
    diary_id: string,
    user_id: string,
    ){
      try {
          const favorite = await prisma.favorite.findFirst({
              where: { diaryId: diary_id, userId: user_id }
          });
          return favorite;
      } catch(error) {
          throw error;
      }
    }

export async function addFavorite(
    diary_id: string,
    user_id: string,
    ){
      try {
          const favorite = await prisma.favorite.create({
              data: { diaryId: diary_id, userId: user_id }
          });
          return favorite;
      } catch(error) {
          throw error;
      }
    }

export async function deleteFavorite(
    diary_id: string,
    user_id: string,
    ){
      try {
          const favorite = await prisma.favorite.deleteMany({
              where: { diaryId: diary_id, userId: user_id }
          });
          return favorite;
      } catch(error) {
          throw error;
      }
    }



