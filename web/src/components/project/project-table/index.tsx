import { Alert, Box, Skeleton, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { type UseQueryResult } from '@tanstack/react-query';

import classes from '@/routes/project/project.module.css';
import { type ApiResponse } from '@/modules/api/model';
import { type MyProjectResponse } from '@/modules/project/model';

type ProjectTableProps = {
	title: string;
	useProjectsQuery: () => UseQueryResult<ApiResponse<MyProjectResponse>, Error>;
};

const ProjectTable = ({ useProjectsQuery, title }: ProjectTableProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { data, isPending, isError } = useProjectsQuery();

	if (isError) {
		return (
			<Alert color="red" mt={15} variant="light">
				{t('routes.Dashboard.error.connection')}
			</Alert>
		);
	}

	if (isPending) {
		return <Skeleton w={200} />;
	}

	const projects = data?.data.projects ?? [];

	return (
		<Box mt={15}>
			<Title order={4}>{title}</Title>
			<Box mt={15}>
				{projects.length === 0 && (
					<Alert color="blue" variant="light" mt={15}>
						{t('routes.Dashboard.error.noActiveProjects')}
					</Alert>
				)}
				{projects.length > 0 && (
					<DataTable
						height="70vh"
						className={classes.table}
						records={projects}
						textSelectionDisabled
						highlightOnHover
						onRowClick={({ record }) => navigate(`/project/${record.id}`)}
						columns={[
							{
								accessor: 'id',
								title: t('routes.Dashboard.table.id'),
								width: 70
							},
							{
								accessor: 'title',
								title: t('routes.Dashboard.table.name')
							},
							{
								accessor: 'description',
								title: t('routes.Dashboard.table.description')
							}
						]}
					/>
				)}
			</Box>
		</Box>
	);
};

export default ProjectTable;
