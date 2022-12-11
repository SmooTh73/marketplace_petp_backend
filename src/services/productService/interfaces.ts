export interface IEditProduct {
    title?: string;
    description?: string;
    text?: string;
    amount?: number;
    price?: number;
    image?: string;
}

export interface IEditProductReq {
    id: string;
    attrs: IEditProduct;
}

export interface ISearchOptions {
    limit?: number;
    title?: string;
    page?: number;
    priceRange?: { low: number; high: number; }
    category?: string;
    brands?: string[];
    sortType?: string;
    sort?: boolean;
}