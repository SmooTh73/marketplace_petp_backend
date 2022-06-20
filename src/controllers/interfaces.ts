import { Request } from "express";

import { EUserType } from "../config/enums";


export interface IBaseRequest {
    type?: keyof typeof EUserType;
    id: string;
}

export interface IReqWithToken extends Request {
    user: IBaseRequest;
}