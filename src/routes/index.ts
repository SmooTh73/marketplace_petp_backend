import { Router } from "express";
import userRouter from './user.router';
import authRouter from "./auth.router";
import storeRouter from './store.router';
import adminRouter from './admin.router';

const apiRouter = Router();


apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/store', storeRouter);
apiRouter.use('/admin', adminRouter);


export default apiRouter;