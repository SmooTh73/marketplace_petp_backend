import { Router } from 'express';
import userController from '../controllers/user.controller';
import validationMiddleware from '../middlewares/validation/index';
import userSchema from '../validation/user/user-object-schema';
import userTypeSchema from '../validation/user/user-type-schema';


const userRouter = Router();

//________________POST_______________//
userRouter.post(
    '/register/:type',
    validationMiddleware(userSchema, 'body'),
    userController.register
);


export default userRouter;