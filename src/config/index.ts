import { IConfig } from './interfaces';

import { EMode } from './enums'; 

require('dotenv').config();

const mode = process.env.MODE as keyof typeof EMode;

const config: IConfig = {
    mode,
    app: {
        PORT: process.env.PORT || 6000,
    },
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    },
    jwt: {
        user_access_secret: process.env.JWT_USER_ACCESS_SECRET,
        user_refresh_secret: process.env.JWT_USER_REFRESH_SECRET,
        user_access_expiresIn: process.env.USER_ACCESS_EXPIRESIN,
        user_refresh_exriresIn: process.env.USER_REFRESH_EXPIRESIN,
        admin_access_secret: process.env.JWT_ADMIN_ACCESS_SECRET,
        admin_refresh_secret: process.env.JWT_ADMIN_REFRESH_SECRET,
        admin_access_expiresIn: process.env.ADMIN_ACCESS_EXPIRESIN,
        admin_refresh_exriresIn: process.env.ADMIN_REFRESH_EXPIRESIN,
    }
}

export default config;