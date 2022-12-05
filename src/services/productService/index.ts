import ApiError from '../../errors/api-error';
import db from '../../db/all-models';
import Product from '../../db/models/product.model';
import { ICreateProduct } from '../../interfaces/product.interfaces';


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
    }
}