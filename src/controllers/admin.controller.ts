import { NextFunction, Request, Response } from 'express';
import categoryService from '../services/categoryService';
import brandService from '../services/brandService';
import constants from '../constants';
import adminService from '../services/adminService';


export default {
    async createAdmin(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const tokens = await adminService.create(req.body);;

            res.status(constants.statusCode.CREATED).json({ success: true, token: tokens.accessToken });
        } catch (err) {
            next(err);
        }
    },

    async createBrand(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { name, categoryId } = req.body;

            const brand = await brandService.create({ name }, categoryId);

            res.status(constants.statusCode.CREATED).json({ success: true, brand });
        } catch (err) {
            next(err);
        }
    },

    async createCategory(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const category = await categoryService.create(req.body);

            res.status(constants.statusCode.CREATED).json({ success: true, category });
        } catch (err) {
            next(err);
        }
    },



}