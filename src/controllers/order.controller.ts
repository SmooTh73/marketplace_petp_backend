import { NextFunction, Response } from 'express';
import { ICustomReq } from '../interfaces/request.interfaces';
import { ICreateContactInfo } from '../services/contactInfoService/interfaces';
import orderService from '../services/orderService';
import constants from '../constants';
import { IReqWithToken } from './interfaces';


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
    }
}