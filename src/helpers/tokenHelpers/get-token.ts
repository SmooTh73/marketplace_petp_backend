import { Request } from "express";

export default (req: Request): string => {
    const authHeader = req.headers.authorization;
    const [ , token ] = authHeader && authHeader.split(' ');
    return token;
}