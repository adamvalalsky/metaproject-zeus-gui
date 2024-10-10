import { Method } from '@/modules/api/model';
import { request } from '@/modules/api/request';

export const deleteAttribute = async (id: number) => {
	await request(`/resource-type/${id}`, {
		method: Method.DELETE
	});
};
