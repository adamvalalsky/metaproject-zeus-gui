import { useQuery } from '@tanstack/react-query';

import { request } from '@/modules/api/request';
import { type Resource } from '@/modules/resource/model';

export const useResourceListQuery = () =>
	useQuery({
		queryKey: ['resource'],
		queryFn: () => request<Resource[]>('/resource')
	});
