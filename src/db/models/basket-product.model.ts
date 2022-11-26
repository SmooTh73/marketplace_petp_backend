import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Basket from './basket.model';
import Product from './product.model';


@Table({ tableName: 'basket_product', createdAt: false, updatedAt: false })
export default class BasketProduct extends Model<BasketProduct> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true, unique: true })
    id: string;

    @ForeignKey(() => Basket)
    @Column({ type: DataType.UUID })
    basketId: string;

    @BelongsTo(() => Basket)
    basket: Basket;

    @ForeignKey(() => Product)
    @Column({ type: DataType.UUID })
    productId: string;

    @BelongsTo(() => Product)
    product: Product;
}