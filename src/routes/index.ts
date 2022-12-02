import { Router } from "express";
import userRouter from './user.router';
import authRouter from "./auth.router";
import storeRouter from './store.router';

const apiRouter = Router();


apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/store', storeRouter);


export default apiRouter;