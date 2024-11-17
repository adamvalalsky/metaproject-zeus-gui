import { useQuery } from '@tanstack/react-query';

import type { Pagination, PaginationResponse } from '@/modules/api/pagination/model';
import { request } from '@/modules/api/request';
import type { Allocation } from '@/modules/allocation/model';

export const useProjectAllocationsQuery = (projectId: number, pagination: Pagination, sortSelector: string) =>
	useQuery({
		queryKey: ['project', projectId, 'allocations', pagination.page, pagination.limit, sortSelector],
		queryFn: () =>
			request<PaginationResponse<Allocation>>(
				`/allocation/list/${projectId}?page=${pagination.page}&limit=${pagination.limit}&sort=${sortSelector}`
			)
	});
