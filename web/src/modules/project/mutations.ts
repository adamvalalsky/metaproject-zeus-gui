import { useMutation } from '@tanstack/react-query';

import { addProject } from '@/modules/project/api/add-project';
import { addProjectMember } from '@/modules/project/api/add-project-member';
import { removeProjectMember } from '@/modules/project/api/remove-project-member';

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
