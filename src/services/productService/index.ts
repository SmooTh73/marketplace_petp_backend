import ApiError from '../../errors/api-error';
import db from '../../db/all-models';
import Product from '../../db/models/product.model';
import { ICreateProduct } from '../../interfaces/product.interfaces';
import { IEditProduct, ISearchOptions } from './interfaces';
import sequelize from 'sequelize';
import { SearchOptionsDto } from './dto/search-options.dto';

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
    },

    async getMany(
        optnFields: ISearchOptions
    ): Promise<Product[]> {
        const optionFields = new SearchOptionsDto(optnFields);
        const titleRegExp = `^${optionFields.title}`;
        
        const optionsObject = {
            //other options
            include:[
                { model: db.Brand, as: 'brand', attributes: ['id', 'name'] },
                { model: db.Category, as: 'category', attributes: ['id', 'name']},
                { model: db.Store, as: 'store', attributes: ['id', 'name']}
            ],
            attributes: {
                exclude: ['amount', 'createdAt', 'updatedAt', 'text', 'brandId', 'storeId', 'categoryId'] 
            },
            where: {
                price: {
                    [sequelize.Op.between]: [optionFields.priceRange.low, optionFields.priceRange.high]
                },
                title: {
                    [sequelize.Op.iRegexp]: titleRegExp
                },
                rating: {
                    [sequelize.Op.lt]: optionFields.rating
                }
            },
            offset: ((optionFields.page - 1) * optionFields.limit),
            limit: optionFields.limit,
            subQuery: false,
        }

        if (optionFields.category) {
            Object.assign(optionsObject.where, { categoryId: optionFields.category });
        }
        if (optionFields.brands.length !== 0) {
            Object.assign(optionsObject.where, { brandId: { [sequelize.Op.in]: optionFields.brands }});
        } 
        // add to opt object
        // attributes: [ *fields*, deep brand (name)] +
        // where: { title: regural(+), price: between range(+), rating less then(+), category(+), brand in brand[](+) }(+)
        // order: [by price, by rating]
        // if()
        return await db.Product.findAll(optionsObject);
    }
}