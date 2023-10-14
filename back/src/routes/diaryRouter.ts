import { jwtAuthentication } from '../middlewares/authenticateJwt';
import {
  createDiary,
  deleteDiary,
  getDiaryByDiaryId,
  updateDiary,
  getDiaryByDate,
  getOtherUsersDiary,
  getAllMyDiaries,
} from '../controllers/diaryController';
import { Router } from 'express';

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

// 네트워크 페이지 (Done)
// /diary/views/users?select&page&limit
diaryRouter.get('/views/users', jwtAuthentication, getOtherUsersDiary);

// 캘린더 페이지 (Done)
// /diary/views/date/:userId?year&month
diaryRouter.get('/views/date/:userId', jwtAuthentication, getDiaryByDate);

// 내 글 전체 가져오기 (Done)
// /diary/views?page&limit
diaryRouter.get('/views', jwtAuthentication, getAllMyDiaries);

// 다이어리 생성
// /diary/:userId
diaryRouter.post('/:userId', jwtAuthentication, createDiary);

// /diary/:diaryId
diaryRouter
  .route('/:diaryId')
  // 다이어리 하나 가져오기
  .get(jwtAuthentication, getDiaryByDiaryId)
  .put(jwtAuthentication, updateDiary)
  .delete(jwtAuthentication, deleteDiary);

export default diaryRouter;
