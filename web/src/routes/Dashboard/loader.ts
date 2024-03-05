import { defer } from 'react-router-dom';
import request from '../../modules/api/request.ts';
import { ApiRequestPromise } from '../../modules/api/model.ts';
import { Project } from '../../modules/project/model.ts';

export interface DeferredProjectResponse {
	response: ApiRequestPromise<MyProjectResponse>;
}

interface MyProjectResponse {
	data: {
		projects: Project[];
	};
}

const loadProjects = async () => {
	const response = request('/project') as ApiRequestPromise<MyProjectResponse>;
	return defer({ response });
};

export default loadProjects;
