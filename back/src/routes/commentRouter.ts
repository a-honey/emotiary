import { Router } from 'express';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
import { createComment, getComment, updateComment, deleteComment } from '../controllers/commentContorller';

const commentRouter = Router();

commentRouter.post('/:diaryId', jwtAuthentication, createComment);
commentRouter.get('/:diaryId', getComment);
commentRouter.put('/:commentId',jwtAuthentication, updateComment);
commentRouter.delete('/:commentId',jwtAuthentication, deleteComment);

export default commentRouter;