import { Response, NextFunction } from "express";
import { ICustomReq } from "../interfaces/request.interfaces";
import userService from '../services/userService/index';
import { IBaseUser } from '../interfaces/user.interfaces';
import { IBaseStore } from '../interfaces/store.interfaces';
import storeService from '../services/store';


export default {
    async register(
        req: ICustomReq<IBaseUser>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const data = req.body;

            const tokens = await userService.register(data);
            res.cookie('refreshUserToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            }).status(201).json({ success: true, accessToken: tokens.accessToken });
        } catch (err) {
            next(err);
        }
    },

    async createStore(
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
    }
}