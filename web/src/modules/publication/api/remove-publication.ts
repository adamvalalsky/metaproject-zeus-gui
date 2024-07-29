import request from '@/modules/api/request';
import { Method } from '@/modules/api/model';

export const removePublication = async (publicationId: number) => {
	await request(`/publication/${publicationId}`, {
		method: Method.DELETE
	});
};
