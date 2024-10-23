import { useQuery } from '@tanstack/react-query';

import { type Pagination, type PaginationMetadata } from '@/modules/api/pagination/model';
import { type ProjectStatus } from '@/modules/project/constants';
import type { ArchivalInfo, Project, ProjectMember, RejectedComment } from '@/modules/project/model';
import { request } from '@/modules/api/request';

type MyProjectResponse = {
	metadata: PaginationMetadata;
	projects: Project[];
};

type ProjectRequestResponse = {
	metadata: PaginationMetadata;
	projects: Project[];
};

type ProjectDetailResponse = {
	project: Project;
	permissions: string[];
	archivalInfo?: ArchivalInfo;
	rejectedComments?: RejectedComment[];
};

type MemberList = {
	metadata: PaginationMetadata;
	members: ProjectMember[];
};

export const useProjectsQuery = (status: ProjectStatus, pagination: Pagination, sortQuery: string) =>
	useQuery({
		queryKey: ['project', status.toLowerCase(), pagination.limit, pagination.page, sortQuery],
		queryFn: () =>
			request<MyProjectResponse>(
				`/project?status=${status.toLowerCase()}&page=${pagination.page}&limit=${pagination.limit}&sort=${sortQuery}`
			)
	});

export const useProjectRequestsQuery = (pagination: Pagination) =>
	useQuery({
		queryKey: ['project', 'requests', pagination.page, pagination.limit],
		queryFn: () =>
			request<ProjectRequestResponse>(`/project/requests?page=${pagination.page}&limit=${pagination.limit}`)
	});

export const useProjectDetailQuery = (id?: string) =>
	useQuery({
		queryKey: ['project', id],
		queryFn: () => request<ProjectDetailResponse>(`/project/${id}`),
		retry: false,
		enabled: !!id && !isNaN(+id)
	});

export const useProjectMembersQuery = (id: number, pagination: Pagination, sortSelector: string) =>
	useQuery({
		queryKey: ['project', id, 'members', pagination.page, pagination.limit, sortSelector],
		queryFn: () =>
			request<MemberList>(
				`/project/${id}/members?page=${pagination.page}&limit=${pagination.limit}&sort=${sortSelector}`
			)
	});
