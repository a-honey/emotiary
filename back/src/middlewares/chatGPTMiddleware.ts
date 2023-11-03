import { NextFunction, Response, Request } from 'express';
import { prisma } from '../../prisma/prismaClient';
import { getOneDiaryService } from '../services/diaryService';
import { callChatGPT } from '../utils/chatGPT';
import { IRequest } from 'types/request';

export const createdGPTCommentMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const { content, userId: authorId, diaryId } = req.inputAI;
  const testChatGPT = await callChatGPT(content);
  const checkDiary = await getOneDiaryService(authorId, diaryId);

  if (checkDiary.data.length != 0) {
    await prisma.comment.create({
      data: {
        diaryId,
        authorId: process.env.AI_ID,
        content: testChatGPT,
        writeAi: authorId,
      },
    });
  }
};
