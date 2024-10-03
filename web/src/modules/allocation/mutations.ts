import { useMutation } from '@tanstack/react-query';

import { createResource } from '@/modules/allocation/api/create-resource';

export const useCreateResourceMutation = () =>
	useMutation({
		mutationFn: createResource
	});
