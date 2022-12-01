import { Response, NextFunction } from 'express';

import { ICustomReq } from '../interfaces/request.interfaces';
import { IBaseStore } from '../interfaces/store.interfaces';
import storeService from '../services/storeService/index'


export default {
    async create(
        req: ICustomReq<IBaseStore>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const data = req.body;

            const store = await storeService.create({ ...data, userId: req.user.id });
            res.status(201).json({ success: true, store });
        } catch (err) {
            next(err);
        }
    },
}