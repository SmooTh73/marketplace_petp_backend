import Basket from '../../db/models/basket.model';
import db from '../../db/all-models';
import BasketProduct from 'src/db/models/basket-product.model';


export default {
    async create(userId: string): Promise<Basket> {
        return await db.Basket.create({ userId });
    },

    async addProduct(
        productId: string,
        userId: string
    ): Promise<BasketProduct> {
        const basket = await db.Basket.findOne({ where: { userId }, attributes: ['id'] });
        return await db.BasketProduct.create(
            { productId, basketId: basket.id },
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