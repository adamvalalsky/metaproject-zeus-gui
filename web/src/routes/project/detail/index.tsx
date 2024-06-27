import { ActionIcon, Alert, Badge, Box, Divider, Flex, Group, rem, Stack, Text, Title, Tooltip } from '@mantine/core';
import { IconArchive, IconInfoCircle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import ProjectMembers from '@/components/project/members';
import { useProjectOutletContext } from '@/routes/project/detail/guard';

const ProjectDetail = () => {
	const { project, permissions } = useProjectOutletContext();
	const { t } = useTranslation();

	return (
		<Box>
			<Group justify="space-between">
				<Title>{project.title}</Title>
				<Group>
					<Badge
						variant="light"
						size="lg"
						color={project.status === 'active' ? 'teal' : project.status === 'new' ? 'orange' : 'red'}
					>
						{t(`routes.ProjectDetail.status.${project.status}`)}
					</Badge>
					{permissions.includes('edit_project') && (
						<Tooltip label="Archive project" position="bottom">
							<ActionIcon
								component={Link}
								variant="transparent"
								color="gray"
								size="lg"
								radius="md"
								aria-label="Settings"
								to="archive"
							>
								<IconArchive style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
							</ActionIcon>
						</Tooltip>
					)}
				</Group>
			</Group>
			<Divider my={10} />
			{project.status === 'new' && (
				<Alert mt={5} variant="light" color="yellow" title="Project is not active" icon={<IconInfoCircle />}>
					Current project, which you are editing is not yet accepted.
				</Alert>
			)}
			{project.status === 'archived' && (
				<Alert mt={5} variant="light" color="red" title="Project is archived" icon={<IconInfoCircle />}>
					Current project is already archived.
				</Alert>
			)}
			{project.status === 'rejected' && (
				<Alert mt={5} variant="light" color="red" title="Project is rejected" icon={<IconInfoCircle />}>
					Current project was already rejected.
				</Alert>
			)}
			<Stack mt={15}>
				<Group justify="space-between">
					<Group gap={10}>
						<Text fw="bold" size="lg">
							Principal investigator:
						</Text>
						<Text size="lg">{project.user.name}</Text>
					</Group>
					<Text c="dimmed" size="sm">
						Created at: {dayjs(project.createdAt).format('DD.MM.YYYY')}
					</Text>
				</Group>
				<Divider />
				<Flex direction="column">
					<Text fw={700}>Description:</Text>
					<Text>{project.description}</Text>
				</Flex>
			</Stack>
			<ProjectMembers id={project.id} />
		</Box>
	);
};

export default ProjectDetail;
