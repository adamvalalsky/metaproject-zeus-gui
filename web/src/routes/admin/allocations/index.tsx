import { useTranslation } from 'react-i18next';
import { Box, Title } from '@mantine/core';
import type { DataTableSortStatus } from 'mantine-datatable';
import React from 'react';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { getSortQuery } from '@/modules/api/sorting/utils';
import { useAllAllocationsQuery } from '@/modules/allocation/api/admin-allocations';
import { type AllocationAdmin } from '@/modules/allocation/model';
import AllocationAdminTable from '@/components/project/allocations/allocation-table';

const AdminAllocations = () => {
	const { t } = useTranslation();

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{
						title: t('components.global.drawerList.links.admin.link.allocations'),
						href: '/admin/allocations'
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
