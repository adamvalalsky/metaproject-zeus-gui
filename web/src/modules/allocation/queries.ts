import { useQuery } from '@tanstack/react-query';

import { resourceTypes } from '@/modules/allocation/api/resource-types';

export const useResourceTypesQuery = () =>
	useQuery({
		queryKey: ['resource-type'],
		queryFn: () => resourceTypes()
	});
