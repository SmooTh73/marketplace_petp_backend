import ApiError from '../../errors/api-error';
import db from '../../db/all-models';
import Product from '../../db/models/product.model';
import { ICreateProduct } from '../../interfaces/product.interfaces';
import { IEditProduct } from './interfaces';
import sequelize from 'sequelize';

async function checkPossession(
    productId:string,
    userId: string
): Promise<Product> {
    const store = await db.Store.findOne({ where: { userId }, attributes: ['id']});
    if (!store) throw ApiError.badRequest('User doesn\'t have store');

    const product = await db.Product.findByPk(productId);
    if (!product) throw ApiError.notFound('Product not found');
    if (product.storeId !== store.id) throw ApiError.forbidden('Edit access denied');
    return product;
}

export default {
    async create(
        attrs: ICreateProduct,
        userId: string
    ): Promise<Product> {
        const store = await db.Store.findOne({ where: { userId }, attributes: ['id']});
        if (!store) throw ApiError.badRequest('User doesn\'t have store');

        const match = await db.CategoryBrand.findOne(
            { 
                where: { brandId: attrs.brandId, categoryId: attrs.categoryId }
            }
        );
        if (!match) throw ApiError.badRequest('Category and brand don\'t match.');
        
        return await db.Product.create({ ...attrs, storeId: store.id });
    },

    async edit(
        attrs: IEditProduct,
        productId: string,
        userId: string
    ): Promise<Product> {
        const product = await checkPossession(productId, userId);

        product.set({...attrs});
        await product.save();

        return product;
    },

    async delete(
        productId: string,
        userId: string
    ): Promise<void> {
        const product = await checkPossession(productId, userId);
        
        await product.destroy();
    },

    async getOne(
        productId: string
    ): Promise<Product> {
        //Add store.name brand.name category.name
        return await db.Product.findByPk(
            productId,
            { attributes: { exclude: ['amount', 'createdAt', 'updatedAt']}}
        );
    },

    async getOneOwn(
        productId: string,
        userId: string
    ): Promise<Product> {
        return await checkPossession(productId, userId);
    },

    async updateRating(
        productId: string
    ): Promise<void> {
        const rating = await db.Review.findAll({
            where: { productId },
            attributes: [
                // @ts-ignore
                [sequelize.fn('AVG', sequelize.col('rating')), 'average_rating']
            ]
        });
        await db.Product.update(
            //@ts-ignore
            { rating: rating[0].dataValues.average_rating }, { where: { id: productId }}
        );
    }
}