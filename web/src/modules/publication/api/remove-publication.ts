import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';

export const removePublication = async (publicationId: number) => {
	await request(`/publication/${publicationId}`, {
		method: Method.DELETE
	});
};
