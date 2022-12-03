import config from '../config/index';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { EMode } from '../config/enums';


const initialize = async () => {
    const initialize = new Sequelize({
        database: config.database.name,
        username: config.database.username,
        password: config.database.password,
        port: config.database.port,
        host: config.database.host,
        models: [path.join(__dirname, '/models/*.model{.ts,.js}')],
        dialect: 'postgres'
    });
    await initialize.authenticate();
    if (config.mode === EMode[0]) {
        await initialize.sync({ alter: true });
    }
    console.log('Connect to marketplace_petp DB')
}

export default async () => {
    await initialize();
}