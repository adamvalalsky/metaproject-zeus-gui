import { Method } from '@/modules/api/model';
import { type Publication } from '@/modules/publication/model';
import { request } from '@/modules/api/request';

export type AddPublicationRequest = {
	projectId: number;
	publications: Publication[];
};

export const addPublications = async ({ projectId, publications }: AddPublicationRequest) => {
	await request(`/publication/${projectId}`, {
		method: Method.POST,
		json: {
			publications
		}
	});
};
