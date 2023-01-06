import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'admin' })
export default class Admin extends Model<Admin> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id: string;

    @Column({ type: DataType.STRING, unique: true })
    nickname: string;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    surname: string;

    @Column({ type: DataType.STRING })
    password: string;
}