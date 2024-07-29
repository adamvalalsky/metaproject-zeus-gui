import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';

type ProjectMemberRemoveSchema = {
	projectId: number;
	memberId: number;
};

export const removeProjectMember = async ({ projectId, memberId }: ProjectMemberRemoveSchema): Promise<void> => {
	await request(`/project/${projectId}/members/${memberId}`, {
		method: Method.DELETE
	});
};
