import jwt from "jsonwebtoken";
import { Token } from "../models/token.model.js";
import { UserDto } from "../dtos/user.dto.js";
import "dotenv/config";

export class TokenService {
    generateToken(payload: UserDto) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: "30m" });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "1h" });

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

        const token = await Token.create({ refreshToken, userId });
        return token;
    }

    async removeToken(refreshToken: string) {
        return await Token.destroy({
            where: {
                refreshToken
            }
        });
    }
}