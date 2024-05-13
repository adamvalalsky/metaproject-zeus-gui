import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Divider, Flex, Group, Skeleton, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { type Project } from '@/modules/project/model';
import { type HeadCell } from '@/components/project/basic-table/types';
import { useActiveProjectsQuery, useRequestedProjectsQuery } from '@/modules/project/queries';

import useWindowSize from '../../hooks/useWindowSize';
import BasicTable from '../../components/project/basic-table';

const Project: React.FC = () => {
	const windowSize = useWindowSize();
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

	const id: HeadCell<Project> = { selector: 'id', displayName: t('routes.Dashboard.table.id') };
	const name: HeadCell<Project> = { selector: 'title', displayName: t('routes.Dashboard.table.name') };
	const description: HeadCell<Project> = {
		selector: 'description',
		displayName: t('routes.Dashboard.table.description')
	};

	const getHeadNames = (windowSize: number): HeadCell<Project>[] => {
		if (windowSize < 600) {
			return [name];
		}

		if (windowSize < 900) {
			return [name, description];
		}

		if (windowSize < 1100) {
			return [name, description];
		}

		return [id, name, description];
	};

	const headCells = getHeadNames(windowSize);

	if (requestedProjectsError || activeProjectsError) {
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
				<Divider />
				<Box mt={15}>
					<Title order={4}>{t('routes.Dashboard.activeProjects.title')}</Title>
					{activeProjectsLoading || !activeProjects?.data ? (
						<Skeleton w={200} />
					) : (
						<Box mt={15}>
							{activeProjects.data.projects.length === 0 && (
								<Alert color="blue" variant="light" mt={15}>
									{t('routes.Dashboard.error.noActiveProjects')}
								</Alert>
							)}
							{activeProjects.data.projects.length > 0 && (
								<BasicTable head={headCells} rows={activeProjects.data.projects} isRowClickable />
							)}
						</Box>
					)}
				</Box>
				<Box mt={15}>
					<Title order={4}>{t('routes.Dashboard.requestedProjects.title')}</Title>
					{requestedProjectsLoading || !requestedProjects?.data ? (
						<Skeleton w={200} />
					) : (
						<Box mt={15}>
							{requestedProjects.data.projects.length === 0 && (
								<Alert color="blue" variant="light" mt={15}>
									{t('routes.Dashboard.error.noActiveProjects')}
								</Alert>
							)}
							{requestedProjects.data.projects.length > 0 && (
								<BasicTable head={headCells} rows={requestedProjects.data.projects} isRowClickable />
							)}
						</Box>
					)}
				</Box>
			</Box>
		</Flex>
	);
};

export default Project;
