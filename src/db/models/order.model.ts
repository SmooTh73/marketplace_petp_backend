import { Column, DataType, Table, Model, ForeignKey, BelongsTo, HasMany, HasOne } from 'sequelize-typescript';
import { IBaseOrder } from '../../interfaces/order.interfaces';
import OrderProduct from './order-product.model';
import User from './user.model';
import ContactInfo from './contact-info.model';


@Table({ tableName: 'order' })
export default class Order extends Model<Order, IBaseOrder> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true, primaryKey: true })
    id: string;

    @Column({ type: DataType.FLOAT, validate: { min: 0 }, allowNull: false })
    total: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => OrderProduct)
    order_products: OrderProduct[];

    @ForeignKey(() => ContactInfo)
    @Column({ type: DataType.UUID})
    contactInfoId: string;

    @BelongsTo(() => ContactInfo)
    contactInfo: ContactInfo;
}