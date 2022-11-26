import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Order from './order.model';


@Table({ tableName: 'order_product' })
export default class OrderProduct extends Model<OrderProduct> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true, unique: true })
    id: string;

    @ForeignKey(() => Order)
    @Column({ type: DataType.UUID })
    orderId: string;

    @BelongsTo(() => Order)
    order: Order;
}