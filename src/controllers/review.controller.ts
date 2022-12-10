import { Response, NextFunction } from 'express';

import constants from '../constants';
import { ICustomReq } from '../interfaces/request.interfaces';
import productService from '../services/productService';
import { ICreateReview, IEditReview } from '../interfaces/review.interfaces';
import reviewService from '../services/reviewService';
import { IReqWithToken } from './interfaces';


export default {
    async create(
        req: ICustomReq<ICreateReview>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const review = await reviewService.create(req.user.id, req.body);
            await productService.updateRating(req.body.productId);
            
            res.status(constants.statusCode.CREATED).json({ success: true, review });
        } catch (err) {
            console.log(err.message)
            next(err);
        }
    },

    async edit(
        req: ICustomReq<IEditReview>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const review = await reviewService.edit(req.body);
            await productService.updateRating(review.productId);

            res.json({ success: true, review });
        } catch (err) {
            next(err);
        }
    },

    async getMany(
        req: IReqWithToken,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const productId = req.params.id;

            const reviews = await reviewService.getMany(productId);
            res.json({ success: true, reviews });
        } catch (err) {
            next(err);
        }
    }
}