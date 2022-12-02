import { Response, NextFunction } from 'express';
import { IEditStore } from 'src/services/storeService/interfaces';

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

    async edit(
        req: ICustomReq<IEditStore>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const attrs = req.body;

            const store = await storeService.edit(req.user.id, attrs);
            res.json({ success: true, store });
        } catch (err) {
            next(err);
        }
    }
}