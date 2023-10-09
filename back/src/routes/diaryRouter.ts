import { jwtAuthentication } from "../middlewares/authenticateJwt";
import {
  createDiary,
  deleteDiary,
  getDiaryByDiaryId,
  updateDiary,
  getDiaryByDate,
  getUsersDiary,
  getAllMyDiaries,
} from "../controllers/diaryController";
import { Router } from "express";

const diaryRouter = Router();

/** 1. 캘린더 페이지 (한달 치)
 *    => input : userId, month , year
 *    //TODO service로직에서 year, month 추가하고 query year과 month를 추가해야할 듯
 *    1-1. 내 글 가져오기
 *    1-2. 다른 사람 글 가져오기
 *----------------------------------------------------------
 *
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
diaryRouter.get("/views/users", jwtAuthentication, getUsersDiary);

// 캘린더 페이지 (Done)
diaryRouter.get("/views/date/:userId", jwtAuthentication, getDiaryByDate);

// 내 글 전체 가져오기 (Done)
diaryRouter.get("/views", jwtAuthentication, getAllMyDiaries);

// 다이어리 생성
diaryRouter.post("/:userId", jwtAuthentication, createDiary);

diaryRouter
  .route("/:diaryId")
  // 다이어리 하나 가져오기
  // TODO 권한에 따른 접근 필요
  .get(jwtAuthentication, getDiaryByDiaryId)
  .put(jwtAuthentication, updateDiary)
  .delete(jwtAuthentication, deleteDiary);

export default diaryRouter;
