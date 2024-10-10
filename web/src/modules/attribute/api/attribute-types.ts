import { request } from '@/modules/api/request';
import type { ApiResponse } from '@/modules/api/model';
import { type AttributeType } from '@/modules/attribute/model';

export const attributeTypes = async () => {
	const response = (await request('/attribute-type')) as ApiResponse<AttributeType[]>;
	return response.data;
};
