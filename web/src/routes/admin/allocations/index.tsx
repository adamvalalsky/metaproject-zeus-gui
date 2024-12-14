import { useTranslation } from 'react-i18next';
import { Box, Title } from '@mantine/core';
import type { DataTableSortStatus } from 'mantine-datatable';
import React from 'react';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { getSortQuery } from '@/modules/api/sorting/utils';
import { useAllAllocationsQuery } from '@/modules/allocation/api/admin-allocations';
import { type AllocationAdmin } from '@/modules/allocation/model';
import AllocationAdminTable from '@/components/project/allocations/allocation-table';
import { getCurrentRole } from '@/modules/auth/methods/getCurrentRole';
import { Role } from '@/modules/user/role';

const AdminAllocations = () => {
	const { t } = useTranslation();
	const role = getCurrentRole();
	const prefix = role === Role.ADMIN ? '/admin' : '/director';

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t(`components.global.drawerList.links.${role}.title`), href: prefix },
					{
						title: t(`components.global.drawerList.links.${role}.link.allocations`),
						href: `${prefix}/allocations`
					}
				]}
			/>
			<Title order={2}>{t('components.global.drawerList.links.admin.link.allocations')}</Title>
			<AllocationAdminTable
				useAllocationQuery={(page: number, limit: number, sortStatus: DataTableSortStatus<AllocationAdmin>) =>
					useAllAllocationsQuery(
						{
							page,
							limit
						},
						getSortQuery(sortStatus.columnAccessor, sortStatus.direction)
					)
				}
				buildLink={(allocation: AllocationAdmin) =>
					`/project/${allocation.project.id}/allocation/${allocation.id}`
				}
			/>
		</Box>
	);
};

export default AdminAllocations;
