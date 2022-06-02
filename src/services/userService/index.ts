import db from '../../db/all-models';
import { IBaseUser } from '../../interfaces/user-interfaces';
import { EUserType } from '../../config/enums';
import ApiError from '../../errors/api-error';
import bcrypt from 'bcrypt';
import tokenGenerators from '../../generators/token-generators';

export default {
    async register(
        data: IBaseUser,
        accountType: keyof typeof EUserType,
    ): Promise<{ accessToken: string, refreshToken: string }> {
        const candidate = (accountType == EUserType[EUserType.customer])
            ? await db.Customer.findOneBy({ email: data.email })
            : await db.Seller.findOneBy({ email: data.email });
        if (candidate) throw ApiError.badRequest('User with this email already exits.');

        const cryptedPass = await bcrypt.hash(data.password, 10);

        let user = (accountType == EUserType[EUserType.customer])
            ? db.Customer.create({
                name: data.name,
                surname: data.surname,
                email: data.email,
                password: cryptedPass
            })
            : db.Seller.create({
                name: data.name,
                surname: data.surname,
                email: data.email,
                password: cryptedPass
            });
        
        const tokens = tokenGenerators.generateTokens({ id: user.id, type: accountType }, 'user');
        const tokenToDB = db.Token.create({ refresh: tokens.refreshToken });

        user.token_id = tokenToDB;
        await user.save();
        await tokenToDB.save();

        return tokens;
    }
}