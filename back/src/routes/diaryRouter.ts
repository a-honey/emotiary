import { jwtAuthentication } from "../middlewares/authenticateJwt";
import {
  createDiary,
  deleteDiary,
  getDiaryByUserId,
  getDiaryByDiaryId,
  updateDiary,
  getDiaryByDate,
  getUsersDiary,
} from "../controllers/diaryController";
import { Router } from "express";

const diaryRouter = Router();

/**
 * @description 개인 페이지에서 내 글 가져오기
 */
diaryRouter.get("/views/:userId", jwtAuthentication, getDiaryByUserId);
/**
 * @description 네트워크 페이지에서 다른 사람 글 가져오기
 */
diaryRouter.get("/views/users/:userId", jwtAuthentication, getUsersDiary);
/**
 * @description 메인페이지에서 날짜에 따른 내 글 가져오기
 */
//TODO 질문하기) 내글 가져오기 할 때 userId를 parameter로 넘겨받을지 아니면 토큰에서 추출할지!
diaryRouter.get("/views/date/:userId", jwtAuthentication, getDiaryByDate);
/**
 * @description 다이어리 생성
 */
diaryRouter.post("/:userId", jwtAuthentication, createDiary);

diaryRouter
  .route("/:diaryId")
  .get(jwtAuthentication, getDiaryByDiaryId)
  .put(jwtAuthentication, updateDiary)
  .delete(jwtAuthentication, deleteDiary);

export default diaryRouter;
