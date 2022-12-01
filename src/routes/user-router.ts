import { Router } from 'express';
import userController from '../controllers/user.controller';
import validationMiddleware from '../middlewares/validation/index';
import userSchema from '../validation/user/user-object-schema';
import authMiddleware from '../middlewares/auth/index';
import roleMiddleware from '../middlewares/role/index';

const userRouter = Router();

//________________POST_______________//
userRouter.post(
    '/register',
    validationMiddleware(userSchema, 'body'),
    userController.register
);

userRouter.post(
    '/create-store',
    authMiddleware.authToken,
    roleMiddleware('seller'),
    userController.createStore
);

userRouter.get(
    '/',
    authMiddleware.authToken,
    userController.getProfile
);


export default userRouter;