import { Router } from 'express';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
import {
  createComment,
  getComment,
  updateComment,
  deleteComment,
} from '../controllers/commentContorller';
import { wrapAsyncController } from '../utils/wrapper';

const commentRouter = Router();

// 댓글 작성
commentRouter.post(
  '/:diaryId',
  jwtAuthentication,
  wrapAsyncController(createComment),
);

// 댓글 조회
commentRouter.get('/:diaryId', wrapAsyncController(getComment));

// 댓글 수정
commentRouter.put(
  '/:commentId',
  jwtAuthentication,
  wrapAsyncController(updateComment),
);

// 댓글 삭제
commentRouter.delete(
  '/:commentId',
  jwtAuthentication,
  wrapAsyncController(deleteComment),
);

export default commentRouter;
