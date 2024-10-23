import type { AddMembersSchema } from '@/modules/project/form';
import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';

export const addProjectMember = async ({ projectId, members }: AddMembersSchema): Promise<void> => {
	await request(`/project/${projectId}/members`, {
		method: Method.POST,
		json: {
			members
		}
	});
};
