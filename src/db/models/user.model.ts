import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import Basket from './basket.model';
import Order from './order.model';
import Review from './review.model';
import Store from './store.model';
import Token from './token.model';
import { IBaseUser } from '../../interfaces/user.interfaces';


@Table({ tableName: 'user'})
export default class User extends Model<User, IBaseUser> {
    @Column({ type: DataType.UUID, unique: true, defaultValue: DataType.UUIDV4, primaryKey: true })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false})
    surname: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: false })
    role: string;

    @HasOne(() => Store)
    store: Store;

    @HasOne(() => Token)
    token: Token;

    @HasOne(() => Basket)
    basket: Basket;

    @HasMany(() => Order)
    orders: Order[];

    @HasMany(() => Review)
    reviews: Review[];
}