import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { IBaseStore } from '../../interfaces/store.interfaces';
import Product from './product.model';
import User from './user.model';
import OrderProduct from './order-product.model';


@Table({ tableName: 'store' })
export default class Store extends Model<Store, IBaseStore> {
    @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4})
    id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING })
    description: string;

    @Column({ type: DataType.STRING })
    logo: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => OrderProduct)
    order: OrderProduct[];

    @HasMany(() => Product)
    products: Product[];
}