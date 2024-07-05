import {
	ActionIcon,
	Alert,
	Badge,
	Box,
	Divider,
	Flex,
	Group,
	rem,
	Stack,
	Tabs,
	Text,
	Title,
	Tooltip
} from '@mantine/core';
import { IconArchive, IconInfoCircle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import ProjectMembers from '@/components/project/members';
import { useProjectOutletContext } from '@/routes/project/detail/guard';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { ProjectStatus } from '@/modules/project/constants';
import FileView from '@/components/project/file';

const ProjectDetail = () => {
	const { project, permissions, archivalInfo } = useProjectOutletContext();
	const { t } = useTranslation();

	const iconStyle = { width: rem(16), height: rem(16) };

	const showArchivalInfoTab =
		project.status === ProjectStatus.ARCHIVED && permissions.includes('view_advanced_details') && !!archivalInfo;

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: 'Projects', href: '/project' },
					{ title: project.title, href: `/project/${project.id}` }
				]}
			/>
			<Group justify="space-between">
				<Title>{project.title}</Title>
				<Group>
					<Badge
						variant="light"
						size="lg"
						color={
							project.status === ProjectStatus.ACTIVE
								? 'teal'
								: project.status === ProjectStatus.NEW
									? 'orange'
									: 'red'
						}
					>
						{t(`routes.ProjectDetail.status.${project.status}`)}
					</Badge>
					{permissions.includes('edit_project') && project.status === 'active' && (
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
			{project.status === ProjectStatus.NEW && (
				<Alert mt={5} variant="light" color="yellow" title="Project is not active" icon={<IconInfoCircle />}>
					Current project, which you are editing is not yet accepted.
				</Alert>
			)}
			{project.status === ProjectStatus.ARCHIVED && (
				<Alert mt={5} variant="light" color="red" title="Project is archived" icon={<IconInfoCircle />}>
					Current project is already archived.
				</Alert>
			)}
			{project.status === ProjectStatus.REJECTED && (
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

			<Tabs mt={20} defaultValue={showArchivalInfoTab ? 'archivalInfo' : 'projectInfo'}>
				<Tabs.List>
					{showArchivalInfoTab && (
						<Tabs.Tab value="archivalInfo" leftSection={<IconArchive style={iconStyle} />}>
							Archival info
						</Tabs.Tab>
					)}
					<Tabs.Tab value="projectInfo" leftSection={<IconInfoCircle style={iconStyle} />}>
						Project info
					</Tabs.Tab>
				</Tabs.List>

				{showArchivalInfoTab && (
					<Tabs.Panel value="archivalInfo">
						<Stack mt={20}>
							<Box>
								<Title order={4}>Archival description:</Title>
								<Text>{archivalInfo.description}</Text>
							</Box>

							{archivalInfo.file && (
								<Box mb={40} mt={15}>
									<Title order={4}>Attached file:</Title>
									<FileView downloadType="archival" file={archivalInfo.file} />
								</Box>
							)}
						</Stack>
					</Tabs.Panel>
				)}

				<Tabs.Panel value="projectInfo">
					<ProjectMembers id={project.id} />
				</Tabs.Panel>
			</Tabs>
		</Box>
	);
};

export default ProjectDetail;
