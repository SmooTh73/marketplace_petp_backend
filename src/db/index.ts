import { DataSource } from 'typeorm';
import config from '../config/index';
import path from 'path';


const initialize = async () => {
    const connectionDataSource = new DataSource({
        // @ts-ignore
        type: config.database.type,
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.name,
        entities: [path.join(__dirname, '/models/*-model{.ts,.js}')],
        synchronize: true,
        autoSchemaSync: true,
    });

    await connectionDataSource.initialize();
    console.log('Connect to marketplace_petp DB')
}

export default async () => {
    await initialize();
}