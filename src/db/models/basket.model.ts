import { BelongsTo, Model, Column, DataType, ForeignKey, Table, HasMany } from 'sequelize-typescript';
import BasketProduct from './basket-product.model';
import User from './user.model';


@Table({ tableName: 'basket' })
export default class Basket extends Model<Basket> {
    @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
    id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => BasketProduct)
    basket_products: BasketProduct[];
}