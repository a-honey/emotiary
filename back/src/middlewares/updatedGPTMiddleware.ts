import { NextFunction, Response } from 'express';
import { prisma } from '../../prisma/prismaClient';
import { createdGPTComment } from '../services/commentService';
import { IRequest } from 'types/request';
import { callChatGPT } from '../utils/chatGPT';

export const updatedGPTComment = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const { content, userId: authorId, diaryId } = req.inputAI;
  const testChatGPT = await callChatGPT(content);

  const comment = await prisma.comment.updateMany({
    where: { diaryId, writeAi: authorId },
    data: {
      content: testChatGPT,
    },
  });

  if (comment.count == 0) {
    await createdGPTComment(testChatGPT, authorId, diaryId);
  }
};
