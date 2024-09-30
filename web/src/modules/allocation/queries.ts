import { useQuery } from '@tanstack/react-query';

import { resourceTypes } from '@/modules/allocation/api/resource-types';

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
