import db from '../../db/all-models';
import { IBaseUser } from '../../interfaces/user.interfaces';
import ApiError from '../../errors/api-error';
import bcrypt from 'bcrypt';
import tokenGenerators from '../../generators/token-generators';
import tokenService from '../tokenService';
import { EUserRole } from 'src/config/enums';

export default {
    async register(
        data: IBaseUser
    ): Promise<{ accessToken: string, refreshToken: string }> {
        const candidate = await db.User.findOne({ where: { email: data.email }});
        if (candidate) throw ApiError.badRequest('User with this email already exists.');

        const cryptedPass = await bcrypt.hash(data.password, 10);
        
        let user = await db.User.create({
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    password: cryptedPass,
                    role: data.role
        })
        
        const tokens = tokenGenerators.generateTokens({ id: user.id, role: data.role }, 'user');
        const tokenToDB = await tokenService.save(user.token_id, tokens.refreshToken);
        
        user.token_id = tokenToDB;  
        await user.save();

        return tokens;
    }
}