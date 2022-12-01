import { Response, NextFunction } from "express";
import { ICustomReq } from "../interfaces/request.interfaces";
import userService from '../services/userService/index';
import { IBaseUser } from '../interfaces/user.interfaces';
import { IBaseStore } from '../interfaces/store.interfaces';
import storeService from '../services/storeService';
import { IReqWithToken } from './interfaces';
import { IEditUser } from 'src/services/userService/interfaces';


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

    async getProfile(
        req: IReqWithToken,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const user = await userService.getProfile(req.user.id);

            res.json({ success: true, user });
        } catch (err) {
            next(err);
        }
    },

    async editProfile(
        req: ICustomReq<IEditUser>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const attrs = req.body;
            const user = await userService.editProfile(req.user.id, attrs);

            res.json({ success: true, user });
        } catch (err) {
            next(err);
        }
    }
}