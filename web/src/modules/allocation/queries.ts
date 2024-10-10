import { useQuery } from '@tanstack/react-query';

import { resourceTypes } from '@/modules/allocation/api/resource-types';
import { resourceDetail } from '@/modules/allocation/api/resource-detail';

import { resources } from './api/resources';

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

export const useResourceDetailQuery = (id: number) =>
	useQuery({
		queryKey: ['resource', id],
		queryFn: () => resourceDetail(id)
	});
