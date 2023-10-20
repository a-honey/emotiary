import { Request, Response, NextFunction } from 'express';
import { IRequest } from 'types/user';
import {
  createdComment,
  getCommentByDiaryId,
  updatedComment,
  deletedComment,
} from '../services/commentService';
import { validate } from 'class-validator';

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
    res.json(comment);
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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;

    const comment = await getCommentByDiaryId(diary_id, page, limit);
    res.json(comment);
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

    return res.json(comment);
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

    return res.json(comment);
  } catch (error) {
    next(error);
  }
};
