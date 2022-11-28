import { EUserRole } from '../config/enums';

export interface IBaseUser {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: EUserRole;
}