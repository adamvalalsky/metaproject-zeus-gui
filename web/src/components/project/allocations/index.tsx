import { Badge, Box, Button, Group, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconCheck, IconClock, IconCpu, IconNews, IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { PAGE_SIZES } from '@/modules/api/pagination/constants';
import { getSortQuery } from '@/modules/api/sorting/utils';
import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';
import { type Allocation } from '@/modules/allocation/model';
import { useProjectAllocationsQuery } from '@/modules/allocation/api/allocations';

type ProjectAllocationTableProps = {
	id: number;
};

const ProjectAllocationsTable = ({ id }: ProjectAllocationTableProps) => {
	const { t } = useTranslation();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(PAGE_SIZES[0]);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Allocation>>({
		columnAccessor: 'id',
		direction: 'asc'
	});

	const { data, isPending, isError } = useProjectAllocationsQuery(
		id,
		{
			page,
			limit
		},
		getSortQuery(sortStatus.columnAccessor, sortStatus.direction)
	);

	const onPageChange = async (newPage: number) => {
		setPage(newPage);
	};

	const onRecordsPerPageChange = async (newRecordsPerPage: number) => {
		setLimit(newRecordsPerPage);
	};

	const onSortStatusChange = async (sortStatus: DataTableSortStatus<Allocation>) => {
		setSortStatus(sortStatus);
	};

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <ErrorAlert />;
	}

	const metadata = data.metadata;
	const allocationsData = data.allocations ?? [];

	if (!metadata) {
		return null;
	}

	return (
		<Box mt={30}>
			<Group justify="space-between" mb={5}>
				<Group>
					<Title order={3}>
						<IconCpu /> {t('components.project.allocations.index.title')}
					</Title>
					<Badge variant="filled" color="gray">
						{metadata.totalRecords}
					</Badge>
				</Group>
				<Button
					component={Link}
					to={`/project/${id}/allocation`}
					color="green"
					leftSection={<IconPlus size={14} />}
				>
					{t('components.project.allocations.index.request_allocation')}
				</Button>
			</Group>
			<DataTable
				height={300}
				withTableBorder
				textSelectionDisabled
				page={metadata.page}
				totalRecords={metadata.totalRecords}
				recordsPerPage={metadata.recordsPerPage}
				records={allocationsData}
				noRecordsText={t('components.project.allocations.index.no_records_text')}
				onPageChange={onPageChange}
				recordsPerPageOptions={PAGE_SIZES}
				onRecordsPerPageChange={onRecordsPerPageChange}
				sortStatus={sortStatus}
				onSortStatusChange={onSortStatusChange}
				columns={[
					{
						accessor: 'name',
						title: t('components.project.allocations.index.columns.resource_name'),
						width: 200,
						render: allocation => allocation.resource.name,
						sortable: true
					},
					{
						accessor: 'type',
						title: t('components.project.allocations.index.columns.resource_type'),
						width: 200,
						render: allocation => allocation.resource.type,
						sortable: true
					},
					{
						accessor: 'information',
						title: t('components.project.allocations.index.columns.information'),
						render: _allocation => null,
						sortable: true
					},
					{
						accessor: 'status',
						title: t('components.project.allocations.index.columns.status'),
						width: 150,
						sortable: true,
						render: allocation => {
							if (allocation.status === 'active') {
								return (
									<Group gap={4} c="green">
										<IconCheck size={14} />
										<Text size="sm">Active</Text>
									</Group>
								);
							}
							if (allocation.status === 'pending') {
								return (
									<Group gap={4} c="orange">
										<IconClock size={14} />
										<Text size="sm">Pending</Text>
									</Group>
								);
							}
							if (allocation.status === 'new') {
								return (
									<Group gap={4} c="blue.9">
										<IconNews size={14} />
										<Text size="sm">New</Text>
									</Group>
								);
							}

							return <Text size="sm">{allocation.status}</Text>;
						}
					},
					{
						accessor: 'endDate',
						title: t('components.project.allocations.index.columns.end_date'),
						width: 150,
						sortable: true
					},
					{
						accessor: 'actions',
						title: t('components.project.allocations.index.columns.actions'),
						textAlign: 'center',
						width: 120,
						render: _allocation => (
							<Group gap={4} justify="space-between" wrap="nowrap">
								action
							</Group>
						)
					}
				]}
			/>
		</Box>
	);
};

export default ProjectAllocationsTable;
