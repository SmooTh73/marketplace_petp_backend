interface IStatusCodes {
	OK: number;
	CREATED: number;
	BAD_REQUEST: number;
	UNAUTHORIZED: number;
	FORBIDDEN: number;
	SERVER_ERROR: number;
	NOT_FOUND: number;
}

interface IDefaultSearchOptions {
	PAGE: number;
	LIMIT: number;
	PRICE_RANGE: { low: number; high: number; };
	ORDER: string;
	ORDER_DIRECTION: string;
	RATING: number;
}

export interface IConstants {
    statusCode: IStatusCodes;
	searchOptions: IDefaultSearchOptions;
}