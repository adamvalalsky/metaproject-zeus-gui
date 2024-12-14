import { Box, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import React from 'react';
import type { DataTableSortStatus } from 'mantine-datatable';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import ProjectAdminTable from '@/components/project/project-table/admin-table';
import { useProjectRequestsQuery } from '@/modules/project/queries';
import type { Project } from '@/modules/project/model';
import { getSortQuery } from '@/modules/api/sorting/utils';
import { getCurrentRole } from '@/modules/auth/methods/getCurrentRole';
import { Role } from '@/modules/user/role';

const ProjectRequests = () => {
	const { t } = useTranslation();
	const role = getCurrentRole();
	const prefix = role === Role.ADMIN ? '/admin' : '/director';

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t(`components.global.drawerList.links.${role}.title`), href: prefix },
					{ title: t(`components.global.drawerList.links.${role}.link.requests`), href: `${prefix}/requests` }
				]}
			/>
			<Title order={2}>{t('routes.ProjectRequests.title')}</Title>
			<ProjectAdminTable
				useProjectQuery={(page: number, limit: number, sortStatus: DataTableSortStatus<Project>) =>
					useProjectRequestsQuery(
						{
							page,
							limit
						},
						getSortQuery(sortStatus.columnAccessor, sortStatus.direction)
					)
				}
				buildLink={(project: Project) => `${project.id}`}
			/>
		</Box>
	);
};

export default ProjectRequests;
