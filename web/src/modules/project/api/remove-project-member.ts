import fetch from '@/modules/api/request';
import { Method } from '@/modules/api/model';

type ProjectMemberRemoveSchema = {
	projectId: number;
	memberId: number;
};

export const removeProjectMember = async ({ projectId, memberId }: ProjectMemberRemoveSchema): Promise<void> => {
	await fetch(`/project/${projectId}/members/${memberId}`, {
		method: Method.DELETE
	});
};
