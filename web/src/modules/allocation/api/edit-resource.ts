import { type EditResourceSchema } from '@/modules/allocation/form';
import { request } from '@/modules/api/request';
import { Method } from '@/modules/api/model';

export const editResource = async (resource: EditResourceSchema) => {
	const { id, ...values } = resource;
	await request(`/resource/${id}`, {
		method: Method.POST,
		body: JSON.stringify(values)
	});
};
