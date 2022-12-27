import OrderProduct from '../../db/models/order-product.model';
import db from '../../db/all-models';
import { IGetOrderProduct } from './interfaces';
import { EUserRole } from '../../config/enums';
import storeService from '../storeService';
import ApiError from '../../errors/api-error';
import orderService from '../orderService';


export default {
    async findAll(
        attrs: IGetOrderProduct
    ): Promise<OrderProduct[]> {
        return await db.OrderProduct.findAll({ where: {...attrs} });
    },

    async getMany(
        userId: string,
        role: string,
        id: string
    ): Promise<OrderProduct[]> {
        const { dbData, opts } = (role === EUserRole['customer'])
            ? { dbData: await orderService.getOne(id), opts: { orderId: id }}
            : { dbData: await storeService.getOne(id), opts: { storeId: id }};

        if (!dbData || dbData.userId !== userId) throw ApiError.forbidden('You aren\'t owner');

        return await this.findAll(opts);
    }
}