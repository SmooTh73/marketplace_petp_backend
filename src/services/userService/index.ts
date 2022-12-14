import bcrypt from 'bcrypt';

import db from '../../db/all-models';
import { IBaseUser } from '../../interfaces/user.interfaces';
import ApiError from '../../errors/api-error';
import tokenGenerators from '../../generators/token-generators';
import tokenService from '../tokenService';
import { IGeneratorRes } from '../../interfaces/token.interfaces';
import User from '../../db/models/user.model';
import { IEditUser } from './interfaces';
import { ProfileDto } from './dto/profile.dto';
import { EUserRole } from '../../config/enums';
import basketService from '../basketService/index';


export default {
    async register(
        data: IBaseUser
    ): Promise<IGeneratorRes> {
        const candidate = await db.User.findOne({ where: { email: data.email }});
        if (candidate) throw ApiError.badRequest('User with this email already exists.');

        const cryptedPass = await bcrypt.hash(data.password, 10);
        
        let user = await db.User.create({
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    password: cryptedPass,
                    role: data.role
        });
        
        const tokens = tokenGenerators.generateTokens({ id: user.id, role: data.role }, 'user');
        await tokenService.save(user.id, tokens.refreshToken);

        //Create user's basket
        if (user.role === EUserRole['customer']) {
            await basketService.create(user.id);
        }

        return tokens;
    },

    async getProfile(
        id: string
    ): Promise<User> {
        return await db.User.findByPk(
            id,
            {
                attributes: { exclude: ['password', 'createdAt', 'updatedAt']}
            }
        );
    },

    async editProfile(
        id: string,
        attrs: IEditUser
    ): Promise<ProfileDto> {
        const [, user] = await db.User.update(
            {...attrs},
            { where: { id }, returning: true }
        );
        return new ProfileDto(user[0]);
    }
}