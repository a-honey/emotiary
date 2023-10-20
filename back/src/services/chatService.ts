import { PrismaClient } from '@prisma/client';
import {ChatResponseDTO} from '../dtos/chatDTO';
import { plainToClass } from 'class-transformer';
import { successApiResponseDTO } from '../utils/successResult';
import { emptyApiResponseDTO } from '../utils/emptyResult';
const prisma = new PrismaClient();


// export const myEmotion = async (userId: string, requestId: string) => {
//   try {
//     const emotion = await prisma.friend.findUnique({
//       where: {
//       },
//     });
//     return emotion;
//   } catch (error) {
//     throw error;
//   }
// };