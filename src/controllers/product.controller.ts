import { NextFunction, Response } from 'express';
import { ICreateProduct } from '../interfaces/product.intrefaces';
import { ICustomReq } from '../interfaces/request.interfaces';
import productService from '../services/productService';
import constants from '../constants';


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
    }
}