import { Alert, Box, Skeleton, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { DataTable } from 'mantine-datatable';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { PAGE_SIZES } from '@/modules/api/pagination/constants';
import { useProjectRequestsQuery } from '@/modules/project/queries';
import { strip } from '@/modules/html/strip';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';

const ProjectRequests = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(PAGE_SIZES[0]);

	const {
		data: response,
		isPending,
		isError,
		refetch
	} = useProjectRequestsQuery({
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

	const metadata = response.metadata;
	const requests = response.projects ?? [];

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{ title: t('components.global.drawerList.links.admin.link.requests'), href: '/admin/requests' }
				]}
			/>
			<Title order={2}>{t('routes.ProjectRequests.title')}</Title>
			<Box mt={15}>
				{requests.length === 0 && (
					<Alert color="blue" variant="light" mt={15}>
						{t('routes.Dashboard.error.noActiveProjects')}
					</Alert>
				)}
				{requests.length > 0 && (
					<DataTable
						records={requests}
						textSelectionDisabled
						page={page}
						totalRecords={metadata.totalRecords}
						recordsPerPage={limit}
						recordsPerPageOptions={PAGE_SIZES}
						onPageChange={async newPage => {
							setPage(newPage);
							await refetch();
						}}
						onRecordsPerPageChange={async newRecordsPerPage => {
							setLimit(newRecordsPerPage);
							await refetch();
						}}
						highlightOnHover
						onRowClick={({ record }) => navigate(`${record.id}`)}
						columns={[
							{
								accessor: 'id',
								title: t('routes.Dashboard.table.id'),
								width: 70,
								sortable: true
							},
							{
								accessor: 'title',
								title: t('routes.Dashboard.table.name'),
								sortable: true
							},
							{
								accessor: 'description',
								width: 300,
								title: t('routes.Dashboard.table.description'),
								render: project => {
									const stripped = strip(project.description);
									return stripped.length > 50 ? `${stripped.slice(0, 50)}...` : stripped;
								}
							},
							{
								accessor: 'pi',
								title: t('routes.ProjectRequests.table.pi'),
								render: project => project.user.name
							},
							{
								accessor: 'createdAt',
								title: t('routes.ProjectRequests.table.createdAt'),
								render: project => dayjs(project.createdAt).format('DD.MM.YYYY HH:mm')
							}
						]}
					/>
				)}
			</Box>
		</Box>
	);
};

export default ProjectRequests;
