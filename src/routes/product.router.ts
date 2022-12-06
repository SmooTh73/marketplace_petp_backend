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

productRouter.patch(
    '/:id',
    authMiddleware.authToken,
    roleMiddleware('seller'),
    productController.edit
);

productRouter.delete(
    '/:id',
    authMiddleware.authToken,
    roleMiddleware('seller'),
    productController.delete
);

productRouter.get(
    '/:id',
    authMiddleware.authToken,
    productController.getOne
);

export default productRouter;