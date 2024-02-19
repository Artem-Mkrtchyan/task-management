import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import { checkSchema } from "express-validator";

const userController = new UserController();

const userRouter = Router();

userRouter.post("/registration",
    checkSchema({
        email: { isEmail: true },
        password: { isLength: { options: { min: 3, max: 32 } } }
    }),
    userController.registration
);
userRouter.post("/login", userController.login);
userRouter.get("/logout", userController.logout);
userRouter.get("/activate/:link", userController.activate);
userRouter.get("/id");

export default userRouter;