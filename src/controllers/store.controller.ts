import { Response, NextFunction } from 'express';
import { IEditStore } from '../services/storeService/interfaces';

import { ICustomReq } from '../interfaces/request.interfaces';
import { IBaseStore } from '../interfaces/store.interfaces';
import storeService from '../services/storeService/index'
import { IReqWithToken } from './interfaces';
import constants from '../constants';


export default {
    async create(
        req: ICustomReq<IBaseStore>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const data = req.body;

            const store = await storeService.create({ ...data, userId: req.user.id });
            res.status(constants.statusCode.CREATED).json({ success: true, store });
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
    },

    async get(
        req: IReqWithToken,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const store = await storeService.getOne(req.params.id);

            res.json({ success: true, store });
        } catch (err) {
            next(err);
        }
    }
}