import { useMutation } from '@tanstack/react-query';

import { createAttribute } from '@/modules/attribute/api/create-attribute';

export const useCreateAttributeTypeMutation = () =>
	useMutation({
		mutationFn: createAttribute
	});
