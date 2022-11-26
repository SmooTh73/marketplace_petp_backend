import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { IBaseCategory } from '../../interfaces/category.interfaces';
import Brand from './brand.model';
import CategoryBrand from './category-brand.model';
import Product from './product.model';


@Table({ tableName: 'category' })
export default class Category extends Model<Category, IBaseCategory> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true, primaryKey: true })
    id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @HasMany(() => Product)
    products: Product[];

    @BelongsToMany(() => Brand, () => CategoryBrand)
    brand: Brand;
}