import { Method } from '@/modules/api/model';
import type { Project } from '@/modules/project/model';
import { request } from '@/modules/api/request';

export const approveProject = async (projectId: number) => {
	const response = await request<Project>('/project/approval/approve', {
		method: Method.POST,
		json: {
			projectId
		}
	});

	return response.id;
};
