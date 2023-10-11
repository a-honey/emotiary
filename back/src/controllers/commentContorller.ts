import { Request, Response, NextFunction } from "express";
import { IRequest } from "types/user";
import { createdComment, getCommentByDiaryId, updatedComment, deletedComment } from '../services/commentService';

export const createComment = async (req : IRequest, res : Response, next : NextFunction) => {
    try {
        // req를 통해 넘어온 diaryId
        // 토큰에서 로그인 유저 id 추출
        const authorId = req.user.id;
        const inputData = req.body;
        const diary_id: string = req.params.diaryId;

        //params로 받은 일기 id와 추출한 유저 id를 이용하여 like table에 등록된 행이 있는지 확인
        const comment = await createdComment(inputData, authorId, diary_id);

        res.status(200).json({ data: comment, message: '댓글을 달았어요!' });

    } catch(error) {
        next(error);
    }
}

export const getComment = async (req : Request, res : Response, next : NextFunction) => {
  try {
      // req를 통해 넘어온 diaryId
      // 토큰에서 로그인 유저 id 추출
      const diary_id: string = req.params.diaryId;

      //params로 받은 일기 id와 추출한 유저 id를 이용하여 like table에 등록된 행이 있는지 확인
      const comment = await getCommentByDiaryId(diary_id);

      res.status(200).json(comment);

  } catch(error) {
      next(error);
  }
}

export const updateComment = async (req : IRequest, res : Response, next : NextFunction) => {
  try {
      // req를 통해 넘어온 diaryId
      // 토큰에서 로그인 유저 id 추출
      const comment_id: string = req.params.commentId;
      const inputData = req.body; 
      const authorId = req.user.id;

      //params로 받은 일기 id와 추출한 유저 id를 이용하여 like table에 등록된 행이 있는지 확인
      const comment = await updatedComment(inputData, comment_id, authorId);

      res.status(200).json(comment);

  } catch(error) {
      next(error);
  }
}


export const deleteComment = async (req : IRequest, res : Response, next : NextFunction) => {
  try {
      // req를 통해 넘어온 diaryId
      // 토큰에서 로그인 유저 id 추출
      const comment_id: string = req.params.commentId;
      const authorId = req.user.id;

      //params로 받은 일기 id와 추출한 유저 id를 이용하여 like table에 등록된 행이 있는지 확인
      const comment = await deletedComment(comment_id, authorId);

      res.status(200).json(comment);

  } catch(error) {
      next(error);
  }
}