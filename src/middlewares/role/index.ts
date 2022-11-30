import { Response, NextFunction } from 'express';
import { EUserRole } from 'src/config/enums';
import { IReqWithToken } from 'src/controllers/interfaces';

import ApiError from '../../errors/api-error';


export default (role: keyof typeof EUserRole) => async (
    req: IReqWithToken,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (req.user.role !== role) {
            throw ApiError.forbidden();
        }
        next();
    } catch (err) {
        next(ApiError.forbidden(`Only ${role} can do it!`));
    }
}