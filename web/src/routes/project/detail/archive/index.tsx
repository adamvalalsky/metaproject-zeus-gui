import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Text, Textarea, Title } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

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
				</form>
			</Box>
		</Box>
	);
};

export default ProjectArchivePage;
