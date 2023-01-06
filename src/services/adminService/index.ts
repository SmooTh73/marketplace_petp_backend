import db from '../../db/all-models';
import { ICreateAdminAttrs } from './interfaces';
import bcrypt from 'bcrypt';
import { IGeneratorRes } from '../../interfaces/token.interfaces';
import tokenGenerators from '../../generators/token-generators';


export default {
    async create(
        attrs: ICreateAdminAttrs
    ): Promise<IGeneratorRes> {
        const admin = await db.Admin.create({
            nickname: attrs.nickname,
            name: attrs.name,
            surname: attrs.surname,
            password: await bcrypt.hash(attrs.password, 10)
        });
        
        return tokenGenerators.generateTokens({ id: admin.id, name: admin.name }, 'admin');
    }
}