import ApiError from '../../errors/api-error';
import db from '../../db/all-models';
import Product from '../../db/models/product.model';
import { ICreateProduct } from '../../interfaces/product.interfaces';
import { IEditProduct } from './interfaces';

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
        productId:string,
        userId: string
    ): Promise<Product> {
        const product = await checkPossession(productId, userId);

        product.set({...attrs});
        await product.save();

        return product;
    }
}