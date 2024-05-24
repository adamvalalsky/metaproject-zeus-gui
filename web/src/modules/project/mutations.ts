import { useMutation } from '@tanstack/react-query';

import { addProject, addProjectMember } from '@/modules/project/api';

export const useAddProjectMutation = () =>
	useMutation({
		mutationFn: addProject
	});

export const useAddProjectMemberMutation = () =>
	useMutation({
		mutationFn: addProjectMember
	});
