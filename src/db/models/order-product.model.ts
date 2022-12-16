import { BelongsTo, Column, DataType, ForeignKey, Index, Model, Table } from 'sequelize-typescript';
import Order from './order.model';
import Product from './product.model';


@Table({ tableName: 'order_product' })
export default class OrderProduct extends Model<OrderProduct> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true, unique: true })
    id: string;

    @Column({ type: DataType.INTEGER, allowNull: false, validate: { min: 1 } })
    amount: number;

    @Index({
        name: 'unique_order_product',
        unique: true
    })
    @ForeignKey(() => Order)
    @Column({ type: DataType.UUID })
    orderId: string;

    @BelongsTo(() => Order)
    order: Order;

    @Index('unique_order_product')
    @ForeignKey(() => Product)
    @Column({ type: DataType.UUID })
    productId: string;

    @BelongsTo(() => Product)
    product: Product;
}