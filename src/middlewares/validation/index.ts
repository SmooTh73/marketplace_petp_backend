import yup from 'yup';
import { Request, Response, NextFunction } from 'express';

import { EValidationType } from './enums';
import ApiError from '../../errors/api-error';


export default (schema: yup.BaseSchema, type: keyof typeof EValidationType) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
                await schema.validate(req[type]);
                next();
        } catch (err) {
            next(ApiError.badRequest(`${type} error: ${err.message}`));
        }
    }