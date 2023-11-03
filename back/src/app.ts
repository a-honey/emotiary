import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger-output.json';
import bodyParser from 'body-parser';
import userAuthRouter from './routes/userRouter';
import passport from 'passport';
import diaryRouter from './routes/diaryRouter';
import favoriteRouter from './routes/favoriteRouter';
import friendRouter from './routes/friendRouter';
import commentRouter from './routes/commentRouter';
import { jwtStrategy, localStrategy, googleStrategy } from './config/passport';
import { Logger } from './config/logger';
import testAuthRouter from './routes/testRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { sendAlarm } from './utils/alarm';
import http from 'http';
import { chat } from './utils/chat';
import { Server as SocketIoServer, Socket } from 'socket.io';
import path = require("path");
import { CronJob } from 'cron';
import { updateAudioUrlsPeriodically } from './utils/music';

const app: Express & { io?: any } = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());
app.use(Logger);
sendAlarm();

app.use(passport.initialize());

const localStrategyInstance = localStrategy;
const jwtStrategyInstance = jwtStrategy;
const googleStrategyInstance = googleStrategy;

passport.use('local', localStrategyInstance);
passport.use('jwt', jwtStrategyInstance);
passport.use('google', googleStrategyInstance);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const job = new CronJob('0 */6 * * *', () => {
  updateAudioUrlsPeriodically();
});

// CronJob 시작
job.start();

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('기본 페이지');
});

const apiRouter = express.Router();

apiRouter.use('/users', userAuthRouter);
apiRouter.use('/test', testAuthRouter);
apiRouter.use('/friend', friendRouter);
apiRouter.use('/diary', diaryRouter);
apiRouter.use('/favorites', favoriteRouter);
apiRouter.use('/comments', commentRouter);

app.use('/api', apiRouter);

app.use('/api/fileUpload', express.static('fileUpload'));
app.use(errorMiddleware);

const io = new SocketIoServer(server, {
  path: '/chat',
  cors: {
    origin: 'http://localhost:3000', // Replace with your actual frontend URL
    methods: ['GET', 'POST',  'WEBSOCKET'],
  },
});

chat(io);
app.io = io;

export { app };
