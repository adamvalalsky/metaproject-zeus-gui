import { type ApiResponse } from '@/modules/api/model';
import { request } from '@/modules/api/request';
import { type ResourceDetail } from '@/modules/allocation/model';

export const resourceDetail = async (id: number | null) => {
	const response = (await request(`/resource/${id}`)) as ApiResponse<ResourceDetail>;
	return response.data;
};
