import { redirect } from 'react-router-dom';

import { ApiClientError, type ApiResponse, Method } from '@/modules/api/model';
import { type Project } from '@/modules/project/model';
import fetch from '@/modules/api/request';

export type ProjectActionData = {
	showConflictError?: boolean;
	showConnectionError?: boolean;
};

export const addProjectAction = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	try {
		const response = (await fetch('/project', {
			method: Method.POST,
			body: JSON.stringify({
				title: formData.get('title'),
				description: formData.get('description')
			})
		})) as ApiResponse<Project>;

		const projectId = response.data?.id;

		if (!projectId) {
			return redirect('/project');
		}

		return redirect(`/project/${projectId}`);
	} catch (error: unknown) {
		if (error instanceof ApiClientError) {
			if (error.response.status === 409) {
				return {
					showConflictError: true
				};
			}
		}

		return {
			showConnectionError: true
		};
	}
};
