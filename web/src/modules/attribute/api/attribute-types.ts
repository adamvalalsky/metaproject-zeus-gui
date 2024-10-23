import { useQuery } from '@tanstack/react-query';

import { request } from '@/modules/api/request';
import { type AttributeType } from '@/modules/attribute/model';

export const useAttributeTypesQuery = () =>
	useQuery({
		queryKey: ['attribute-types'],
		queryFn: () => request<AttributeType[]>('/attribute-type')
	});
