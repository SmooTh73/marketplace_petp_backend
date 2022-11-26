import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { IBaseBrand } from '../../interfaces/brand.interfaces';
import CategoryBrand from './category-brand.model';
import Category from './category.model';
import Product from './product.model';


@Table({ tableName: 'brand'})
export default class Brand extends Model<Brand, IBaseBrand> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true, primaryKey: true })
    id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @HasMany(() => Product)
    products: Product[];

    @BelongsToMany(() => Category, () => CategoryBrand)
    category: Category[];
}