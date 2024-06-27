import type { RequestProjectSchema } from '@/modules/project/form';
import fetch from '@/modules/api/request';
import { type ApiResponse, Method } from '@/modules/api/model';
import type { Project } from '@/modules/project/model';

export const addProject = async (values: RequestProjectSchema) => {
	const response = (await fetch('/project', {
		method: Method.POST,
		body: JSON.stringify({
			title: values.title,
			description: values.description
		})
	})) as ApiResponse<Project>;

	return response.data?.id;
};
