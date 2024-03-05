import request from '../../modules/api/request.ts';
import { ApiRequestPromise } from '../../modules/api/model.ts';
import { Project } from '../../modules/project/model.ts';

export interface MyProjectResponse {
	data: {
		projects: Project[];
	};
}

const loadProjects = async () => {
	return request('/project') as ApiRequestPromise<MyProjectResponse>;
};

export default loadProjects;
