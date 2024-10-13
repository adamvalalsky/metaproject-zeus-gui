import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';
import { type AddResourceSchema } from '@/modules/allocation/form';

export const createResource = async (values: AddResourceSchema) => {
	await request('/resource', {
		method: Method.POST,
		body: JSON.stringify(values)
	});
};
