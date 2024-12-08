import { useTranslation } from 'react-i18next';
import { Box, Title } from '@mantine/core';
import type { DataTableSortStatus } from 'mantine-datatable';
import React from 'react';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import ProjectAdminTable from '@/components/project/project-table/admin-table';
import type { Project } from '@/modules/project/model';
import { useAllProjectsQuery } from '@/modules/project/queries';
import { getSortQuery } from '@/modules/api/sorting/utils';

const AllProjects = () => {
	const { t } = useTranslation();

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{ title: t('components.global.drawerList.links.admin.link.projects'), href: '/admin/projects' }
				]}
			/>
			<Title order={2}>{t('routes.AllProjects.title')}</Title>
			<ProjectAdminTable
				useProjectQuery={(page: number, limit: number, sortStatus: DataTableSortStatus<Project>) =>
					useAllProjectsQuery(
						{
							page,
							limit
						},
						getSortQuery(sortStatus.columnAccessor, sortStatus.direction)
					)
				}
				buildLink={(project: Project) => `/project/${project.id}`}
			/>
		</Box>
	);
};

export default AllProjects;
