import { NextFunction, Response } from 'express';
import { ICustomReq } from '../interfaces/request.interfaces';
import orderService from '../services/orderService';
import constants from '../constants';
import { IReqWithToken } from './interfaces';
import orderProductService from '../services/orderProductService';
import { IBasketProduct } from '../services/productService/interfaces';


export default {
    async createFromBasket(
        req: IReqWithToken,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { order, contactInfo } = await orderService.createFromBasket(req.user.id);

            res.status(constants.statusCode.CREATED).json({ success: true, order, contactInfo });
        } catch (err) {
            console.log(err)
            next(err);
        }
    },

    async createFromProduct(
        req: ICustomReq<IBasketProduct>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { order, contactInfo } = await orderService.createFromProduct(req.user.id, req.body);

            res.status(constants.statusCode.CREATED).json({ success: true, order, contactInfo });
        } catch (err) {
            next(err);
        }
    },

    async getOrderProducts(
        req: IReqWithToken,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const id = req.params.id;
            const orderProducts = await orderProductService.getMany(req.user.id, req.user.role, id);

            res.json({ success: true, orderProducts });
        } catch (err) {
            next(err);
        }
    }
}