import db from '../../db/all-models';
import ApiError from '../../errors/api-error';
import bcrypt from 'bcrypt';
import tokenGenerators from '../../generators/token-generators';
import tokenService from '../tokenService';
import { EUserRole } from 'src/config/enums';


export default {
    async login(
        email: string,
        password: string
    ): Promise<{ accessToken: string, refreshToken: string }> {
        const user = await db.User.findOne({ where: { email }});
        if (!user) throw ApiError.forbidden('Email or password is wrong.');

        const compare = await bcrypt.compare(password, user.password);
        if (!compare) throw ApiError.forbidden('Email or password is wrong');

        const tokens = tokenGenerators.generateTokens({ id: user.id, role: user.role }, 'user');
        await tokenService.save(user.id, tokens.refreshToken);

        return tokens;
    }
}