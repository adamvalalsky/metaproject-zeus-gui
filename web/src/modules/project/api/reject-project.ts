import fetch from '@/modules/api/request';
import { type ApiResponse, Method } from '@/modules/api/model';
import type { Project } from '@/modules/project/model';

type RejectProjectParams = {
	projectId: number;
	reason: string;
};

export const rejectProject = async (body: RejectProjectParams) => {
	const response = (await fetch('/project/approval/reject', {
		method: Method.POST,
		body: JSON.stringify(body)
	})) as ApiResponse<Project>;

	return response.data?.id;
};
