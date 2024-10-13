import ky, { type KyResponse, type Options } from 'ky';
import { type KyHeadersInit } from 'ky/distribution/types/options';

import { Method } from '@/modules/api/model';
import userManager from '@/modules/auth/config/user-manager';

export const request = async <T>(url: string, init?: Options): Promise<T> => {
	const request = await requestWrapper<T>(url, init);
	return request.json();
};

export const download = async (url: string, init?: RequestInit) => {
	const request = await requestWrapper<Blob>(url, init);
	return request.blob();
};

const requestWrapper = async <T>(url: string, init?: Options): Promise<KyResponse<T>> => {
	const abortController = new AbortController();
	const signal = abortController.signal;

	const defaultHeaders: Record<string, string> = {};

	const user = await userManager.getUser();
	const accessToken = user?.access_token;
	if (accessToken) {
		defaultHeaders.Authorization = `Bearer ${accessToken}`;
	}

	return ky<T>(import.meta.env.VITE_API_URL + url, {
		method: Method.GET,
		signal,
		...init,
		headers: {
			...defaultHeaders,
			...getHeaders(init?.headers)
		}
	});
};

const getHeaders = (headers?: KyHeadersInit): Record<string, string> => {
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
