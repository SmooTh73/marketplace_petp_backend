import { IConstants } from "./interfaces";

const constants: IConstants = {
    statusCode: {
        OK: 200,
        CREATED: 201,
        FORBIDDEN: 403,
        SERVER_ERROR: 500,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        UNAUTHORIZED: 401
    },

    searchOptions: {
        PAGE: 1,
        LIMIT: 10,
        PRICE_RANGE: { low: 0, high: 60 },
        SORT: true,
        SORT_TYPE: 'rating',
    }
}

export default constants;