import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Brand from './brand.model';
import Category from './category.model';


@Table({ tableName: 'category_brand', createdAt: false, updatedAt: false })
export default class CategoryBrand extends Model<CategoryBrand> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true, unique: true })
    id: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.UUID })
    categoryId: string;

    @ForeignKey(() => Brand)
    @Column({ type: DataType.UUID })
    brandId: string;
} 