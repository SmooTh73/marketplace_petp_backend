import { IConfig } from './interfaces';

require('dotenv').config();

const config: IConfig = {
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