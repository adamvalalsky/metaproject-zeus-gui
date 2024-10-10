import { type ApiResponse } from '@/modules/api/model';
import { request } from '@/modules/api/request';
import { type ResourceAttribute } from '@/modules/allocation/model';

export const resourceAttributes = async () => {
	const response = (await request('/resource/attributes')) as ApiResponse<ResourceAttribute[]>;
	return response.data;
};
