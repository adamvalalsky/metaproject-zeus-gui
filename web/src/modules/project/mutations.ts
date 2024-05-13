import { useMutation } from '@tanstack/react-query';

import fetch from '@/modules/api/request';
import { type ApiResponse, Method } from '@/modules/api/model';
import type { Project } from '@/modules/project/model';

export const useAddProjectMutation = () =>
	useMutation({
		mutationFn: async (formData: FormData) => {
			const response = (await fetch('/project', {
				method: Method.POST,
				body: JSON.stringify({
					title: formData.get('title'),
					description: formData.get('description')
				})
			})) as ApiResponse<Project>;

			return response.data?.id;
		}
	});
