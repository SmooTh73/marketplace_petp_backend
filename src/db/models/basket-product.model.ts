import { BelongsTo, Column, DataType, ForeignKey, Index, Model, Table } from 'sequelize-typescript';
import Basket from './basket.model';
import Product from './product.model';


@Table({ tableName: 'basket_product', createdAt: false, updatedAt: false })
export default class BasketProduct extends Model<BasketProduct> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true, unique: true })
    id: string;

    @Column({ type: DataType.INTEGER, allowNull: false, validate: { min: 1 } })
    amount: number;

    @Index({
        name: 'unique_basket_product',
        unique: true
    })
    @ForeignKey(() => Basket)
    @Column({ type: DataType.UUID })
    basketId: string;

    @BelongsTo(() => Basket)
    basket: Basket;

    @Index('unique_basket_product')
    @ForeignKey(() => Product)
    @Column({ type: DataType.UUID })
    productId: string;

    @BelongsTo(() => Product)
    product: Product;
}