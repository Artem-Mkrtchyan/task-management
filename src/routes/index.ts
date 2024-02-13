import { Router } from "express";
import userRouter from "./user-router.js";


const routers = Router();

routers.use("/user", userRouter);

export default routers;


