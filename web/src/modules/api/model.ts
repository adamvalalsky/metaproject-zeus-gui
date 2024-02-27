export enum Method {
	GET = 'get',
	POST = 'post'
}

export interface ApiResponse<T = unknown> {
	readonly status: number;
	readonly data?: T;
}

export interface ApiClientErrorResponse extends ApiResponse {
	readonly data: {
		readonly code: number;
		readonly message: string;
	};
}

export interface ApiRequestPromise<T> extends Promise<T> {
	cancel: () => void;
}

export class ApiClientError extends Error {
	constructor(
		m: string,
		readonly response: ApiClientErrorResponse
	) {
		super(m);
		this.name = 'ApiClientError';
		Object.setPrototypeOf(this, ApiClientError.prototype);
	}
}
