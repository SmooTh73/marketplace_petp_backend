import Product from '../../db/models/product.model';
import db from '../../db/all-models';
import contactInfoService from '../contactInfoService';
import Order from '../../db/models/order.model';
import ApiError from '../../errors/api-error';
import ContactInfo from '../../db/models/contact-info.model';
import productService from '../productService';
import { IBasketProduct } from '../productService/interfaces';


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

    async createFromProduct(
        userId: string,
        productAttrs: IBasketProduct
    ): Promise<{ order: Order, contactInfo: ContactInfo }> {
        const product = await productService.getOne(productAttrs.id);
        if (!product) throw ApiError.badRequest('Product by id not found');

        const contactInfo = await contactInfoService.getOne(
            userId,
            ['createdAt', 'updatedAt', 'userId']
        );
        if (!contactInfo) throw ApiError.badRequest('Add contact info!');

        const order = await db.Order.create(
            { total: product.price * productAttrs.amount, contactInfoId: contactInfo.id, userId }
        );

        await db.OrderProduct.create({
            amount: productAttrs.amount,
            productId: productAttrs.id,
            orderId: order.id,
            storeId: product.storeId
        });

        return { order, contactInfo };
    },

    async getOne(id: string): Promise<Order> {
        return await db.Order.findByPk(id);
    },

    async getMany(userId: string): Promise<Order[]> {
        return await db.Order.findAll({ where: { userId }});
    }
}