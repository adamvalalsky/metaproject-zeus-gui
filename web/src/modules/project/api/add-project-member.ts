import type { AddMembersSchema } from '@/modules/project/form';
import fetch from '@/modules/api/request';
import { Method } from '@/modules/api/model';

export const addProjectMember = async ({ projectId, members }: AddMembersSchema): Promise<void> => {
	await fetch(`/project/${projectId}/members`, {
		method: Method.POST,
		body: JSON.stringify({
			members
		})
	});
};
