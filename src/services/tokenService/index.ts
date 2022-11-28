import Token from 'src/db/models/token.model';
import db from '../../db/all-models';
import ApiError from '../../errors/api-error';

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
    }
}