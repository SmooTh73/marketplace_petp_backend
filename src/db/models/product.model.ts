import { Column, DataType, Table, Model, ForeignKey, BelongsTo, HasOne, HasMany } from 'sequelize-typescript';
import { IBaseProduct } from '../../interfaces/product.interfaces';
import BasketProduct from './basket-product.model';
import Brand from './brand.model';
import Category from './category.model';
import Review from './review.model';
import Store from './store.model';


@Table({ tableName: 'product' })
export default class Product extends Model<Product, IBaseProduct> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true, primaryKey: true })
    id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @Column({ type: DataType.STRING })
    text: string;
    
    @Column({ type: DataType.INTEGER, validate: { min: 0 }, allowNull: false })
    amount: number;

    @Column({ type: DataType.FLOAT, validate: { min: 0 }, allowNull: false})
    price: number; 
    
    @Column({ type: DataType.STRING })
    image: string;

    @ForeignKey(() => Store)
    @Column({ type: DataType.UUID })
    storeId: string;

    @BelongsTo(() => Store)
    store: Store;

    @ForeignKey(() => Category)
    @Column({ type: DataType.UUID })
    categoryId: string;

    @BelongsTo(() => Category)
    category: Category;

    @ForeignKey(() => Brand)
    @Column({ type: DataType.UUID })
    brandId: string;

    @BelongsTo(() => Brand)
    brand: Brand;

    @HasOne(() => BasketProduct)
    basket_product: BasketProduct;

    @HasMany(() => Review)
    reviews: Review;
}