import OrderProduct from '../../db/models/order-product.model';
import db from '../../db/all-models';
import { IGetOrderProductStore, IGetOrderProductUser } from './interfaces';


export default {
    async getMany(
        attrs: IGetOrderProductStore | IGetOrderProductUser
    ): Promise<OrderProduct[]> {
        return await db.OrderProduct.findAll({ where: {...attrs} });
    }
}