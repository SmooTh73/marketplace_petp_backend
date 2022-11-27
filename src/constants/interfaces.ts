interface IStatusCodes {
	OK: number;
	CREATED: number;
	BAD_REQUEST: number;
	UNAUTHORIZED: number;
	FORBIDDEN: number;
	SERVER_ERROR: number;
	NOT_FOUND: number;
}

export interface IConstants {
    statusCode: IStatusCodes;
}