import { useMutation } from '@tanstack/react-query';

import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';
import { type AddResourceSchema } from '@/modules/allocation/form';

export const useCreateResourceMutation = () =>
	useMutation({
		mutationFn: (values: AddResourceSchema) =>
			request('/resource', {
				method: Method.POST,
				json: values
			})
	});
