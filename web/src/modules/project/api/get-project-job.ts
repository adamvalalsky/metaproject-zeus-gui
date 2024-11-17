import { request } from '@/modules/api/request';
import { type ProjectJobStatus } from '@/modules/project/model';

export const getProjectJob = async (projectId: number): Promise<boolean> => {
	const result = await request<ProjectJobStatus>(`/project/failed-stages/${projectId}`);

	return result.isRunning;
};
