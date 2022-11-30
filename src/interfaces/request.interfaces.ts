import { IBaseRequest, IReqWithToken } from "../controllers/interfaces";
import { Request } from "express";


export interface ICustomReq<B> extends IReqWithToken {
    body: B;
}