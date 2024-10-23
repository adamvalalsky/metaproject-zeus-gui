import { download } from '@/modules/api/request';

export type FileDownloadType = 'archival';

export const downloadFile = async (projectId: number, processType: FileDownloadType) =>
	download(`/project/${projectId}/file/${processType}`);
