import { Router } from 'express';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
import { favoriteSwitch } from '../controllers/favoriteController';
import { wrapAsyncController } from '../utils/wrapper';

const favoriteRouter = Router();

// 해당 일기 좋아요 / 좋아요 취소
favoriteRouter.post(
  '/:diaryId',
  jwtAuthentication,
  wrapAsyncController(favoriteSwitch),
);

export default favoriteRouter;
