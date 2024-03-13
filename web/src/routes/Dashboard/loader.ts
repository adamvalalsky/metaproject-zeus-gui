import { defer } from 'react-router-dom';
import request from '../../modules/api/request.ts';
import { ApiRequestPromise } from '../../modules/api/model.ts';
import { Project } from '../../modules/project/model.ts';

export interface DeferredProjectResponse {
	activeProjects: ApiRequestPromise<MyProjectResponse>;
	requestedProjects: ApiRequestPromise<MyProjectResponse>;
}

interface MyProjectResponse {
	data: {
		projects: Project[];
	};
}

const loadProjects = async () => {
	const requestedProjects = request('/project?status=new') as ApiRequestPromise<MyProjectResponse>;
	const activeProjects = request('/project?status=active') as ApiRequestPromise<MyProjectResponse>;
	return defer({ requestedProjects, activeProjects });
};

export default loadProjects;
