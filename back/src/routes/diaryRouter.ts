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
diaryRouter.get("/views/:userId", getDiaryByUserId);
/**
 * @description 네트워크 페이지에서 다른 사람 글 가져오기
 */
diaryRouter.get("/views/users/:userId", getUsersDiary);
/**
 * @description 메인페이지에서 날짜에 따른 내 글 가져오기
 */
diaryRouter.get("/views/date/:userId", getDiaryByDate);
/**
 * @description 다이어리 생성
 */
diaryRouter.post("/:userId", createDiary);

diaryRouter
  .route("/:diaryId")
  .get(getDiaryByDiaryId)
  .put(updateDiary)
  .delete(deleteDiary);

export default diaryRouter;
