import { getLoggedUserToken } from '@/modules/auth/methods/getLoggedUserToken';
import {
	ApiClientError,
	type ApiClientErrorResponse,
	type ApiRequestPromise,
	type ApiResponse,
	Method
} from '@/modules/api/model';

const request = (url: string, init?: RequestInit): ApiRequestPromise<ApiResponse> => {
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
		}) as ApiRequestPromise<ApiResponse>;

	promise.cancel = () => abortController.abort();

	return promise;
};

const createApiResponse = async (response: Response): Promise<{ status: number; data: unknown }> => ({
	status: response.status,
	data: await response.json()
});

export default request;
