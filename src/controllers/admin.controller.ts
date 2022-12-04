import { NextFunction, Request, Response } from 'express';
import categoryService from '../services/categoryService';
import brandService from '../services/brandService';


export default {
    async createBrand(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { name, categoryId } = req.body;

            const brand = await brandService.create({ name }, categoryId);

            res.status(201).json({ success: true, brand });
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

            res.status(201).json({ success: true, category });
        } catch (err) {
            next(err);
        }
    }
}

//How to create brand or category if none of them have not created?