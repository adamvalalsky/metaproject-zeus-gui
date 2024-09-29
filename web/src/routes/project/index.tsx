import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Group, Tabs, Title } from '@mantine/core';
import { IconActivity, IconArchive, IconBan, IconClockQuestion, IconPlus } from '@tabler/icons-react';

import ProjectTable from '@/components/project/project-table';
import { ProjectStatus } from '@/modules/project/constants';

const Project: React.FC = () => {
	const defaultValue = 'active';
	const { t } = useTranslation();

	// only load other types of project after clicking on tab
	const [requestedClicked, setRequestedClicked] = useState(false);
	const [archivedClicked, setArchivedClicked] = useState(false);
	const [rejectedClicked, setRejectedClicked] = useState(false);

	return (
		<Flex mt={15} direction="column" align="center">
			<Box w="80%" mt={20}>
				<Group justify="space-between" mb={10}>
					<Title order={2}>{t('routes.Dashboard.title')}</Title>
					<Button component={Link} to="add" variant="contained" leftSection={<IconPlus />}>
						{t('routes.Dashboard.requestButton')}
					</Button>
				</Group>
				<Tabs defaultValue={defaultValue}>
					<Tabs.List>
						<Tabs.Tab value="active" leftSection={<IconActivity />}>
							{t('routes.Dashboard.activeProjects.title')}
						</Tabs.Tab>
						<Tabs.Tab
							onClick={() => setRequestedClicked(true)}
							value="requested"
							leftSection={<IconClockQuestion />}
						>
							{t('routes.Dashboard.requestedProjects.title')}
						</Tabs.Tab>
						<Tabs.Tab
							onClick={() => setArchivedClicked(true)}
							value="archived"
							leftSection={<IconArchive />}
						>
							{t('routes.Dashboard.archivedProjects.title')}
						</Tabs.Tab>
						<Tabs.Tab onClick={() => setRejectedClicked(true)} value="rejected" leftSection={<IconBan />}>
							{t('routes.Dashboard.rejectedProjects.title')}
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="active">
						<ProjectTable
							title={t('routes.Dashboard.activeProjects.title')}
							status={ProjectStatus.ACTIVE}
						/>
					</Tabs.Panel>

					<Tabs.Panel value="requested">
						{requestedClicked && (
							<ProjectTable
								title={t('routes.Dashboard.requestedProjects.title')}
								status={ProjectStatus.NEW}
							/>
						)}
					</Tabs.Panel>

					<Tabs.Panel value="archived">
						{archivedClicked && (
							<ProjectTable
								title={t('routes.Dashboard.archivedProjects.title')}
								status={ProjectStatus.ARCHIVED}
							/>
						)}
					</Tabs.Panel>

					<Tabs.Panel value="rejected">
						{rejectedClicked && (
							<ProjectTable
								title={t('routes.Dashboard.rejectedProjects.title')}
								status={ProjectStatus.REJECTED}
							/>
						)}
					</Tabs.Panel>
				</Tabs>
			</Box>
		</Flex>
	);
};

export default Project;
