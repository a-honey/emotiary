import { jwtAuthentication } from '../middlewares/authenticateJwt';
import {
  createDiary,
  deleteDiary,
  getOneDiary,
  updateDiary,
  getDiaryByDate,
  getOtherUsersDiary,
  getAllMyDiaries,
  sendRecommendationEmail,
  selectEmotion,
  searchDiary,
  getEmotionOftheMonth,
} from '../controllers/diaryController';
import { Router } from 'express';
import { diaryUpload, postDiaryUpload } from '../middlewares/uploadMiddleware';
import { wrapAsyncController } from '../utils/wrapper';

const diaryRouter = Router();

/** (Done)
 *  1. 캘린더 페이지 (한달 치)
 *    => input : userId, month , year
 *
 *    1-1. 내 글 가져오기
 *    1-2. 다른 사람 글 가져오기
 *----------------------------------------------------------
 *  (Done)
 *  2. 글 하나 가져오기
 *    => input : userId, diary
 *    2-1. 내 글 가져오기
 *         - private / friend / all 모두 가져오기
 *    2-2. 다른 사람 글 가져오기
 *         - 친구 O: friend / all 목록 가져오기
 *         - 친구 X: all 목록만 가져오기
 *----------------------------------------------------------
 *  (Done)
 *  3. 내 글 전체 목록(개인페이지)
 *    => input 필요없음
 *----------------------------------------------------------
 *  (Done)
 *  4. 네트워크 페이지 다른 사람 글
 *    => input 필요없음
 *----------------------------------------------------------
 *
 */

// 다이어리 생성
// api/diary/
diaryRouter.post(
  '/',
  jwtAuthentication,
  postDiaryUpload,
  wrapAsyncController(createDiary),
);

// 일기 초대 메일?
diaryRouter.post(
  '/recommendation/:diaryId',
  jwtAuthentication,
  wrapAsyncController(sendRecommendationEmail),
);

// 감정 선택?
diaryRouter.put(
  '/selectEmotion/:diaryId',
  jwtAuthentication,
  wrapAsyncController(selectEmotion),
);

// 네트워크 페이지 (Done)
// api/diary/views/users?select&page&limit&emotion
diaryRouter.get(
  '/views/users',
  jwtAuthentication,
  wrapAsyncController(getOtherUsersDiary),
);

// 캘린더 페이지 (Done)
// api/diary/views/date/:userId?year&month
diaryRouter.get(
  '/views/date/:userId',
  jwtAuthentication,
  wrapAsyncController(getDiaryByDate),
);

// 내 글 전체 가져오기 (Done)
// api/diary/views?page&limit
diaryRouter.get(
  '/views',
  jwtAuthentication,
  wrapAsyncController(getAllMyDiaries),
);

// 해당 월의 다이어리 1순위 감정 반환하기
// api/diary/emotions?year&month
diaryRouter.get(
  '/emotions',
  jwtAuthentication,
  wrapAsyncController(getEmotionOftheMonth),
);

// 다이어리 검색하기 (Done)
// api/diary/search?page&limit
diaryRouter.get('/search', jwtAuthentication, wrapAsyncController(searchDiary));

// api/diary/:diaryId
diaryRouter
  .route('/:diaryId')
  // 다이어리 하나 가져오기
  .get(jwtAuthentication, wrapAsyncController(getOneDiary))
  .put(jwtAuthentication, diaryUpload, wrapAsyncController(updateDiary))
  .delete(jwtAuthentication, wrapAsyncController(deleteDiary));

export default diaryRouter;
