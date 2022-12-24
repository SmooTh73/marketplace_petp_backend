import OrderProduct from '../../db/models/order-product.model';
import db from '../../db/all-models';
import { IGetOrderProduct } from './interfaces';


export default {
    async getMany(
        attrs: IGetOrderProduct
    ): Promise<OrderProduct[]> {
        return await db.OrderProduct.findAll({ where: {...attrs} });
    }
}