export interface IBaseReview {
    rating: number;
    productId: string;
    userId: string;
}

export interface ICreateReview extends Omit<IBaseReview, 'userId'> {
    
}