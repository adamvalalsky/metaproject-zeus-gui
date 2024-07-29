import { download } from '@/modules/api/request';

export type FileDownloadType = 'archival';

export const downloadFile = async (projectId: number, processType: FileDownloadType) => {
	const response = await download(`/project/${projectId}/file/${processType}`);
	return response.data;
};
