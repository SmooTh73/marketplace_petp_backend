import db from '../../db/all-models';
import Brand from 'src/db/models/brand.model';
import { IBaseBrand } from 'src/interfaces/brand.interfaces';


export default {
    async create(
        attrs: IBaseBrand,
        categoryId: string
    ): Promise<Brand> {
        const brand = await db.Brand.create(attrs);
        await db.CategoryBrand.create({ brandId: brand.id, categoryId });
        return brand;
    },


}