import db from '../../db/all-models';
import ApiError from '../../errors/api-error';
import { IToken } from '../../interfaces/token-interfaces';


export default {
    async save(id: any, refreshToken: string): Promise<IToken> {
        const token = await db.Token.findOneBy({ id });
        if (token && id) {
            token.refresh = refreshToken;
            return await token.save();
        }
        const tokenToDB = db.Token.create({ refresh: refreshToken });
        await tokenToDB.save();
        return tokenToDB;
    }
}