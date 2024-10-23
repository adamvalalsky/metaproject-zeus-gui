import { useMutation } from '@tanstack/react-query';

import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';
import { type AddAllocationSchema } from '@/modules/allocation/form';

type RequestAllocationSchema = AddAllocationSchema & {
	projectId: number;
};

const requestAllocation = async (values: RequestAllocationSchema) => {
	const { projectId, ...data } = values;
	await request(`/allocation/request/${projectId}`, {
		method: Method.POST,
		json: data
	});
};

export const useRequestAllocationMutation = () =>
	useMutation({
		mutationFn: requestAllocation
	});
