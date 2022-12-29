import Basket from '../../db/models/basket.model';
import db from '../../db/all-models';
import BasketProduct from '../../db/models/basket-product.model';
import { IBasketProduct } from '../productService/interfaces';
import ApiError from '../../errors/api-error';


export default {
    async create(userId: string): Promise<Basket> {
        return await db.Basket.create({ userId });
    },

    async addProduct(
        attrs: IBasketProduct,
        userId: string
    ): Promise<BasketProduct> {
        const basket = await db.Basket.findOne({ where: { userId }, attributes: ['id'] });
        const product = await db.Product.findOne(
            { where: { id: attrs.id}, attributes: ['id', 'amount']}
        );
        if (!product || attrs.amount > product.amount) throw ApiError.badRequest('Bad request');

        return await db.BasketProduct.create(
            { productId: attrs.id, amount: attrs.amount, basketId: basket.id },
            { 
                include: [
                    { model: db.Product, as: 'product', attributes: ['id', 'title', 'image'] }
                ]
            }
        );
    },

    async deleteProduct(
        productId: string,
        userId: string
    ): Promise<void> {
        const basket = await db.Basket.findOne({ where: { userId }, attributes: ['id'] });
        await db.BasketProduct.destroy({ where: { productId, basketId: basket.id }});
    },

    async getAll(
        userId: string
    ): Promise<BasketProduct[]> {
        const basket = await db.Basket.findOne({ where: { userId }, attributes: ['id'] });
        return await db.BasketProduct.findAll(
            {
                include: [
                    { model: db.Product, as: 'product', attributes: ['id', 'title', 'image'] }
                ],
                where: { basketId: basket.id }
            }
        );
    }
}