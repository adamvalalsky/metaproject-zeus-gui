import { useQuery } from '@tanstack/react-query';

import { resourceAttributes } from '@/modules/attribute/api/resource-attributes';

export const useResourceAttributesQuery = () =>
	useQuery({
		queryKey: ['resource-attributes'],
		queryFn: () => resourceAttributes()
	});
