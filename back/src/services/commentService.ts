import { plainToClass } from 'class-transformer';
import { commentResponseDTO, PaginationResponseDTO } from '../dtos/commentDTO';
import { emptyApiResponseDTO } from '../utils/emptyResult';
import { successApiResponseDTO } from '../utils/successResult';
import { nonAuthorizedApiResponseDTO } from '../utils/nonAuthorizeResult';
import axios from 'axios';
import { Emoji } from '../types/emoji';
import { calculatePageInfoForComment } from '../utils/pageInfo';
import { prisma } from '../../prisma/prismaClient';
import { callChatGPT } from '../utils/chatGPT';
import dotenv from 'dotenv';
dotenv.config();

//댓글 작성
export async function createdComment(
  inputData: {
    content: string;
    nestedComment: string; // 댓글(null)인지 대댓글(원댓글의 id)인지 확인
  },
  authorId: string,
  diary_id: string,
) {
  try {
    const { content, nestedComment } = inputData;

    // 댓글 이모지 넣는 코드
    const responseData = await axios.post(
      'http://kdt-ai-8-team02.elicecoding.com:5000/predict',
      {
        text: content,
      },
    );

    const emotion = responseData.data;

    const emotionType = emotion.emotion;

    const emojis = await prisma.emoji.findMany({
      where: {
        type: emotionType,
      },
    });

    const randomEmoji: Emoji =
      emojis[Math.floor(Math.random() * emojis.length)];
    const emoji = randomEmoji.emotion;

    const comment = await prisma.comment.create({
      data: { diaryId: diary_id, authorId, content, nestedComment, emoji },
    });

    const commentResponseData = plainToClass(commentResponseDTO, comment, {
      excludeExtraneousValues: true,
    });
    const response = successApiResponseDTO(commentResponseData);
    return response;
  } catch (error) {
    throw error;
  }
}

// 댓글 조회
export async function getCommentByDiaryId(
  diary_id: string,
  page: number,
  limit: number,
) {
  try {
    const comment = await prisma.comment.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { diaryId: diary_id, nestedComment: null },
      select: {
        id: true,
        // 댓글 작성자의 id, username, porfileImage를 함께 응답
        author: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
        diaryId: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        // 대댓글은 reComment에 배열로 포함하여 응답
        reComment: {
          select: {
            id: true,
            author: {
              select: {
                id: true,
                username: true,
                profileImage: true,
              },
            },
            diaryId: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    // 댓글이 없을 경우 응답
    if (comment.length == 0) {
      const response = emptyApiResponseDTO();
      return response;
    }

    const { totalComment, totalPage } = await calculatePageInfoForComment(
      limit,
      diary_id,
    );

    const pageInfo = { totalComment, totalPage, currentPage: page, limit };

    const commentResponseDataList = comment.map((comment) =>
      plainToClass(commentResponseDTO, comment, {
        excludeExtraneousValues: true,
      }),
    );

    const response = new PaginationResponseDTO(
      200,
      commentResponseDataList,
      pageInfo,
      '성공',
    );

    return response;
  } catch (error) {
    throw error;
  }
}

// 댓글 수정
export async function updatedComment(
  inputData: {
    content: string;
    emoji: string;
  },
  comment_id: string,
  authorId: string,
) {
  try {
    // 댓글 이모지 넣는 코드
    const responseData = await axios.post(
      'http://kdt-ai-8-team02.elicecoding.com:5000/predict',
      {
        text: inputData.content,
      },
    );
    const emotion = responseData.data;

    const emotionType = emotion.emoji;

    const emojis = await prisma.emoji.findMany({
      where: {
        type: emotionType,
      },
    });

    const randomEmoji: Emoji =
      emojis[Math.floor(Math.random() * emojis.length)];
    const emoji = randomEmoji.emotion;

    // 댓글 작성자 본인인지 확인을 위한 조회
    const userCheck = await prisma.comment.findUnique({
      where: { id: comment_id },
    });

    // 댓글 작성자가 맞다면 수정 진행
    if (userCheck.authorId == authorId) {
      const comment = await prisma.comment.update({
        where: { id: comment_id },
        data: {
          content: inputData.content,
          emoji: emoji,
        },
      });

      const commentResponseData = plainToClass(commentResponseDTO, comment, {
        excludeExtraneousValues: true,
      });

      const response = successApiResponseDTO(commentResponseData);

      return response;
    } else {
      const response = nonAuthorizedApiResponseDTO();

      return response;
    }
  } catch (error) {
    throw error;
  }
}

// 댓글 삭제
export async function deletedComment(comment_id: string, authorId: string) {
  try {
    // 댓글 작성자 본인인지 확인을 위한 조회
    const userCheck = await prisma.comment.findUnique({
      where: { id: comment_id },
    });

    // 댓글 작성자가 맞다면 삭제 진행
    if (userCheck.authorId == authorId || userCheck.writeAi == authorId) {
      const comment = await prisma.comment.delete({
        where: { id: comment_id },
      });

      const commentResponseData = plainToClass(commentResponseDTO, comment, {
        excludeExtraneousValues: true,
      });

      const response = successApiResponseDTO(commentResponseData);

      return response;
    } else {
      const response = nonAuthorizedApiResponseDTO();

      return response;
    }
  } catch (error) {
    throw error;
  }
}

// chatGPT 활용하여 공감 한마디 댓글 추가
export async function createdGPTComment(
  content: string,
  authorId: string,
  diaryId: string,
) {
  try {
    const testChatGPT = await callChatGPT(content);

    await prisma.comment.create({
      data: {
        diaryId,
        authorId: process.env.AI_ID,
        content: testChatGPT,
        writeAi: authorId,
      },
    });
  } catch (error) {
    throw error;
  }
}

// chatGPT 한마디 댓글 수정(다이어리 내용이 수정될때 한마디도 수정)
export async function updatedGPTComment(
  content: string,
  authorId: string,
  diaryId: string,
) {
  try {
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
  } catch (error) {
    throw error;
  }
}
