import { type ApiResponse, Method } from '@/modules/api/model';
import type { Project } from '@/modules/project/model';
import { request } from '@/modules/api/request';

export const approveProject = async (projectId: number) => {
	const response = (await request('/project/approval/approve', {
		method: Method.POST,
		body: JSON.stringify({
			projectId
		})
	})) as ApiResponse<Project>;

	return response.data?.id;
};
