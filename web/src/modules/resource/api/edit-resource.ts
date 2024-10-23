import { useMutation } from '@tanstack/react-query';

import { type EditResourceSchema } from '@/modules/allocation/form';
import { request } from '@/modules/api/request';
import { Method } from '@/modules/api/model';

export const useEditResourceMutation = () =>
	useMutation({
		mutationFn: async (resource: EditResourceSchema) => {
			const { id, ...values } = resource;
			return request(`/resource/${id}`, {
				method: Method.POST,
				json: values
			});
		}
	});
