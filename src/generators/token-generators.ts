import jwt from 'jsonwebtoken';

import config from '../config/index';
import { EAccountType } from '../config/enums';
import { IGeneratorRes, ITokenPayload } from 'src/interfaces/token.interfaces';


export default {
    generateTokens(
        payload: ITokenPayload,
        accountType: keyof typeof EAccountType
    ): IGeneratorRes {
        const accessToken = jwt.sign(
            payload,
            config.jwt[`${accountType}_access_secret`],
            { expiresIn: config.jwt[`${accountType}_access_expiresIn`] }
        );
        const refreshToken = jwt.sign(
            payload,
            config.jwt[`${accountType}_refresh_secret`],
            { expiresIn: config.jwt[`${accountType}_refresh_exriresIn`] }
        );

        return { accessToken, refreshToken };
    }
}