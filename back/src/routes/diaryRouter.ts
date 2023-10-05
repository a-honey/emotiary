import {
  createDiary,
  deleteDiary,
  getDiaryByUserId,
  getDiaryByDiaryId,
  updateDiary,
  getAllDiary,
} from "../controllers/diaryController";
import { Router } from "express";

const diaryRouter = Router();

diaryRouter.route("/view/:userId").get(getAllDiary);

diaryRouter.route("/user/:userId").get(getDiaryByUserId).post(createDiary);

diaryRouter
  .route("/:diaryId")
  .get(getDiaryByDiaryId)
  .put(updateDiary)
  .delete(deleteDiary);

export default diaryRouter;
