import { Router } from 'express';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
import { favoriteSwitch } from '../controllers/favoriteController';

const favoriteRouter = Router();

favoriteRouter.post('/:diaryId', jwtAuthentication, favoriteSwitch);

export default favoriteRouter;
