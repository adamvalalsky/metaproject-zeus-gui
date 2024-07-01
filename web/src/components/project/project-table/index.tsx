import { Alert, Box, Skeleton, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import classes from '@/routes/project/project.module.css';
import { type Project } from '@/modules/project/model';

type ProjectTableProps = {
	isLoading: boolean;
	title: string;
	projects?: Project[];
};

const ProjectTable = ({ title, isLoading, projects }: ProjectTableProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<Box mt={15}>
			<Title order={4}>{title}</Title>
			{isLoading || projects === undefined ? (
				<Skeleton w={200} />
			) : (
				<Box mt={15}>
					{projects.length === 0 && (
						<Alert color="blue" variant="light" mt={15}>
							{t('routes.Dashboard.error.noActiveProjects')}
						</Alert>
					)}
					{projects.length > 0 && (
						<DataTable
							height={350}
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
			)}
		</Box>
	);
};

export default ProjectTable;
