import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';
import { type AddAttributeSchema } from '@/modules/attribute/form';

export const createAttribute = async (values: AddAttributeSchema) => {
	await request('/resource-type', {
		method: Method.POST,
		body: JSON.stringify(values)
	});
};
