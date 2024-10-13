import { useQuery } from '@tanstack/react-query';

import { resourceTypes } from '@/modules/allocation/api/resource-types';
import { resourceDetail } from '@/modules/allocation/api/resource-detail';
import { type Pagination, type PaginationMetadata } from '@/modules/api/pagination/model';
import { request } from '@/modules/api/request';
import { type Allocation } from '@/modules/allocation/model';

import { resources } from './api/resources';

type AllocationResponse = {
	metadata: PaginationMetadata;
	allocations: Allocation[];
};

export const useResourceTypesQuery = () =>
	useQuery({
		queryKey: ['resource-type'],
		queryFn: () => resourceTypes()
	});

export const useResourceListQuery = () =>
	useQuery({
		queryKey: ['resource'],
		queryFn: () => resources()
	});

export const useResourceDetailQuery = (id: number | null) =>
	useQuery({
		queryKey: ['resource', id],
		queryFn: () => resourceDetail(id),
		enabled: !!id
	});

export const useProjectAllocationsQuery = (projectId: number, pagination: Pagination, sortSelector: string) =>
	useQuery({
		queryKey: ['project', projectId, 'allocations', pagination.page, pagination.limit, sortSelector],
		queryFn: () =>
			request<AllocationResponse>(
				`/allocation/list/${projectId}?page=${pagination.page}&limit=${pagination.limit}&sort=${sortSelector}`
			)
	});
