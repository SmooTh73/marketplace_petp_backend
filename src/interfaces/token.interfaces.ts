import { EUserRole } from 'src/config/enums';

export interface IBaseToken {
    refreshToken: string;
    userId: string;
}

export interface ITokenPayload {
    id: string;
    role: EUserRole;
}

export interface IGeneratorRes {
    accessToken: string;
    refreshToken: string;
}