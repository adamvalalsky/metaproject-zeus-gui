import { defer } from 'react-router-dom';

import request from '@/modules/api/request';
import { type ApiRequestPromise } from '@/modules/api/model';
import { type Project } from '@/modules/project/model';

export type DeferredProjectResponse = {
	activeProjects: ApiRequestPromise<MyProjectResponse>;
	requestedProjects: ApiRequestPromise<MyProjectResponse>;
};

type MyProjectResponse = {
	data: {
		projects: Project[];
	};
};

const loadProjects = async () => {
	const requestedProjects = request('/project?status=new') as ApiRequestPromise<MyProjectResponse>;
	const activeProjects = request('/project?status=active') as ApiRequestPromise<MyProjectResponse>;
	return defer({ requestedProjects, activeProjects });
};

export default loadProjects;
