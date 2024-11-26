import { useParams } from 'react-router';
import { Badge, Box, Divider, Flex, Group, Stack, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import React from 'react';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';
import { useAllocationDetailQuery } from '@/modules/allocation/api/allocation-detail';
import notFound from '@/components/global/not-found';
import ErrorPage from '@/components/global/error-page';
import Loading from '@/components/global/loading';

const AllocationDetail = () => {
	const { t } = useTranslation();
	const { project } = useProjectOutletContext();
	const { allocationId } = useParams();

	if (!allocationId || isNaN(+allocationId)) {
		return notFound();
	}

	const { data: allocation, isPending, isError } = useAllocationDetailQuery(+allocationId);

	if (isError) {
		return <ErrorPage />;
	}

	if (isPending) {
		return <Loading />;
	}

	console.log(allocation);

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: 'Projects', href: '/project' },
					{ title: project.title, href: `/project/${project.id}` },
					{ title: 'Request allocation', href: `/project/${project.id}/allocation` }
				]}
			/>
			<Group justify="space-between">
				<Title>Allocation detail</Title>
				<Group>
					<Badge
						variant="light"
						size="lg"
						color={allocation.status === 'active' ? 'teal' : allocation.status === 'new' ? 'orange' : 'red'}
					>
						{t(`routes.ProjectDetail.status.${allocation.status}`)}
					</Badge>
				</Group>
			</Group>
			<Divider my={10} />
			<Stack mt={15}>
				<Stack gap={2}>
					<Group justify="space-between">
						<Group gap={10}>
							<Title order={4}>Resource:</Title>
							<Text size="lg">
								{allocation.resource.name} ({allocation.resource.type})
							</Text>
						</Group>
						<Text c="dimmed" size="sm">
							Last modified: {dayjs(allocation.updatedAt).format('DD.MM.YYYY')}
						</Text>
					</Group>
					<Group>
						<Title order={4}>Quantity:</Title>
						<Text>{allocation.quantity}</Text>
					</Group>
					<Group>
						<Title order={4}>Start date:</Title>
						<Text>{allocation.startDate ? allocation.startDate : '-not defined-'}</Text>
					</Group>
					<Group>
						<Title order={4}>End date:</Title>
						<Text>{allocation.endDate ? allocation.endDate : '-not defined-'}</Text>
					</Group>
				</Stack>
				<Divider />
				<Flex direction="column">
					<Box>
						<Text fw="bold">Justification:</Text>
						{allocation.justification}
					</Box>
					<Box mt={10}>
						<Text fw="bold">Description:</Text>
						{allocation.description ? allocation.description : '-not defined-'}
					</Box>
				</Flex>
			</Stack>

			<Stack mt={20}>
				<Title order={2}>Users in allocation</Title>
				<DataTable
					records={allocation.allocationUsers}
					textSelectionDisabled
					columns={[
						{
							accessor: 'id',
							title: 'ID',
							width: 70
						},
						{
							accessor: 'name',
							title: 'Name'
						},
						{
							accessor: 'email',
							title: 'E-mail'
						}
					]}
				/>
			</Stack>
		</Box>
	);
};

export default AllocationDetail;
