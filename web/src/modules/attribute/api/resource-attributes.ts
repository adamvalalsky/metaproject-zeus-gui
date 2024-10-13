import { useQuery } from '@tanstack/react-query';

import { request } from '@/modules/api/request';
import { type ResourceAttribute } from '@/modules/resource/model';

export const useResourceAttributesQuery = () =>
	useQuery({
		queryKey: ['resource-attributes'],
		queryFn: () => request<ResourceAttribute[]>('/resource/attributes')
	});
