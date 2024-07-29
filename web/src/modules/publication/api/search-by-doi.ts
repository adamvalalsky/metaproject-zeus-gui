import { type Publication } from '@/modules/publication/model';
import { request } from '@/modules/api/request';

export const searchByDoi = async (doi: string) => {
	const response = await request<Publication>(`/publication-search/doi/${encodeURIComponent(doi)}`);
	if (response.status === 404) {
		return null;
	}

	return response.data;
};
