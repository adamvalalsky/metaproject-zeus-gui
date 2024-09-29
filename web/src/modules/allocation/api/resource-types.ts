import { type ApiResponse } from '@/modules/api/model';
import { request } from '@/modules/api/request';
import { type ResourceType } from '@/modules/allocation/model';

export const resourceTypes = async () => {
	const response = (await request('/resource-type')) as ApiResponse<ResourceType[]>;
	return response.data;
};
