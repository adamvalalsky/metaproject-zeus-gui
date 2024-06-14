import { getLoggedUserToken } from '@/modules/auth/methods/getLoggedUserToken';
import {
	ApiClientError,
	type ApiClientErrorResponse,
	type ApiRequestPromise,
	type ApiResponse,
	Method
} from '@/modules/api/model';

const request = <T>(url: string, init?: RequestInit): ApiRequestPromise<ApiResponse<T>> => {
	const abortController = new AbortController();
	const signal = abortController.signal;

	// TODO get user token correctly, maybe it will be saved somewhere else
	const userId = getLoggedUserToken();

	const defaultHeaders: Record<string, string> = {
		'Content-Type': 'application/json'
	};

	if (userId) {
		defaultHeaders['X-User-Id'] = userId;
	}

	const promise = fetch(import.meta.env.VITE_API_URL + url, {
		method: Method.GET,
		signal,
		...init,
		headers: defaultHeaders
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

const createApiResponse = async (response: Response): Promise<{ status: number; data: unknown }> => {
	const data = await response.text();

	if (!data) {
		return {
			status: response.status,
			data: null
		};
	}

	return {
		status: response.status,
		data: JSON.parse(data)
	};
};

export default request;
