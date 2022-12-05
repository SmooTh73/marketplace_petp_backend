import { Response, NextFunction } from "express";
import { ICustomReq } from "../interfaces/request.interfaces";
import userService from '../services/userService/index';
import { IBaseUser } from '../interfaces/user.interfaces';
import { IReqWithToken } from './interfaces';
import { IEditUser } from '../services/userService/interfaces';
import constants from '../constants';


export default {
    async register(
        req: ICustomReq<IBaseUser>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const data = req.body;

            const tokens = await userService.register(data);
            res
            .cookie('refreshUserToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            .status(constants.statusCode.CREATED)
            .json({ success: true, accessToken: tokens.accessToken });
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