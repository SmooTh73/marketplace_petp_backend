import { Response, NextFunction } from "express";
import { ICustomReq } from "src/interfaces/request-interfaces";
import { IBaseUser } from "../interfaces/user-interfaces";
import db from '../db/index';
import userService from '../services/userService/index';
import { EUserType } from "../config/enums";


export default {
    async register(
        req: ICustomReq<IBaseUser>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const data: IBaseUser = req.body;
            const type: keyof typeof EUserType = req.params.type as keyof typeof EUserType;

            const tokens = await userService.register(data, type);
            res.cookie('refreshUserToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            }).json({ success: true, accessToken: tokens.accessToken });
        } catch (err) {
            next(err);
        }
    }
}