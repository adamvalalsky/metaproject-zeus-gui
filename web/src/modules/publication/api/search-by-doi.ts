import { HTTPError } from 'ky';

import { type Publication } from '@/modules/publication/model';
import { request } from '@/modules/api/request';

export const searchByDoi = async (doi: string) => {
	try {
		return request<Publication>(`/publication-search/doi/${encodeURIComponent(doi)}`);
	} catch (e) {
		if (e instanceof HTTPError && e.response.status === 404) {
			return null;
		}

		throw e;
	}
};
