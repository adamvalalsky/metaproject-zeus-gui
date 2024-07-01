import { useQuery } from '@tanstack/react-query';

import request from '@/modules/api/request';
import type { MemberList, MyProjectResponse, ProjectDetailResponse } from '@/modules/project/model';
import { type Pagination } from '@/modules/api/pagination/model';
import { type ProjectStatus } from '@/modules/project/constants';

export const useProjectsQuery = (status: ProjectStatus, pagination: Pagination) =>
	useQuery({
		queryKey: ['project', status.toLowerCase(), pagination.limit, pagination.page],
		queryFn: () =>
			request<MyProjectResponse>(
				`/project?status=${status.toLowerCase()}&page=${pagination.page}&limit=${pagination.limit}`
			)
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
