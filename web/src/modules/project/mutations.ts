import { useMutation } from '@tanstack/react-query';

import fetch from '@/modules/api/request';
import { type ApiResponse, Method } from '@/modules/api/model';
import type { Project } from '@/modules/project/model';
import { type RequestProjectSchema } from '@/modules/project/form';

export const useAddProjectMutation = () =>
	useMutation({
		mutationFn: async (values: RequestProjectSchema) => {
			const response = (await fetch('/project', {
				method: Method.POST,
				body: JSON.stringify({
					title: values.title,
					description: values.description
				})
			})) as ApiResponse<Project>;

			return response.data?.id;
		}
	});
