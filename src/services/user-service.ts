
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import { UserDto } from "../dtos/user.dto.js";
import { ApiError } from "../exteption/api-error.js";

class UserServices {
    async registration(email: string, password: string) {
        const userData = await User.findOne({ where: { email } });

        if (userData) {
            throw ApiError.BadRequest(`A user with this ${email} already exists`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = v4();
        const user = await User.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.seveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async activate(activationLink: string) {
        const user = await User.findOne({where: {activationLink}});

        if(!user){
            throw ApiError.BadRequest("Некорректная ссылка активации");
        }

        user.isActivated = true;
        await user.save();
    }
}

export default new UserServices();