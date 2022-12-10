import { ICreateReview, IEditReview } from '../../interfaces/review.interfaces';
import db from '../../db/all-models';
import Review from '../../db/models/review.model';
import sequelize from 'sequelize';


export default {
    async create(
        userId: string,
        attrs: ICreateReview
    ): Promise<Review> {
        return await db.Review.create({...attrs, userId });
    },

    async edit(
        attrs: IEditReview
    ): Promise<Review> {
        const [, review] = await db.Review.update(
            { rating: attrs.rating },
            { where: { id: attrs.id }, returning: true }
        );
        return review[0];
    },

    async getMany(
        productId: string,
    ): Promise<Review[]> {
        return await db.Review.findAll({ 
            where: { productId },
            order: [['createdAt', 'DESC']]
        });
    }
}