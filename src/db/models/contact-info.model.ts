import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Order from './order.model';


@Table({ tableName: 'contact_info'})
export default class ContactInfo extends Model<ContactInfo> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    surname: string;

    @Column({ type: DataType.STRING, allowNull: false })
    city: string;

    @Column({ type: DataType.STRING, allowNull: false })
    phone: string;

    @Column({ type: DataType.STRING, allowNull: false })
    address: string;

    @ForeignKey(() => Order)
    @Column({ type: DataType.UUID })
    orderId: string

    @BelongsTo(() => Order)
    user: Order;
}