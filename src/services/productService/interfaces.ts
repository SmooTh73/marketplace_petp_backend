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