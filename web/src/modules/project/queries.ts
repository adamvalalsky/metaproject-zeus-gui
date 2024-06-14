import { useQuery } from '@tanstack/react-query';

import request from '@/modules/api/request';
import type { MemberList, MyProjectResponse, ProjectDetailResponse } from '@/modules/project/model';
import { type Pagination } from '@/modules/api/pagination/model';

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
	useQuery({
		queryKey: ['project', id],
		queryFn: () => request<ProjectDetailResponse>(`/project/${id}`),
		retry: false
	});

export const useProjectMembersQuery = (id: number, pagination: Pagination, sortSelector: string) =>
	useQuery({
		queryKey: ['project', id, 'members', pagination.page, pagination.limit, sortSelector],
		queryFn: () =>
			request<MemberList>(
				`/project/${id}/members?page=${pagination.page}&limit=${pagination.limit}&sort=${sortSelector}`
			)
	});
