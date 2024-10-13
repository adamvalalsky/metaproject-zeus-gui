import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';
import { type AddAllocationSchema } from '@/modules/allocation/form';

type RequestAllocationSchema = AddAllocationSchema & {
	projectId: number;
};

export const requestAllocation = async (values: RequestAllocationSchema) => {
	const { projectId, ...data } = values;
	await request(`/allocation/request/${projectId}`, {
		method: Method.POST,
		body: JSON.stringify(data)
	});
};
