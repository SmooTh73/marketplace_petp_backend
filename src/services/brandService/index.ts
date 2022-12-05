import db from '../../db/all-models';
import Brand from '../../db/models/brand.model';
import { IBaseBrand } from '../../interfaces/brand.interfaces';
import Category from '../../db/models/category.model';


export default {
    async create(
        attrs: IBaseBrand,
        categoryId: string
    ): Promise<Brand> {
        const brand = await db.Brand.create(attrs);
        await db.CategoryBrand.create({ brandId: brand.id, categoryId });
        return brand;
    },

    async getAll(): Promise<Brand[]> {
        return await db.Brand.findAll({ attributes: { exclude: ['updatedAt', 'createdAt']}, include: Category });
    }
}