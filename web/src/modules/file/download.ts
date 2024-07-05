import request from '@/modules/api/request';
import { type ApiResponse } from '@/modules/api/model';

export type FileDownloadType = 'archival';

export const downloadFile = async (projectId: number, processType: FileDownloadType) => {
	const response = (await request(`/project/${projectId}/file/${processType}`)) as ApiResponse<string>;

	return new Blob([response.data], response.type ? { type: response.type } : { type: 'application/octet-stream' });
};
