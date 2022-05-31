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
    }
}

export default config;