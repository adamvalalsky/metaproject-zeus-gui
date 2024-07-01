import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Group, rem, Tabs, Title } from '@mantine/core';
import { IconActivity, IconArchive, IconClockQuestion, IconPlus } from '@tabler/icons-react';

import ProjectTable from '@/components/project/project-table';
import { ProjectStatus } from '@/modules/project/constants';

const Project: React.FC = () => {
	const { t } = useTranslation();

	const iconStyle = { width: rem(12), height: rem(12) };

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
							status={ProjectStatus.ACTIVE}
						/>
					</Tabs.Panel>

					<Tabs.Panel value="requested">
						<ProjectTable
							title={t('routes.Dashboard.requestedProjects.title')}
							status={ProjectStatus.NEW}
						/>
					</Tabs.Panel>

					<Tabs.Panel value="archived">
						<ProjectTable
							title={t('routes.Dashboard.archivedProjects.title')}
							status={ProjectStatus.ARCHIVED}
						/>
					</Tabs.Panel>
				</Tabs>
			</Box>
		</Flex>
	);
};

export default Project;
