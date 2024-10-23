import { Method } from '@/modules/api/model';
import type { Project } from '@/modules/project/model';
import { request } from '@/modules/api/request';

type RejectProjectParams = {
	projectId: number;
	reason: string;
};

export const rejectProject = async (body: RejectProjectParams) => {
	const response = await request<Project>('/project/approval/reject', {
		method: Method.POST,
		json: body
	});

	return response.id;
};
