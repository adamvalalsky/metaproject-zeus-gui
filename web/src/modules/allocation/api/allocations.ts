import { useQuery } from '@tanstack/react-query';

import type { Pagination, PaginationMetadata } from '@/modules/api/pagination/model';
import { request } from '@/modules/api/request';
import type { Allocation } from '@/modules/allocation/model';

type AllocationResponse = {
	metadata: PaginationMetadata;
	allocations: Allocation[];
};

export const useProjectAllocationsQuery = (projectId: number, pagination: Pagination, sortSelector: string) =>
	useQuery({
		queryKey: ['project', projectId, 'allocations', pagination.page, pagination.limit, sortSelector],
		queryFn: () =>
			request<AllocationResponse>(
				`/allocation/list/${projectId}?page=${pagination.page}&limit=${pagination.limit}&sort=${sortSelector}`
			)
	});
