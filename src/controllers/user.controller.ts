import { Response, NextFunction } from "express";
import { ICustomReq } from "src/interfaces/request.interfaces";
import userService from '../services/userService/index';
import { IBaseUser } from '../interfaces/user.interfaces';


export default {
    async register(
        req: ICustomReq<IBaseUser>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const data: IBaseUser = req.body;

            const tokens = await userService.register(data);
            res.cookie('refreshUserToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            }).status(201).json({ success: true, accessToken: tokens.accessToken });
        } catch (err) {
            next(err);
        }
    }
}