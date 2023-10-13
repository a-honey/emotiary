import { Request, Response, NextFunction } from 'express';
import { IRequest } from 'types/user';
import {
  createdComment,
  getCommentByDiaryId,
  updatedComment,
  deletedComment,
} from '../services/commentService';
import { plainToClass } from 'class-transformer';
import { commentResponseDTO } from '../dtos/commentDTO';
import { emptyApiResponseDTO } from '../utils/emptyResult';
import { successApiResponseDTO } from '../utils/successResult';
import { nonAuthorizedApiResponseDTO } from '../utils/nonAuthorizeResult';
import { IsObject } from 'class-validator';

export const createComment = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* #swagger.tags = ['Comment']
        #swagger.security = [{
            "bearerAuth": []
    }] */
    const authorId = req.user.id;
    const inputData = req.body;
    const diary_id: string = req.params.diaryId;

    const comment = await createdComment(inputData, authorId, diary_id);

    const commentResponseData = plainToClass(commentResponseDTO, comment, {
      excludeExtraneousValues: true,
    });

    const response = successApiResponseDTO(commentResponseData);

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // #swagger.tags = ['Comment']
    const diary_id: string = req.params.diaryId;

    const comment = await getCommentByDiaryId(diary_id);

    if (comment.data.length == 0) {
      const response = emptyApiResponseDTO();
      return res.status(response.status).json(response);
    }

    const commentResponseDataList = comment.data.map((comment) =>
      plainToClass(commentResponseDTO, comment, {
        excludeExtraneousValues: true,
      }),
    );

    const response = successApiResponseDTO(commentResponseDataList);

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* #swagger.tags = ['Comment']
        #swagger.security = [{
            "bearerAuth": []
    }] */
    const comment_id: string = req.params.commentId;
    const inputData = req.body;
    const authorId = req.user.id;

    const comment = await updatedComment(inputData, comment_id, authorId);

    if (comment.data == undefined) {
      const response = nonAuthorizedApiResponseDTO();
      return res.status(response.status).json(response);
    }

    const commentResponseData = plainToClass(commentResponseDTO, comment.data, {
      excludeExtraneousValues: true,
    });

    const response = successApiResponseDTO(commentResponseData);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* #swagger.tags = ['Comment']
        #swagger.security = [{
            "bearerAuth": []
    }] */
    const comment_id: string = req.params.commentId;
    const authorId = req.user.id;

    const comment = await deletedComment(comment_id, authorId);

    if (comment == null) {
      const response = nonAuthorizedApiResponseDTO();
      return res.status(response.status).json(response);
    }

    const commentResponseData = plainToClass(commentResponseDTO, comment, {
      excludeExtraneousValues: true,
    });

    const response = successApiResponseDTO(commentResponseData);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
