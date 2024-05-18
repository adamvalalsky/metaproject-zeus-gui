import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import request from '@/modules/api/request';
import type { MemberList, MyProjectResponse, Project } from '@/modules/project/model';

export const useActiveProjectsQuery = () =>
	useQuery({
		queryKey: ['project', 'active'],
		queryFn: () => request<MyProjectResponse>('/project?status=active')
	});

export const useRequestedProjectsQuery = () =>
	useQuery({
		queryKey: ['project', 'requested'],
		queryFn: () => request<MyProjectResponse>('/project?status=new')
	});

export const useProjectDetailQuery = (id: number) =>
	useSuspenseQuery({
		queryKey: ['project', id],
		queryFn: () => request<Project>(`/project/${id}`)
	});

export const useProjectMembersQuery = (id: number) =>
	useQuery({
		queryKey: ['project', id, 'members'],
		queryFn: () => request<MemberList>(`/project/${id}/members`)
	});
