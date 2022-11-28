import { Request } from "express";


export interface IBaseRequest {
    id: string;
}

export interface IReqWithToken extends Request {
    user: IBaseRequest;
}