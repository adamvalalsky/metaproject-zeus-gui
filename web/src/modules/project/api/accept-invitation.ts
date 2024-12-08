import { useMutation } from '@tanstack/react-query';

import { request } from '@/modules/api/request';
import { Method } from '@/modules/api/model';

const acceptInvitation = async (projectId: number) => {
	await request(`/project/${projectId}/members/accept`, {
		method: Method.POST
	});
};

export const useAcceptInvitationMutation = () =>
	useMutation({
		mutationFn: acceptInvitation
	});
