import db from '../../db/all-models';
import Category from '../../db/models/category.model';
import { IBaseCategory } from '../../interfaces/category.interfaces';


export default {
    async create(
        attrs: IBaseCategory
    ): Promise<Category> {
        return await db.Category.create(attrs);
    }
}