import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Group, Input, rem, Stack, Text, Textarea, Title } from '@mantine/core';
import {
	IconFileText,
	IconFileTypeDoc,
	IconFileTypeDocx,
	IconFileTypePdf,
	IconInfoCircle,
	IconUpload,
	IconX
} from '@tabler/icons-react';
import { Dropzone, type FileWithPath, MIME_TYPES, MS_WORD_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone';

import { useProjectOutletContext } from '@/routes/project/detail/guard';

const getIcon = (type: string) => {
	const style = { width: rem(64), height: rem(64) };

	if (type === MIME_TYPES.doc) {
		return <IconFileTypeDoc style={style} stroke={1.5} />;
	}

	if (type === MIME_TYPES.docx) {
		return <IconFileTypeDocx style={style} stroke={1.5} />;
	}

	return <IconFileTypePdf style={style} stroke={1.5} />;
};

const ProjectArchivePage = () => {
	const { project, permissions } = useProjectOutletContext();
	const navigate = useNavigate();
	const [file, setFile] = useState<FileWithPath | null>(null);

	useEffect(() => {
		if (!permissions.includes('edit_project')) {
			navigate(`/project/${project.id}`);
		}
	}, [permissions]);

	return (
		<Box>
			<Title>Project archival</Title>
			<Title order={3} pb={30} pt={15}>
				Title: {project.title}
			</Title>
			<Alert variant="light" color="yellow" title="Warning" icon={<IconInfoCircle />}>
				Archiving project will make it inactive and you will not be able to edit it anymore. All resources will
				be deallocated.
			</Alert>
			<Text mt={20}>
				You can archive this project if goal of this project has been achieved. Archived projects are not
				deleted, but they can not be edited anymore and are only viewable for historical purposes. For
				successful project archival, you need to write justification and you can optionally add your final
				report.
			</Text>

			<Box mt={20}>
				<form>
					<Textarea
						label="Justification"
						withAsterisk
						description="Add reasons for archiving this project "
						placeholder="Project has ended."
						autosize
						minRows={6}
					/>
					<Input.Wrapper
						label="Final report"
						withAsterisk
						description="You can load only one final report"
						mt={15}
					>
						<Dropzone
							multiple={false}
							name="file"
							onDrop={files => {
								console.log(files);
								setFile(files[0]);
							}}
							maxSize={5 * 1024 ** 2}
							accept={[...PDF_MIME_TYPE, ...MS_WORD_MIME_TYPE]}
						>
							<Group justify="center" gap="xl" mih={150} style={{ pointerEvents: 'none' }}>
								<Dropzone.Accept>
									<IconUpload
										style={{
											width: rem(52),
											height: rem(52),
											color: 'var(--mantine-color-blue-6)'
										}}
										stroke={1.5}
									/>
								</Dropzone.Accept>
								<Dropzone.Reject>
									<IconX
										style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
										stroke={1.5}
									/>
								</Dropzone.Reject>
								<Dropzone.Idle>
									{!file && (
										<IconFileText
											style={{
												width: rem(52),
												height: rem(52),
												color: 'var(--mantine-color-dimmed)'
											}}
											stroke={1.5}
										/>
									)}
								</Dropzone.Idle>

								{!file && (
									<Box>
										<Text size="xl" inline>
											Drag your report here or click to select file
										</Text>
										<Text size="sm" c="dimmed" inline mt={7}>
											Attach only one PDF or Word document
										</Text>
									</Box>
								)}
								{file && (
									<Group>
										{getIcon(file.type)}
										<Stack gap={1}>
											<Text size="xl" inline>
												{file.path}
											</Text>
											<Text c="dimmed" size="xs">
												Click anywhere to replace this file with another.
											</Text>
										</Stack>
									</Group>
								)}
							</Group>
						</Dropzone>
					</Input.Wrapper>
					<Group justify="center" mt={10}>
						<Button type="submit" color="green">
							Submit
						</Button>
					</Group>
				</form>
			</Box>
		</Box>
	);
};

export default ProjectArchivePage;
