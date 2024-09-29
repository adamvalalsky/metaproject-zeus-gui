import { ApiClientError, type ApiClientErrorResponse, type ApiResponse, Method } from '@/modules/api/model';
import userManager from '@/modules/auth/config/user-manager';

export const request = <T>(url: string, init?: RequestInit, headersAutoGenerate = false): Promise<ApiResponse<T>> =>
	requestWrapper<T>(url, createApiResponse, init, headersAutoGenerate);

export const download = (url: string, init?: RequestInit) =>
	requestWrapper<Blob>(
		url,
		async response => {
			const blob = await response.blob();

			return {
				status: response.status,
				data: blob
			};
		},
		init,
		true
	);

const requestWrapper = async <T>(
	url: string,
	postRequestAction: (response: Response) => Promise<{ status: number; data: unknown }>,
	init?: RequestInit,
	headersAutoGenerate = false
): Promise<ApiResponse<T>> => {
	const abortController = new AbortController();
	const signal = abortController.signal;

	const defaultHeaders: Record<string, string> = {};

	// force application/json content type
	if (!headersAutoGenerate) {
		defaultHeaders['Content-Type'] = 'application/json';
	}

	const user = await userManager.getUser();
	const accessToken = user?.access_token;
	if (accessToken) {
		defaultHeaders.Authorization = `Bearer ${accessToken}`;
	}

	return fetch(import.meta.env.VITE_API_URL + url, {
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
			return postRequestAction(response);
		})
		.catch(error => {
			throw error;
		}) as Promise<ApiResponse<T>>;
};

const createApiResponse = async (response: Response): Promise<{ status: number; data: unknown }> => {
	const data = await response.text();

	try {
		return {
			status: response.status,
			data: JSON.parse(data)
		};
	} catch (e) {
		return {
			status: response.status,
			data
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
