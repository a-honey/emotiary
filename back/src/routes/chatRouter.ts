import { Router } from 'express';
import {
} from '../controllers/chatController';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
const friendRouter = Router();