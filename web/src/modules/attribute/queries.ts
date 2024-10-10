import { useQuery } from '@tanstack/react-query';

import { resourceAttributes } from '@/modules/attribute/api/resource-attributes';
import { attributeTypes } from '@/modules/attribute/api/attribute-types';

export const useResourceAttributesQuery = () =>
	useQuery({
		queryKey: ['resource-attributes'],
		queryFn: () => resourceAttributes()
	});

export const useAttributeTypesQuery = () =>
	useQuery({
		queryKey: ['attribute-types'],
		queryFn: () => attributeTypes()
	});
