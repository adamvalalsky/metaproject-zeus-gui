export enum Method {
	GET = 'get',
	POST = 'post'
}

export type ApiResponse<T = unknown> = {
	readonly status: number;
	readonly data: T;
};

export type ApiClientErrorResponse = {
	readonly data: {
		readonly code: number;
		readonly message: string;
	};
} & ApiResponse;

export type ApiRequestPromise<T> = {
	cancel: () => void;
} & Promise<T>;

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
