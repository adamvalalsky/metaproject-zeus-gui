import type { RequestProjectSchema } from '@/modules/project/form';
import { type ApiResponse, Method } from '@/modules/api/model';
import type { Project } from '@/modules/project/model';
import { request } from '@/modules/api/request';

export const addProject = async (values: RequestProjectSchema) => {
	const response = (await request('/project', {
		method: Method.POST,
		body: JSON.stringify({
			title: values.title,
			link: values.link,
			description: values.description
		})
	})) as ApiResponse<Project>;

	return response.data?.id;
};
