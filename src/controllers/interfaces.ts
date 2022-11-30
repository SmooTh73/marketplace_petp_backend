import { Request } from "express";


export interface IBaseRequest {
    id: string;
    role: string;
}

export interface IReqWithToken extends Request {
    user: IBaseRequest;
}