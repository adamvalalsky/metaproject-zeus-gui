import { useQuery } from '@tanstack/react-query';

import { request } from '@/modules/api/request';
import { type ResourceType } from '@/modules/resource/model';

export const useResourceTypesQuery = () =>
	useQuery({
		queryKey: ['resource-type'],
		queryFn: () => request<ResourceType[]>('/resource-type')
	});
