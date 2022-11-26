import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { IBaseToken } from '../../interfaces/token.interfaces';
import User from './user.model';


@Table({ tableName: 'token' })
export default class Token extends Model<Token, IBaseToken> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true, primaryKey: true })
    id: string;

    @Column({ type: DataType.STRING })
    refreshToken: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @BelongsTo(() => User)
    user: User;
}