import { Alert, Text, Title } from '@mantine/core';
import { useParams } from 'react-router';
import { IconInfoCircle } from '@tabler/icons-react';

import MainContentWrapper from '@/components/global/content-wrapper';
import NotFound from '@/components/global/not-found';
import { useProjectDetailQuery } from '@/modules/project/queries';
import ProjectMembers from '@/components/project/members';

const ProjectDetail = () => {
	const { id } = useParams();

	if (!id || isNaN(+id)) {
		return <NotFound />;
	}

	const { data: projectData } = useProjectDetailQuery(+id);
	const project = projectData.data;

	return (
		<MainContentWrapper mt={30}>
			<Title>{project.title}</Title>
			{project.status === 'new' && (
				<Alert mt={5} variant="light" color="yellow" title="Project is not active" icon={<IconInfoCircle />}>
					Current project, which you are editing is not yet accepted. You can add new members and edit
					information, but some actions may be forbidden.
				</Alert>
			)}
			<Text mt={10}>{project.description}</Text>
			<ProjectMembers id={+id} />
		</MainContentWrapper>
	);
};

export default ProjectDetail;
