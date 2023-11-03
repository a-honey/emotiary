import { jwtAuthentication } from '../middlewares/authenticateJwt';
import {
   AllMyRoom
} from '../controllers/chatController';
import { Router } from 'express';
import { wrapAsyncController } from '../utils/wrapper';
import favoriteRouter from 'routes/favoriteRouter';
const roomRouter = Router();

/** @description 모든 채팅룸 */
roomRouter.get(
   '/room',
   jwtAuthentication,
   wrapAsyncController(AllMyRoom),
);

export default roomRouter;