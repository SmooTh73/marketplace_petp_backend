import { Request, Response, NextFunction } from "express";
import constants from "../constants";


export default (err, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error at: ${new Date()} ===> `, err.message);

    res.status(err.status || constants.statusCode.SERVER_ERROR).json({
        success: false,
        message: err.message || err,
    });
}