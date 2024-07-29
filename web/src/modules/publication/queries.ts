import { useQuery } from '@tanstack/react-query';

import type { Pagination, PaginationMetadata } from '@/modules/api/pagination/model';
import { type Publication } from '@/modules/publication/model';
import { request } from '@/modules/api/request';

type PublicationsList = {
	metadata: PaginationMetadata;
	publications: Publication[];
};

export const useProjectPublicationsQuery = (id: number, pagination: Pagination, sortSelector: string) =>
	useQuery({
		queryKey: ['project', id, 'publications', pagination.page, pagination.limit, sortSelector],
		queryFn: () =>
			request<PublicationsList>(
				`/publication/${id}?page=${pagination.page}&limit=${pagination.limit}&sort=${sortSelector}`
			)
	});
