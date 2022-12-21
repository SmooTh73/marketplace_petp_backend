export interface IBaseStore {
    name: string;
    description: string;
    logo: string;
}

export interface IStoreCreationAttrs extends IBaseStore {
    userId: string;
}

export class IStoreId {
    storeId: string;
}