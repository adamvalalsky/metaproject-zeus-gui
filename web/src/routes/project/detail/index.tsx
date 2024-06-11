import { ActionIcon, Alert, Box, Group, rem, Text, Textarea, Title, Tooltip } from '@mantine/core';
import { IconInfoCircle, IconPencil } from '@tabler/icons-react';
import { useState } from 'react';

import ProjectMembers from '@/components/project/members';
import { useProjectOutletContext } from '@/routes/project/detail/guard';

const ProjectDetail = () => {
	const { project, permissions } = useProjectOutletContext();
	const [isEditMode, setEditMode] = useState(false);

	return (
		<Box>
			<Group justify="space-between">
				<Title>{project.title}</Title>
				{permissions.includes('edit_project') && (
					<Tooltip label="Edit project" position="bottom">
						<ActionIcon
							variant={isEditMode ? 'light' : 'transparent'}
							color="gray"
							size="lg"
							radius="md"
							aria-label="Settings"
							onClick={() => setEditMode(!isEditMode)}
						>
							<IconPencil style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
						</ActionIcon>
					</Tooltip>
				)}
			</Group>
			{project.status === 'new' && (
				<Alert mt={5} variant="light" color="yellow" title="Project is not active" icon={<IconInfoCircle />}>
					Current project, which you are editing is not yet accepted.
				</Alert>
			)}
			{project.status === 'inactive' && (
				<Alert mt={5} variant="light" color="red" title="Project is archived" icon={<IconInfoCircle />}>
					Current project is already archived.
				</Alert>
			)}
			{isEditMode ? (
				<Textarea mt={10} defaultValue={project.description} />
			) : (
				<Text mt={10}>{project.description}</Text>
			)}
			<ProjectMembers id={project.id} />
		</Box>
	);
};

export default ProjectDetail;
