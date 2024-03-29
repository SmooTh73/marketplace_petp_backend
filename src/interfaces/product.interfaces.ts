export interface IBaseProduct {
    title: string;
    description: string;
    text: string;
    amount: number;
    price: number;
    image: string;
    brandId: string;
    categoryId: string;
    storeId: string;
}

export interface ICreateProduct extends Omit<IBaseProduct, 'storeId'> {

}