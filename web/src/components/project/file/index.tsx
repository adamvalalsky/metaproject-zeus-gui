import { Flex, rem, Stack, Text, Tooltip, UnstyledButton } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';

import { type FileDetail } from '@/modules/project/model';
import { getIcon } from '@/modules/file/icon';
import { sizeToText } from '@/modules/file/size';

type FileViewProps = {
	file: FileDetail;
	shouldDownload?: boolean;
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

const FileView = ({ file, shouldDownload }: FileViewProps) => {
	const download = () => {
		if (!shouldDownload) {
			return;
		}

		console.log('download');
	};

	if (shouldDownload) {
		return (
			<Tooltip label="Download">
				<UnstyledButton onClick={download}>
					<FileContent file={file} />
				</UnstyledButton>
			</Tooltip>
		);
	}

	return <FileContent file={file} />;
};

export default FileView;
