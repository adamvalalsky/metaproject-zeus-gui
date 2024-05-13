import { useQuery } from '@tanstack/react-query';

import request from '@/modules/api/request';
import type { Project } from '@/modules/project/model';

type MyProjectResponse = {
	projects: Project[];
};

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
