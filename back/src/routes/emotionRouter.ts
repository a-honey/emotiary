import { Router } from 'express';
import {} from '../controllers/emotionController';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
import friendRouter from 'routes/friendRouter';
const emotionRouter = Router();



export default emotionRouter;