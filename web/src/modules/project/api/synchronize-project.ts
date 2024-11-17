import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';

type SynchronizeProjectType = {
	projectId: number;
};

export const synchronizeProject = async ({ projectId }: SynchronizeProjectType) => {
	await request(`/project/failed-stages/${projectId}`, {
		method: Method.POST
	});
};
