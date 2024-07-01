import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Flex, Group, rem, Tabs, Title } from '@mantine/core';
import { IconActivity, IconArchive, IconClockQuestion, IconPlus } from '@tabler/icons-react';

import { useActiveProjectsQuery, useArchivedProjectsQuery, useRequestedProjectsQuery } from '@/modules/project/queries';
import ProjectTable from '@/components/project/project-table';

const Project: React.FC = () => {
	const { t } = useTranslation();
	const {
		data: activeProjects,
		isLoading: activeProjectsLoading,
		isError: activeProjectsError
	} = useActiveProjectsQuery();
	const {
		data: requestedProjects,
		isLoading: requestedProjectsLoading,
		isError: requestedProjectsError
	} = useRequestedProjectsQuery();
	const {
		data: archivedProjects,
		isLoading: archivedProjectsLoading,
		isError: archivedProjectsError
	} = useArchivedProjectsQuery();

	const iconStyle = { width: rem(12), height: rem(12) };

	if (requestedProjectsError || activeProjectsError || archivedProjectsError) {
		return (
			<Alert color="red" mt={15} variant="light">
				{t('routes.Dashboard.error.connection')}
			</Alert>
		);
	}

	return (
		<Flex mt={15} direction="column" align="center">
			<Box w="80%" mt={20}>
				<Group justify="space-between" mb={10}>
					<Title order={2}>{t('routes.Dashboard.title')}</Title>
					<Button component={Link} to="add" variant="contained" leftSection={<IconPlus />}>
						{t('routes.Dashboard.requestButton')}
					</Button>
				</Group>
				<Tabs defaultValue="active">
					<Tabs.List>
						<Tabs.Tab value="active" leftSection={<IconActivity style={iconStyle} />}>
							{t('routes.Dashboard.activeProjects.title')}
						</Tabs.Tab>
						<Tabs.Tab value="requested" leftSection={<IconClockQuestion style={iconStyle} />}>
							{t('routes.Dashboard.requestedProjects.title')}
						</Tabs.Tab>
						<Tabs.Tab value="archived" leftSection={<IconArchive style={iconStyle} />}>
							{t('routes.Dashboard.archivedProjects.title')}
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="active">
						<ProjectTable
							title={t('routes.Dashboard.activeProjects.title')}
							isLoading={activeProjectsLoading}
							projects={activeProjects?.data.projects}
						/>
					</Tabs.Panel>

					<Tabs.Panel value="requested">
						<ProjectTable
							title={t('routes.Dashboard.requestedProjects.title')}
							isLoading={requestedProjectsLoading}
							projects={requestedProjects?.data.projects}
						/>
					</Tabs.Panel>

					<Tabs.Panel value="archived">
						<ProjectTable
							title={t('routes.Dashboard.archivedProjects.title')}
							isLoading={archivedProjectsLoading}
							projects={archivedProjects?.data.projects}
						/>
					</Tabs.Panel>
				</Tabs>
			</Box>
		</Flex>
	);
};

export default Project;
