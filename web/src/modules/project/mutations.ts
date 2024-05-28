import { useMutation } from '@tanstack/react-query';

import { addProject, addProjectMember, removeProjectMember } from '@/modules/project/api';

export const useAddProjectMutation = () =>
	useMutation({
		mutationFn: addProject
	});

export const useAddProjectMemberMutation = () =>
	useMutation({
		mutationFn: addProjectMember
	});

export const useRemoveProjectMemberMutation = () =>
	useMutation({
		mutationFn: removeProjectMember
	});
