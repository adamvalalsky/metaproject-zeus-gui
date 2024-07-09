import { useMutation } from '@tanstack/react-query';

import { addProject } from '@/modules/project/api/add-project';
import { addProjectMember } from '@/modules/project/api/add-project-member';
import { removeProjectMember } from '@/modules/project/api/remove-project-member';
import { archiveProject } from '@/modules/project/api/archive-project';
import { approveProject } from '@/modules/project/api/approve-project';

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

export const useArchiveProjectMutation = () =>
	useMutation({
		mutationFn: archiveProject
	});

export const useApproveProjectMutation = () =>
	useMutation({
		mutationFn: approveProject
	});
