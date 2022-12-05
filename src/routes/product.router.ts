import { Router } from 'express';

import authMiddleware from '../middlewares/auth/index';
import roleMiddleware from '../middlewares/role/index';
import productController from '../controllers/product.controller';



const productRouter = Router();


productRouter.post(
    '/',
    authMiddleware.authToken,
    roleMiddleware('seller'),
    productController.create
);

export default productRouter;