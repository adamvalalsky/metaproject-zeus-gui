import { useMutation } from '@tanstack/react-query';

import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';
import { type ApproveAllocationSchema } from '@/modules/allocation/form';

type RequestAllocationSchema = ApproveAllocationSchema & {
	allocationId: number;
};

const approveAllocation = async (values: RequestAllocationSchema) => {
	const { allocationId, ...data } = values;
	await request(`/allocation/detail/${allocationId}`, {
		method: Method.POST,
		json: data
	});
};

export const useApproveAllocationMutation = () =>
	useMutation({
		mutationFn: approveAllocation
	});
