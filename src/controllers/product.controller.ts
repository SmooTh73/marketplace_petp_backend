import { NextFunction, Response } from 'express';

import { ICreateProduct } from '../interfaces/product.interfaces';
import { ICustomReq } from '../interfaces/request.interfaces';
import productService from '../services/productService';
import constants from '../constants';
import { IBasketProduct, IEditProductReq, IProductId, ISearchOptions } from '../services/productService/interfaces';
import { IReqWithToken } from './interfaces';
import basketService from '../services/basketService';


export default {
    async create(
        req: ICustomReq<ICreateProduct>,
        res: Response,
        next: NextFunction   
    ): Promise<void> {
        try {
            const store = await productService.create(req.body, req.user.id);

            res.status(constants.statusCode.CREATED).json({ success: true, store });
        } catch (err) {
            next(err);
        }
    },

    async edit(
        req: ICustomReq<IEditProductReq>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const product = await productService.edit(req.body.attrs, req.body.id, req.user.id);
            res.json({ success: true, product });
        } catch (err) {
            next(err);
        }
    },

    async delete(
        req: ICustomReq<IProductId>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            await productService.delete(req.body.id, req.user.id);
            res.json({ success: true });
        } catch (err) {
            next(err);
        }
    },

    async getOne(
        req: IReqWithToken,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const productId = req.params.id;

            const product = (req.url.slice(0, 5) === '/own/')
                ? await productService.getOneOwn(productId, req.user.id)   
                : await productService.getOne(productId);

            res.json({ success: true, product });
        } catch (err) {
            next(err);
        }
    },

    async getMany(
        req: ICustomReq<ISearchOptions>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const products = await productService.getMany(req.body);
            res.json({ success: true, products });
        } catch (err) {
            next(err);
        }
    },

    async addToBasket(
        req: ICustomReq<IBasketProduct>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            await basketService.addProduct(req.body, req.user.id);
            res.json({ success: true });
        } catch (err) {
            next(err);
        }
    },

    async removeFromBasket(
        req: ICustomReq<IProductId>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            await basketService.deleteProduct(req.body.id, req.user.id);
            res.json({ success: true });
        } catch (err) {
            next(err);
        }
    },

    async getAllFromBasket(
        req: IReqWithToken,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const basketProducts = await basketService.getAll(req.user.id);
            res.json({ success: true, basketProducts });
        } catch (err) {
            next(err);
        }
    }
}