import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Group, Input, rem, Text, Textarea, Title } from '@mantine/core';
import { IconFileText, IconInfoCircle, IconUpload, IconX } from '@tabler/icons-react';
import { Dropzone, MS_WORD_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone';

import { useProjectOutletContext } from '@/routes/project/detail/guard';

const ProjectArchivePage = () => {
	const { project, permissions } = useProjectOutletContext();
	const navigate = useNavigate();

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
					<Input.Wrapper label="Final report" description="You can load only one final report" mt={15}>
						<Dropzone
							multiple={false}
							name="file"
							onDrop={files => console.log('accepted files', files)}
							onReject={files => console.log('rejected files', files)}
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
									<IconFileText
										style={{
											width: rem(52),
											height: rem(52),
											color: 'var(--mantine-color-dimmed)'
										}}
										stroke={1.5}
									/>
								</Dropzone.Idle>

								<div>
									<Text size="xl" inline>
										Drag your report here or click to select file
									</Text>
									<Text size="sm" c="dimmed" inline mt={7}>
										Attach only one PDF or Word document
									</Text>
								</div>
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
