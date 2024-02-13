import { Request, Response, NextFunction } from "express";
import userService from "../services/user-service.js";

class UserController {


    async registration(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (error) {
            console.log(error);
            res.status(404);
        }
    }

    async login(req: Request, res: Response) {
        try {
            console.log(req);
        } catch (error) {
            console.log(error);
        }
    }


    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserController;