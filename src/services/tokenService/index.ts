import Token from '../../db/models/token.model';
import tokenGenerators from '../../generators/token-generators';
import { IGeneratorRes } from '../../interfaces/token.interfaces';
import db from '../../db/all-models';
import ApiError from '../../errors/api-error';
import verifyToken from '../../helpers/tokenHelpers/verify-token';

export default {
    async save(userId: string, refreshToken: string): Promise<Token> {
        const token = await db.Token.findOne({ where: { userId } });
        if (token && userId) {
            token.refreshToken = refreshToken;
            await token.save();
            return  token;
        }
        const tokenToDB = await db.Token.create({ refreshToken, userId });
        return tokenToDB;
    },

    async refresh(
        refreshToken: string
    ): Promise<IGeneratorRes> {
        const tokenFromDb = await db.Token.findOne({ where: { refreshToken }});
        if (!tokenFromDb) throw ApiError.forbidden('User is unauthorized');

        const verify = verifyToken(refreshToken, 'user_refresh_secret');
        if (!verify) throw ApiError.unauthorized('User is unauthorized');

        const user = await db.User.findByPk(tokenFromDb.userId);
        if (!user) throw ApiError.forbidden('User is unauthorized');

        const tokens = tokenGenerators.generateTokens({ id: user.id, role: user.role }, 'user');
        
        tokenFromDb.refreshToken = tokens.refreshToken;
        await tokenFromDb.save();

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        }
    }
}