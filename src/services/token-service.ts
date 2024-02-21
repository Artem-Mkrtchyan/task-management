import jwt from "jsonwebtoken";
import { Token } from "../models/token.model.js";
import { UserDto } from "../dtos/user.dto.js";
import "dotenv/config";

export class TokenService {

    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;

    constructor() {
        this.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
        this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
    }

    generateToken(payload: UserDto) {
        const accessToken = jwt.sign(payload, this.JWT_ACCESS_SECRET, { expiresIn: "30m" });
        const refreshToken = jwt.sign(payload, this.JWT_REFRESH_SECRET, { expiresIn: "1h" });

        return {
            accessToken,
            refreshToken
        };
    }

    async seveToken(userId: number, refreshToken: string) {
        const tokenData = await Token.findOne({ where: { userId } });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        return await Token.create({ refreshToken, userId });
    }

    async removeToken(refreshToken: string) {
        return await Token.destroy({
            where: {
                refreshToken
            }
        });
    }

    async findToken(refreshToken: string) {
        return Token.findOne({where: {
            refreshToken
        }});
    }

    validateAccessToken(accessToken: string) {
        try {
            return jwt.verify(accessToken, this.JWT_ACCESS_SECRET) as UserDto;
        } catch {
            return null;
        }
    }
    validateRefreshToken(refreshToken: string) {
        return jwt.verify(refreshToken, this.JWT_REFRESH_SECRET) as UserDto;
    }
}