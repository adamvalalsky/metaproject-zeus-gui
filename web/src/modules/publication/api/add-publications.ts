import request from '@/modules/api/request';
import { Method } from '@/modules/api/model';
import { type Publication } from '@/modules/publication/model';

export type AddPublicationRequest = {
	projectId: number;
	publications: Publication[];
};

export const addPublications = async ({ projectId, publications }: AddPublicationRequest) => {
	await request(`/publication/${projectId}`, {
		method: Method.POST,
		body: JSON.stringify({
			publications
		})
	});
};
