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
import {
  jwtStrategy,
  localStrategy,
  googleStrategy,
} from './config/passport/strategy/passport';
import { Logger } from './config/logger';
import testAuthRouter from './routes/testRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';

// import axios, { AxiosResponse } from "axios";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(Logger);

app.use(passport.initialize());

const localStrategyInstance = localStrategy;
const jwtStrategyInstance = jwtStrategy;
const googleStrategyInstance = googleStrategy;

passport.use('local', localStrategyInstance);
passport.use('jwt', jwtStrategyInstance);
passport.use('google', googleStrategyInstance);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 유튜브
// function analyzeEmotion(): string {
//     const emotion: string = "sad";
//     return emotion;
// }

// const youtubeApiKey: string = "AIzaSyB1d787FFm4D9Qw8keqyrj0fCqkTE94hhg";

// async function searchMusic(emotion: string): Promise<any | null> {
//     try {
//         const searchQuery = `${emotion} music`;
//         console.log(`https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&type=video&q=${searchQuery}`);
//         const response: AxiosResponse = await axios.get(
//             `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&type=video&q=${searchQuery}`
//         );

//         // API 응답 중에서 첫 번째 비디오 정보를 추출
//         const firstVideo = response.data.items[0];

//         if (!firstVideo) {
//             return null; // 검색 결과가 없는 경우 null을 반환하거나 다른 처리를 할 수 있습니다.
//         }

//         // 노래 정보를 객체로 반환
//         const musicData = {
//             title: firstVideo.snippet.title,
//             videoId: firstVideo.id.videoId,
//         };

//         return musicData;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

// app.post('/song', async (req: Request, res: Response) => {
//     try {
//         const emotion = analyzeEmotion();

//         const musicData = await searchMusic(emotion);

//         if (!musicData) {
//             res.status(404).json({ message: "No songs found." });
//         } else {
//             res.status(200).json(musicData);
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('기본 페이지');
});

//TODO api 붙여주기
//TODO node 부하테스트

// app.all('/api/*', (req: Request, res: Response, next: NextFunction) => {
//   console.log('api통신 테스트');
//   next();
// });

const apiRouter = express.Router();

apiRouter.use('/users', userAuthRouter);
apiRouter.use('/test', testAuthRouter);
apiRouter.use('/friend', friendRouter);
apiRouter.use('/diary', diaryRouter);
apiRouter.use('/favorites', favoriteRouter);
apiRouter.use('/comments', commentRouter);

app.use('/api', apiRouter);
// // 정적 파일 제공을 위한 미들웨어 설정
// app.use(express.static("public"));
app.use(express.static('imageUpload'));
app.use(errorMiddleware);

export { app };
