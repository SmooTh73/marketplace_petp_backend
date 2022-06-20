import { Request, Response, NextFunction } from 'express';

import db from '../../db/all-models';
import getToken from '../../helpers/tokenHelpers/get-token';
import verifyToken from '../../helpers/tokenHelpers/verify-token';
import ApiError from '../../errors/api-error';
import { IReqWithToken } from '../../controllers/interfaces';


export default { 
    async authToken(
        req: IReqWithToken,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            if (!req.headers.authorization) throw ApiError.unauthorized('No auth headers');

            const accessToken = getToken(req);
            if (!accessToken) throw ApiError.unauthorized('No token');

            const verifiedData = verifyToken(accessToken, 'user_access_secret');
            if (!verifiedData) throw ApiError.unauthorized('Invalid access token');

            req.user = verifiedData;
            next();
        } catch (err) {
            next(ApiError.unauthorized(err.message, [err]));
        }
    }
}