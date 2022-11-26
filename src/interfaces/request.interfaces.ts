import { IBaseRequest } from "../controllers/interfaces";
import { Request } from "express";


export interface ICustomReq<B> extends Request, IBaseRequest {
    body: B;
}