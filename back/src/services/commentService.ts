import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { commentResponseDTO, PaginationResponseDTO } from '../dtos/commentDTO';
import { emptyApiResponseDTO } from '../utils/emptyResult';
import { successApiResponseDTO } from '../utils/successResult';
import { nonAuthorizedApiResponseDTO } from '../utils/nonAuthorizeResult';
import axios from 'axios';
import { Emoji } from '../types/emoji';
import { calculatePageInfoForComment } from '../utils/pageInfo';

const prisma = new PrismaClient();

//댓글 작성
export async function createdComment(
  inputData: {
    content: string;
    nestedComment: string;
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
    // 댓글 작성자의 id, username, porfileImage를 함께 응답
    // 대댓글은 reComment에 배열로 포함하여 응답
    const comment = await prisma.comment.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { diaryId: diary_id, nestedComment: null },
      select: {
        id: true,
        author: {
          select: {
            id: true,
            username: true,
            filesUpload: true,
          },
        },
        diaryId: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        reComment: {
          select: {
            id: true,
            author: {
              select: {
                id: true,
                username: true,
                filesUpload: true,
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
    // 댓글 작성자인지 확인하기 위한 조회
    const userCheck = await prisma.comment.findUnique({
      where: { id: comment_id },
    });

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
    // 댓글 작성자인지 확인하기 위한 조회
    const userCheck = await prisma.comment.findUnique({
      where: { id: comment_id },
    });

    if (userCheck.authorId == authorId) {
      const comment = await prisma.comment.deleteMany({
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
