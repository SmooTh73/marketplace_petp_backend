import { BelongsTo, Column, DataType, ForeignKey, Index, Model, Table } from 'sequelize-typescript';
import { IBaseReview } from '../../interfaces/review.interfaces';
import Product from './product.model';
import User from './user.model';


@Table({ tableName: 'review'})
export default class Review extends Model<Review, IBaseReview> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true, primaryKey: true })
    id: string;

    @Column({ type: DataType.FLOAT, validate: { min: 0, max: 5 }, allowNull: false })
    rating: number;

    @Index({
        name: 'unique_review',
        unique: true
    })
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @Index('unique_review')
    @ForeignKey(() => Product)
    @Column({ type: DataType.UUID })
    productId: string;

    @BelongsTo(() => Product)
    product: Product;
}