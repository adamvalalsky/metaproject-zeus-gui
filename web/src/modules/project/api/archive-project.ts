import { type FileWithPath } from '@mantine/dropzone';

import { Method } from '@/modules/api/model';
import type { Project } from '@/modules/project/model';
import { request } from '@/modules/api/request';

type ArchiveProjectSchema = {
	projectId: number;
	justification: string;
	file: FileWithPath | null;
};

export const archiveProject = async ({ projectId, justification, file }: ArchiveProjectSchema) => {
	const formData = new FormData();
	formData.append('message', justification);
	if (file) {
		formData.append('file', file, file.name);
	}

	return request<Project>(`/project/${projectId}/archive`, {
		method: Method.POST,
		body: formData
	});
};
