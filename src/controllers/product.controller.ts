import { NextFunction, Response } from 'express';

import { ICreateProduct } from '../interfaces/product.interfaces';
import { ICustomReq } from '../interfaces/request.interfaces';
import productService from '../services/productService';
import constants from '../constants';
import { IEditProduct } from '../services/productService/interfaces';
import { IReqWithToken } from './interfaces';


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
        req: ICustomReq<IEditProduct>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const productId = req.params.id;
            
            const product = await productService.edit(req.body, productId, req.user.id);
            res.json({ success: true, product });
        } catch (err) {
            next(err);
        }
    },

    async delete(
        req: IReqWithToken,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const productId = req.params.id;

            await productService.delete(productId, req.user.id);
            res.json({ success: true });
        } catch (err) {
            next(err);
        }
    }
}