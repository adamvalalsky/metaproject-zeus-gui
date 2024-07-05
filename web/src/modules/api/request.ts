import { getLoggedUserToken } from '@/modules/auth/methods/getLoggedUserToken';
import {
	ApiClientError,
	type ApiClientErrorResponse,
	type ApiRequestPromise,
	type ApiResponse,
	Method
} from '@/modules/api/model';

const request = <T>(
	url: string,
	init?: RequestInit,
	headersAutoGenerate = false
): ApiRequestPromise<ApiResponse<T>> => {
	const abortController = new AbortController();
	const signal = abortController.signal;

	// TODO get user token correctly, maybe it will be saved somewhere else
	const userId = getLoggedUserToken();

	const defaultHeaders: Record<string, string> = {};

	// force application/json content type
	if (!headersAutoGenerate) {
		defaultHeaders['Content-Type'] = 'application/json';
	}

	if (userId) {
		defaultHeaders['X-User-Id'] = userId;
	}

	const promise = fetch(import.meta.env.VITE_API_URL + url, {
		method: Method.GET,
		signal,
		...init,
		headers: {
			...defaultHeaders,
			...getHeaders(init?.headers)
		}
	})
		.then(async (response: Response) => {
			if (!response.ok) {
				const errorResponse = await createApiResponse(response);

				const isApiError =
					errorResponse.data && typeof errorResponse.data === 'object' && 'message' in errorResponse.data;
				if (isApiError) {
					throw new ApiClientError('Api client error', errorResponse as ApiClientErrorResponse);
				}
			}
			return createApiResponse(response);
		})
		.catch(error => {
			throw error;
		}) as ApiRequestPromise<ApiResponse<T>>;

	promise.cancel = () => abortController.abort();

	return promise;
};

const createApiResponse = async (
	response: Response
): Promise<{ status: number; data: unknown; type: string | null }> => {
	const type = response.headers.get('Content-type');
	const data = await response.text();

	if (!data) {
		return {
			status: response.status,
			data: null,
			type
		};
	}

	try {
		return {
			status: response.status,
			data: JSON.parse(data),
			type
		};
	} catch (e) {
		return {
			status: response.status,
			data,
			type
		};
	}
};

const getHeaders = (headers?: HeadersInit): Record<string, string> => {
	if (!headers) {
		return {};
	}

	if (headers instanceof Headers) {
		const headersObject: Record<string, string> = {};
		headers.forEach((value, key) => {
			headersObject[key] = value;
		});
		return headersObject;
	}

	if (Array.isArray(headers)) {
		const headersObject: Record<string, string> = {};
		headers.forEach(header => {
			headersObject[header[0]] = header[1];
		});
		return headersObject;
	}

	return headers;
};

export default request;
