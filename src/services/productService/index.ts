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
        
        await product.destroy({ force: true });
    },

    async getOne(
        productId: string
    ): Promise<Product> {
        return await db.Product.findByPk(
            productId,
            {
                attributes: { exclude: ['amount', 'createdAt', 'updatedAt']},
                include: [
                    { model: db.Store, attributes: ['id', 'name']},
                    { model: db.Brand, attributes: ['id', 'name']},
                    { model: db.Category, attributes: ['id', 'name']}
                ]
            }
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
                [sequelize.fn('AVG', sequelize.col('rating')), 'average_rating']
            ]
        });
        await db.Product.update(
            { rating: rating[0].dataValues.average_rating }, { where: { id: productId }}
        );
    },

    async getMany(
        optnFields: ISearchOptions
    ): Promise<Product[]> {
        const optionFields = new SearchOptionsDto(optnFields);
        const titleRegExp = `^${optionFields.title}`;

        const optionsObject: sequelize.FindOptions<Product> = {
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
            order: [[optionFields.order, optionFields.orderDirection]],
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

        return await db.Product.findAll(optionsObject);
    }
}