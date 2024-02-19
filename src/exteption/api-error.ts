import { HttpStatusCode } from "../utils/HttpStatusCode.js";

export class ApiError<T> extends Error {
    status: number;
    errors: T[];

    constructor(status: number, message: string, errors: T[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthtorizedError() {
        return new ApiError(HttpStatusCode.UNAUTHORIZED, "Пользователь не авторизован");
    }

    static BadRequest<T>(message: string, error: T[] = []) {
        return new ApiError(HttpStatusCode.BAD_REQUEST, message, error);
    }
}