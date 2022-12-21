import Product from '../../db/models/product.model';
import db from '../../db/all-models';
import contactInfoService from '../contactInfoService';
import Order from '../../db/models/order.model';
import ApiError from '../../errors/api-error';
import ContactInfo from '../../db/models/contact-info.model';
import OrderProduct from '../../db/models/order-product.model';
import { IStoreId } from 'src/interfaces/store.interfaces';
import { IOrderId } from './interfaces';
import orderProductService from '../orderProductService';
import storeService from '../storeService';


export default {
    async createFromBasket(
        userId: string,
    ): Promise<{ order: Order, contactInfo: ContactInfo }> {
        let total = 0;
        const orderProducts = [];

        const basket = await db.Basket.findOne({ where: { userId }, attributes: ['id']});
        const basketProducts = await db.BasketProduct.findAll(
            {
                where: { basketId: basket.id },
                include: [
                    { model: Product, as: 'product', attributes: ['price', 'storeId'] }
                ]
            }
        );

        if (basketProducts.length === 0) throw ApiError.badRequest('Basket is empty');

        for (let i = 0; i < basketProducts.length; i++) {
            total += basketProducts[i].amount * basketProducts[i].product.price;
        }

        const contactInfo = await contactInfoService.getOne(
            userId,
            ['createdAt', 'updatedAt', 'userId']
        );
        if (!contactInfo) throw ApiError.badRequest('Add contact info!');

        const order = await db.Order.create({ total, contactInfoId: contactInfo.id, userId });

        for (let i = 0; i < basketProducts.length; i++) {
            orderProducts.push(
                {
                    amount: basketProducts[i].amount,
                    productId: basketProducts[i].productId,
                    orderId: order.id,
                    storeId: basketProducts[i].product.storeId
                }
            );
        }

        await db.OrderProduct.bulkCreate(orderProducts);
        
        await db.BasketProduct.destroy({ where: { basketId: basket.id }});
        return { order, contactInfo };
    },

    async getOrderProducts(
        userId: string,
        attrs: IStoreId | IOrderId
    ): Promise<OrderProduct[]> {
        if (attrs instanceof IOrderId) {
            return await orderProductService.getMany({...attrs, userId });
        } else if (attrs instanceof IStoreId) {
            const store = await storeService.get(attrs.storeId);
            if (store.userId !== userId) throw ApiError.forbidden('You aren\'t store owner');
            
            return await orderProductService.getMany({...attrs});
        } else {
            throw ApiError.server();
        }
    }
}