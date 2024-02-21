
import { User } from "../models/user.model.js";
import { v4 } from "uuid";
import { UserDto } from "../dtos/user.dto.js";
import { ApiError } from "../exteption/api-error.js";
import { TokenService } from "./token-service.js";
import mailService from "./mail-service.js";
import bcrypt from "bcrypt";

export class UserServices {
    tokenService: TokenService;

    constructor() {
        this.tokenService = new TokenService();
    }

    async registration(email: string, password: string) {
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw ApiError.BadRequest(`A user with this ${email} already exists`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = v4();
        const user = await User.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

        return await this.getTokens(user);
    }

    async activate(activationLink: string) {
        const user = await User.findOne({ where: { activationLink } });

        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка активации");
        }

        user.isActivated = true;
        await user.save();
    }

    async login(email: string, password: string) {
        const userData = await User.findOne({ where: { email } });
        if (!userData) {
            throw ApiError.BadRequest("Пользователь с данной почтой не существует");
        }

        const checkPassword = await bcrypt.compare(password, userData.password);
        if (!checkPassword) {
            throw ApiError.BadRequest("Неверный пароль");
        }

        return await this.getTokens(userData);
    }

    async logout(refreshToken: string) {
        return await this.tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            console.log("Отсутствует токен");
            throw ApiError.UnauthtorizedError();
        }

        const userData = this.tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb) {
            console.log("Скомпрометирован");
            console.log(userData);
            console.log(tokenFromDb);

            throw ApiError.UnauthtorizedError();
        }

        const user = await User.findByPk(userData.id);
        if(!user) {
            throw ApiError.BadRequest("Пользователь с данной почтой не существует");
        }

        return await this.getTokens(user);
    }

    private async getTokens(user: User) {
        const userDto = new UserDto(user);
        const tokens = this.tokenService.generateToken({ ...userDto });
        await this.tokenService.seveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }
}