import { EOrder, EOrderDirection } from '../../enums/product-enums';

export interface IEditProduct {
    title?: string;
    description?: string;
    text?: string;
    amount?: number;
    price?: number;
    image?: string;
}

export interface IProductId {
    id: string;
}

export interface IEditProductReq extends IProductId {
    attrs: IEditProduct;
}

export interface ISearchOptions {
    limit?: number;
    title?: string;
    rating?: number;
    page?: number;
    priceRange?: { low: number; high: number; }
    category?: string;
    brands?: string[];
    orderDirection?: keyof typeof EOrderDirection;
    order?: keyof typeof EOrder;
}