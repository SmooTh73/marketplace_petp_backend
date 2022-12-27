import { Router } from 'express';

import authMiddleware from '../middlewares/auth/index';
import roleMiddleware from '../middlewares/role/index';
import productController from '../controllers/product.controller';
import reviewController from '../controllers/review.controller';
import orderController from '../controllers/order.controller';


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
    '/',
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

productRouter.post(
    '/to-basket',
    authMiddleware.authToken,
    roleMiddleware('customer'),
    productController.addToBasket
);

productRouter.delete(
    '/from-basket',
    authMiddleware.authToken,
    roleMiddleware('customer'),
    productController.removeFromBasket
);

productRouter.get(
    '/basket/all',
    authMiddleware.authToken,
    roleMiddleware('customer'),
    productController.getAllFromBasket
);

productRouter.post(
    '/order/basket',
    authMiddleware.authToken,
    roleMiddleware('customer'),
    orderController.createFromBasket
);

productRouter.get(
    '/order/products/:id',
    authMiddleware.authToken,
    orderController.getOrderProducts
);

export default productRouter;