import { IReqWithToken } from "../controllers/interfaces";


export interface ICustomReq<B> extends IReqWithToken {
    body: B;
}