import { Router } from 'express';

import authMiddleware from '../middlewares/auth/index';
import roleMiddleware from '../middlewares/role/index';
import storeController from '../controllers/store.controller';


const storeRouter = Router();


storeRouter.post(
    '/',
    authMiddleware.authToken,
    roleMiddleware('seller'),
    storeController.create
);

storeRouter.patch(
    '/',
    authMiddleware.authToken,
    roleMiddleware('seller'),
    storeController.edit
);

export default storeRouter;