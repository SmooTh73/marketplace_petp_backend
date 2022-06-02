import { Router } from "express";
import userRouter from './user-router';

const apiRouter = Router();


apiRouter.use('/user', userRouter);

export default apiRouter;