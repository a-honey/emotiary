import { Router } from "express";
import { userLogin, userRegister } from "../controllers/userController";

const userAuthRouter = Router();

userAuthRouter.post("/register", userRegister);

userAuthRouter.post("/login", userLogin);

export default userAuthRouter;
