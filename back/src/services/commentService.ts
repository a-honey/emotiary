import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { commentResponseDTO } from '../dtos/commentDTO';
import { emptyApiResponseDTO } from '../utils/emptyResult';
import { successApiResponseDTO } from '../utils/successResult';
import { nonAuthorizedApiResponseDTO } from '../utils/nonAuthorizeResult';

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
    const comment = await prisma.comment.create({
      data: { diaryId: diary_id, authorId, content, nestedComment },
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
export async function getCommentByDiaryId(diary_id: string) {
  try {
    // 댓글 작성자의 id, username, porfileImage를 함께 응답
    // 대댓글은 reComment에 배열로 포함하여 응답
    const comment = await prisma.comment.findMany({
      where: { diaryId: diary_id, nestedComment: null },
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

    if (comment.length == 0) {
      const response = emptyApiResponseDTO();
      return response;
    }

    const commentResponseDataList = comment.map((comment) =>
      plainToClass(commentResponseDTO, comment, {
        excludeExtraneousValues: true,
      }),
    );

    const response = successApiResponseDTO(commentResponseDataList);

    return response;
  } catch (error) {
    throw error;
  }
}

// 댓글 수정
export async function updatedComment(
  inputData: {
    content: string;
  },
  comment_id: string,
  authorId: string,
) {
  try {
    // 댓글 작성자인지 확인하기 위한 조회
    const userCheck = await prisma.comment.findUnique({
      where: { id: comment_id },
    });

    if (userCheck.authorId == authorId) {
      const comment = await prisma.comment.update({
        where: { id: comment_id },
        data: inputData,
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
