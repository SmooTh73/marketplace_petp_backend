import { Router } from 'express';
import adminController from '../controllers/admin.controller';


const adminRouter = Router();

adminRouter.post('/', adminController.createAdmin);

adminRouter.post('/create-brand', adminController.createBrand);

adminRouter.post('/create-category', adminController.createCategory);

export default adminRouter;