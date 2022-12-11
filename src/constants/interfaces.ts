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
	SORT: boolean;
	SORT_TYPE: string;
}

export interface IConstants {
    statusCode: IStatusCodes;
	searchOptions: IDefaultSearchOptions;
}