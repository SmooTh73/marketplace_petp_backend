import { Router } from 'express';

import authMiddleware from '../middlewares/auth/index';
import roleMiddleware from '../middlewares/role/index';
import productController from '../controllers/product.controller';
import reviewController from '../controllers/review.controller';


const productRouter = Router();

productRouter.post(
    '/',
    authMiddleware.authToken,
    roleMiddleware('seller'),
    productController.create
);

productRouter.patch(
    '/',
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
    '/own/:id',
    authMiddleware.authToken,
    roleMiddleware('seller'),
    productController.getOne
);

productRouter.get(
    '/:id',
    authMiddleware.authToken,
    productController.getOne
);

productRouter.get(
    '/many/get',
    productController.getMany
);

productRouter.post(
    '/review',
    authMiddleware.authToken,
    roleMiddleware('customer'),
    reviewController.create
);

productRouter.patch(
    '/review',
    authMiddleware.authToken,
    roleMiddleware('customer'),
    reviewController.edit
);

productRouter.get(
    '/review/many/:id',
    authMiddleware.authToken,
    reviewController.getMany
);

export default productRouter;