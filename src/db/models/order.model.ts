import { Column, DataType, Table, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { IBaseOrder } from '../../interfaces/order.interfaces';
import OrderProduct from './order-product.model';
import User from './user.model';


@Table({ tableName: 'order' })
export default class Order extends Model<Order, IBaseOrder> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true, primaryKey: true })
    id: string;

    @Column({ type: DataType.INTEGER, validate: { min: 0 }, allowNull: false })
    total: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => OrderProduct)
    order_products: OrderProduct[];
}