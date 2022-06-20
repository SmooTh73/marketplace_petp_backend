import * as jwt from 'jsonwebtoken';
import config from '../../config/index';
import { ETokenType } from '../../enums/token-enums';


export default (token: string, type: keyof typeof ETokenType): any => {
    const secret = config.jwt[type];
    return jwt.verify(token, secret);
}