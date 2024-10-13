import { type ApiResponse } from '@/modules/api/model';
import { request } from '@/modules/api/request';
import { type Resource } from '@/modules/allocation/model';

export const resources = async () => {
	const response = (await request('/resource')) as ApiResponse<Resource[]>;
	return response.data;
};
