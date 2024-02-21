import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exteption/api-error.js";
import { TokenService } from "../services/token-service.js";
import { UserDto } from "../dtos/user.dto.js";

interface ICustomRequest extends Request {
    user?: UserDto
}

export function authMiddleware(request: ICustomRequest, respose: Response, next: NextFunction) {
    try {
        const authorizationHeader = request.headers.authorization;
        if(!authorizationHeader) {
            return next(ApiError.UnauthtorizedError());
        }
        console.log(authorizationHeader);
        const accessToken = authorizationHeader.split(" ")[1];
        if(!accessToken) {
            return next(ApiError.UnauthtorizedError());
        }

        const tokenService = new TokenService();
        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return next(ApiError.UnauthtorizedError());
        }

        request.user = userData;
        return next();
    } catch (error) {
        return next(ApiError.UnauthtorizedError());
    }
}