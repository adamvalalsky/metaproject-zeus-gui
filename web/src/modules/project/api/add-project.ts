import type { RequestProjectSchema } from '@/modules/project/form';
import { Method } from '@/modules/api/model';
import type { Project } from '@/modules/project/model';
import { request } from '@/modules/api/request';

export const addProject = async (values: RequestProjectSchema) => {
	const response = await request<Project>('/project', {
		method: Method.POST,
		json: {
			title: values.title,
			link: values.link,
			description: values.description
		}
	});

	return response.id;
};
