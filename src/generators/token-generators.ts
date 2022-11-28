import jwt from 'jsonwebtoken';

import config from '../config/index';
import { EAccountType } from '../config/enums';


export default {
    generateTokens(payload: string | Object, accountType: keyof typeof EAccountType) {
        // if (accountType === EAccountType[EAccountType.admin]) {
        //     const accessToken = jwt.sign(
        //         payload,
        //         config.jwt.admin_access_secret,
        //         { expiresIn: config.jwt.admin_access_expiresIn }
        //     );
        //     const refreshToken = jwt.sign(
        //         payload,
        //         config.jwt.admin_refresh_secret,
        //         { expiresIn: config.jwt.admin_refresh_exriresIn }
        //     );

        //     return { accessToken, refreshToken };
        // }

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