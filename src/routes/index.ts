import { Router } from "express";
import userRouter from './user-router';
import authRouter from "./auth-router";

const apiRouter = Router();


apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;