import { Router } from "express";
import userController from "../controllers/user-controller.js";

const userRouter = Router();

userRouter.post("/registration", userController.registration);
userRouter.post("/login");
userRouter.get("/logout");
userRouter.get("/activate/:link", userController.activate);
userRouter.get("/id");

export default userRouter;