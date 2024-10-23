import { useQuery } from '@tanstack/react-query';

import { request } from '@/modules/api/request';
import { type ResourceDetail } from '@/modules/resource/model';

export const useResourceDetailQuery = (id: number | null) =>
	useQuery({
		queryKey: ['resource', id],
		queryFn: () => request<ResourceDetail>(`/resource/${id}`),
		enabled: !!id
	});
