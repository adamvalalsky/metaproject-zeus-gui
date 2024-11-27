import { useQuery } from '@tanstack/react-query';

import type { Pagination, PaginationResponse } from '@/modules/api/pagination/model';
import { request } from '@/modules/api/request';
import type { AllocationAdmin } from '@/modules/allocation/model';

export const useAllAllocationsQuery = (pagination: Pagination, sortSelector: string) =>
	useQuery({
		queryKey: ['allocations', pagination.page, pagination.limit, sortSelector],
		queryFn: () =>
			request<PaginationResponse<AllocationAdmin>>(
				`/allocation/all?page=${pagination.page}&limit=${pagination.limit}&sort=${sortSelector}`
			)
	});

export const useAllocationsRequestsQuery = (pagination: Pagination, sortSelector: string) =>
	useQuery({
		queryKey: ['allocations', 'requests', pagination.page, pagination.limit, sortSelector],
		queryFn: () =>
			request<PaginationResponse<AllocationAdmin>>(
				`/allocation/all?page=${pagination.page}&limit=${pagination.limit}&sort=${sortSelector}&status=new`
			)
	});
