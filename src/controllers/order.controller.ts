import { NextFunction, Response } from 'express';
import { ICustomReq } from '../interfaces/request.interfaces';
import orderService from '../services/orderService';
import constants from '../constants';
import { IReqWithToken } from './interfaces';
import { IOrderId } from '../services/orderService/interfaces';
import { IStoreId } from '../interfaces/store.interfaces';


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

    async getOrderProducts(
        req: ICustomReq<IOrderId | IStoreId>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const orderProducts = await orderService.getOrderProducts(req.user.id, {...req.body});

            res.json({ success: true, orderProducts });
        } catch (err) {
            next(err);
        }
    }
}