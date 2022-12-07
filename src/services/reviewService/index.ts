import { ICreateReview } from '../../interfaces/review.interfaces';
import db from '../../db/all-models';
import Review from '../../db/models/review.model';


export default {
    async create(
        userId: string,
        attrs: ICreateReview
    ): Promise<Review> {
        return await db.Review.create({...attrs, userId });
    }
}