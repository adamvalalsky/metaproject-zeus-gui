import fetch from '@/modules/api/request';
import { type ApiResponse, Method } from '@/modules/api/model';
import type { Project } from '@/modules/project/model';

export const approveProject = async (projectId: number) => {
	const response = (await fetch('/project/approval/approve', {
		method: Method.POST,
		body: JSON.stringify({
			projectId
		})
	})) as ApiResponse<Project>;

	return response.data?.id;
};
