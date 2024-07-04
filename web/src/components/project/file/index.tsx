import { Flex, rem, Stack, Text, Tooltip, UnstyledButton } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';

import { type FileDetail } from '@/modules/project/model';
import { getIcon } from '@/modules/file/icon';
import { sizeToText } from '@/modules/file/size';
import { downloadFile, type FileDownloadType } from '@/modules/file/download';
import { useProjectOutletContext } from '@/routes/project/detail/guard';

type FileViewProps = {
	file: FileDetail;
	downloadType?: FileDownloadType;
};

const FileContent = ({ file }: FileViewProps) => (
	<Flex direction="column" w={200} p={6} bd={1} style={{ borderRadius: 5 }}>
		<Flex align="center" justify="center" bg="gray.2" h={120} style={{ borderRadius: 5, overflow: 'hidden' }}>
			{getIcon(file.mime, 64)}
		</Flex>
		<Stack gap={2}>
			<Tooltip label={file.name}>
				<Text truncate="end">{file.name}</Text>
			</Tooltip>
			<Flex align="center">
				<IconDatabase style={{ width: rem(13), height: rem(13) }} />
				<Text size="sm" pl={3}>
					{sizeToText(file.size)}
				</Text>
			</Flex>
		</Stack>
	</Flex>
);

const FileView = ({ file, downloadType }: FileViewProps) => {
	const { project } = useProjectOutletContext();

	const fileDownload = async () => {
		if (!project.id || !downloadType) {
			return;
		}

		const fileData = await downloadFile(project.id, downloadType);
		const url = window.URL.createObjectURL(fileData);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', file.name);

		document.body.appendChild(link);

		link.click();

		link.parentNode?.removeChild(link);
	};

	if (downloadType) {
		return (
			<Tooltip label="Download">
				<UnstyledButton onClick={fileDownload}>
					<FileContent file={file} />
				</UnstyledButton>
			</Tooltip>
		);
	}

	return <FileContent file={file} />;
};

export default FileView;
