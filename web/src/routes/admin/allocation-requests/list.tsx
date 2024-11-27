import { Box, Title } from '@mantine/core';
import type { DataTableSortStatus } from 'mantine-datatable';
import React from 'react';
import { useTranslation } from 'react-i18next';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import AllocationAdminTable from '@/components/project/allocations/allocation-table';
import type { AllocationAdmin } from '@/modules/allocation/model';
import { useAllocationsRequestsQuery } from '@/modules/allocation/api/admin-allocations';
import { getSortQuery } from '@/modules/api/sorting/utils';

const AllocationRequestsList = () => {
	const { t } = useTranslation();

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{
						title: t('components.global.drawerList.links.admin.link.allocation_requests'),
						href: '/admin/allocation-requests'
					}
				]}
			/>
			<Title order={2}>{t('components.global.drawerList.links.admin.link.allocation_requests')}</Title>
			<AllocationAdminTable
				useAllocationQuery={(page: number, limit: number, sortStatus: DataTableSortStatus<AllocationAdmin>) =>
					useAllocationsRequestsQuery(
						{
							page,
							limit
						},
						getSortQuery(sortStatus.columnAccessor, sortStatus.direction)
					)
				}
				buildLink={(allocation: AllocationAdmin) => `/admin/allocations/${allocation.id}`}
			/>
		</Box>
	);
};

export default AllocationRequestsList;
