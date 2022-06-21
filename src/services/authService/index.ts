import db from '../../db/all-models';
import ApiError from '../../errors/api-error';
import { EUserType } from '../../config/enums';
import bcrypt from 'bcrypt';
import tokenGenerators from '../../generators/token-generators';
import tokenService from '../tokenService';


export default {
    async login(
        email: string,
        password: string,
        type: keyof typeof EUserType
    ): Promise<{ accessToken: string, refreshToken: string }> {
        const options = {
            where: {
                email
            },
            relations: ['token_id']
        }
        const user = (type === EUserType[EUserType.customer])
            ? await db.Customer.findOne(options)
            : await db.Seller.findOne(options);

        if (!user) throw ApiError.badRequest('Email or password is wrong.');

        const compare = bcrypt.compare(password, user.password);
        if (!compare) throw ApiError.badRequest('Email or password is wrong');

        const tokens = tokenGenerators.generateTokens({ id: user.id, type }, 'user');

        const tokenToDB: any = await tokenService.save(user.token_id.id, tokens.refreshToken);

        user.token_id = tokenToDB;
        await user.save();

        return tokens;
    }
}