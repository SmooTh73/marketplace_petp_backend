export interface ICreateContactInfo extends IAttrsContactInfo {
    userId: string;
}

export interface IAttrsContactInfo {
    name: string;
    surname: string;
    city: string;
    phone: string;
    address: string;
}