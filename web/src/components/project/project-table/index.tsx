import { Alert, Box, Skeleton, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import classes from '@/routes/project/project.module.css';
import { PAGE_SIZES } from '@/modules/api/pagination/constants';
import { type ProjectStatus } from '@/modules/project/constants';
import { useProjectsQuery } from '@/modules/project/queries';

type ProjectTableProps = {
	title: string;
	status: ProjectStatus;
};

const ProjectTable = ({ status, title }: ProjectTableProps) => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(PAGE_SIZES[0]);

	const { t } = useTranslation();
	const navigate = useNavigate();
	const { data, isPending, isError } = useProjectsQuery(status, {
		page,
		limit
	});

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

	const metadata = data.data.metadata;
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
						page={page}
						totalRecords={metadata.totalRecords}
						recordsPerPage={limit}
						recordsPerPageOptions={PAGE_SIZES}
						onPageChange={setPage}
						onRecordsPerPageChange={setLimit}
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
