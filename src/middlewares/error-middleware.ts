import { ApiError } from "../exteption/api-error.js";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../utils/HttpStatusCode.js";

export function errorMiddleware(error: unknown, request: Request, respose: Response, next: NextFunction) {

    if (error instanceof ApiError) {
        return respose.status(error.status).json({ message: error.message, errors: error.errors });
    }

    return respose.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message: "Непредвиденная ошибка на сервере"});
}