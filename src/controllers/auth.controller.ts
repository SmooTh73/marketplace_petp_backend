import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/tokenService';
import authService from '../services/authService/index';


export default {
    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { email, password } = req.body;

            const tokens = await authService.login(email, password);
            res.cookie('refreshUserToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            }).json({ success: true, accessToken: tokens.accessToken });
        } catch (err) {
            next(err);
        }
    },

    async refresh(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const refreshToken = req.cookies.refreshUserToken;

            const tokens = await tokenService.refresh(refreshToken);
            res.cookie('refreshUserToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            }).json({ success: true, accessToken: tokens.accessToken });
        } catch (err) {
            next(err);
        }
    }
}