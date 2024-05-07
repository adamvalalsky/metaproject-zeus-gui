import React, { Suspense } from 'react';
import { Await, Link, useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Divider, Flex, Group, Skeleton, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import useWindowSize from '../../hooks/useWindowSize.ts';
import { Project } from '../../modules/project/model.ts';
import BasicTable from '../../components/project/basic-table';
import { HeadCell } from '../../components/project/basic-table/types.ts';
import { DeferredProjectResponse } from './loader.ts';

const Dashboard: React.FC = () => {
	const windowSize = useWindowSize();
	const { t } = useTranslation();
	const data = useLoaderData() as DeferredProjectResponse;

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
					<Suspense fallback={<Skeleton w={200} />}>
						<Await
							resolve={data.activeProjects}
							errorElement={
								<Alert color="red" mt={15} variant="light">
									{t('routes.Dashboard.error.connection')}
								</Alert>
							}
						>
							{(activeProjects) => (
								<Box mt={15}>
									{activeProjects.data.projects.length === 0 && (
										<Alert color="blue" variant="light" mt={15}>
											{t('routes.Dashboard.error.noActiveProjects')}
										</Alert>
									)}
									{activeProjects.data.projects.length > 0 && (
										<BasicTable
											head={headCells}
											rows={activeProjects.data.projects}
											isRowClickable={true}
										/>
									)}
								</Box>
							)}
						</Await>
					</Suspense>
				</Box>
				<Box mt={15}>
					<Title order={4}>{t('routes.Dashboard.requestedProjects.title')}</Title>
					<Suspense fallback={<Skeleton w={200} />}>
						<Await
							resolve={data.requestedProjects}
							errorElement={
								<Alert color="red" mt={15} variant="light">
									{t('routes.Dashboard.error.connection')}
								</Alert>
							}
						>
							{(requestedProjects) => (
								<Box mt={15}>
									{requestedProjects.data.projects.length === 0 && (
										<Alert color="blue" variant="light">
											{t('routes.Dashboard.error.noRequestedProjects')}
										</Alert>
									)}
									{requestedProjects.data.projects.length > 0 && (
										<BasicTable
											head={headCells}
											rows={requestedProjects.data.projects}
											isRowClickable={true}
										/>
									)}
								</Box>
							)}
						</Await>
					</Suspense>
				</Box>
			</Box>
		</Flex>
	);
};

export default Dashboard;
