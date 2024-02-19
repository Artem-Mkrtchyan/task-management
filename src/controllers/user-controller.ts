import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/user-service.js";
import { validationResult } from "express-validator";
import { ApiError } from "../exteption/api-error.js";

export class UserController {
    userService: UserServices;

    constructor() {
        this.userService = new UserServices();
        this.registration = this.registration.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.activate = this.activate.bind(this);
    }

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                next(ApiError.BadRequest("Ошибка при валидации", result.array()));
            }

            const { email, password } = req.body;
            const userData = await this.userService.registration(email, password);
            this.setRefreshTokenFromCookie(res, userData.refreshToken);
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await this.userService.activate(activationLink);
            res.redirect(process.env.CLIENT_URL!);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await this.userService.login(email, password);
            this.setRefreshTokenFromCookie(res, userData.refreshToken);
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const token = await this.userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            console.log("Рефреш токен",token);
            return res.json(token);
        } catch (error) {
            next(error);
        }
    }

    setRefreshTokenFromCookie(res: Response, refreshToken: string) {
        res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    }
}