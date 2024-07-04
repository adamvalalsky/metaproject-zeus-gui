import { useQuery } from '@tanstack/react-query';

import request from '@/modules/api/request';
import { type Pagination, type PaginationMetadata } from '@/modules/api/pagination/model';
import { type ProjectStatus } from '@/modules/project/constants';
import type { ArchivalInfo, Project, ProjectMember } from '@/modules/project/model';

type MyProjectResponse = {
	metadata: PaginationMetadata;
	projects: Project[];
};

type ProjectDetailResponse = {
	project: Project;
	permissions: string[];
	archivalInfo?: ArchivalInfo;
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
