import { IBaseUser } from "../../interfaces/user.interfaces";


export interface ICustomer extends IBaseUser {

}

export interface IStoreOwner extends IBaseUser {
    
}

export interface IEditUser {
    name?: string;
    surname?: string;
}