import { Alert, Box, Text, Title } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

import ProjectMembers from '@/components/project/members';
import { useProjectOutletContext } from '@/routes/project/detail/guard';

const ProjectDetail = () => {
	const { project } = useProjectOutletContext();

	return (
		<Box>
			<Title>{project.title}</Title>
			{project.status === 'new' && (
				<Alert mt={5} variant="light" color="yellow" title="Project is not active" icon={<IconInfoCircle />}>
					Current project, which you are editing is not yet accepted. You can add new members and edit
					information, but some actions may be forbidden.
				</Alert>
			)}
			<Text mt={10}>{project.description}</Text>
			<ProjectMembers id={project.id} />
		</Box>
	);
};

export default ProjectDetail;
