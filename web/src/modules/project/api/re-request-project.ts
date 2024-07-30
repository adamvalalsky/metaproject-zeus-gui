import type { RequestProjectSchema } from '@/modules/project/form';
import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';

type ReRequestProjectInput = RequestProjectSchema & {
	projectId: number;
};

export const reRequestProject = async (values: ReRequestProjectInput) => {
	await request(`/project/${values.projectId}/request`, {
		method: Method.POST,
		body: JSON.stringify({
			title: values.title,
			link: values.link,
			description: values.description
		})
	});
};
