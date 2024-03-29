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

userRouter.get(
    '/',
    authMiddleware.authToken,
    userController.getProfile
);

userRouter.patch(
    '/',
    authMiddleware.authToken,
    userController.editProfile
);

userRouter.post(
    '/contact-info',
    authMiddleware.authToken,
    userController.createContactInfo
);

userRouter.delete(
    '/contact-info',
    authMiddleware.authToken,
    roleMiddleware('customer'),
    userController.deleteContactInfo
);


export default userRouter;