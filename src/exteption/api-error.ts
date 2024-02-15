import { HttpStatusCode } from "../utils/HttpStatusCode.js";

export class ApiError extends Error {
    status: number;
    errors: string[];

    constructor(status: number, message: string, errors: string[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthtorizedError() {
        return new ApiError(HttpStatusCode.UNAUTHORIZED, "Пользователь не авторизован");
    }

    static BadRequest(message: string, error: string[] = []) {
        return new ApiError(HttpStatusCode.BAD_REQUEST, message, error);
    }
}