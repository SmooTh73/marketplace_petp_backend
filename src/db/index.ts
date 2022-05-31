import { DataSource } from 'typeorm';
import config from '../config/index';
import path from 'path';
import { Customer } from './models/customer-model';
import { Admin } from './models/admin-model';
import { Store } from './models/store-model';
import { StoreOwner } from './models/store-owner-model';
import { Rating } from './models/rating-model';
import { Product, Type, Brand } from './models/product-model';
import { Basket } from './models/basket-model';
import { BasketProduct } from './models/basket-product-model';


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

initialize();

export default {
    Customer,
    Admin,
    Product,
    Store,
    StoreOwner,
    Basket,
    BasketProduct,
    Rating,
    Type,
    Brand,
}