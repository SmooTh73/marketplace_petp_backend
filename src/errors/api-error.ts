import constants from "../constants/index";


export default class ApiError extends Error {
    status: number;

    errors: Error[];

    constructor(status: number, message: string, errors?: Error[] | []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static unauthorized(message?: string, errors?: Error[] | []) {
        return new ApiError(
            constants.statusCode.UNAUTHORIZED,
            message,
            errors
        );
    }

    static badRequest(message?: string, errors?: Error[] | []) {
        return new ApiError(
            constants.statusCode.BAD_REQUEST,
            message,
            errors
        );
    }

    static forbidden(message?: string, errors?: Error[] | []) {
        return new ApiError(
            constants.statusCode.FORBIDDEN,
            message,
            errors
        );
    }

    static notFound(message?: string, errors?: Error[] | []) {
        return new ApiError(
            constants.statusCode.NOT_FOUND,
            message,
            errors
        );
    }
}