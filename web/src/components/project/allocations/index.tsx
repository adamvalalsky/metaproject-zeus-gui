import { Badge, Box, Button, Group, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconCheck, IconClock, IconCpu, IconForbid, IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { PAGE_SIZES } from '@/modules/api/pagination/constants';
import type { ProjectMember } from '@/modules/project/model';
import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';

type ProjectAllocationTableProps = {
	id: number;
};

const ProjectAllocationsTable = ({ id }: ProjectAllocationTableProps) => {
	const { t } = useTranslation();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(PAGE_SIZES[0]);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<ProjectMember>>({
		columnAccessor: 'id',
		direction: 'asc'
	});

	const { permissions } = useProjectOutletContext();

	const onPageChange = async (newPage: number) => {
		setPage(newPage);
	};

	const onRecordsPerPageChange = async (newRecordsPerPage: number) => {
		setLimit(newRecordsPerPage);
	};

	const onSortStatusChange = async (sortStatus: DataTableSortStatus<ProjectMember>) => {
		setSortStatus(sortStatus);
	};

	return (
		<Box mt={30}>
			<Group justify="space-between" mb={5}>
				<Group>
					<Title order={3}>
						<IconCpu /> {t('components.project.allocations.index.title')}
					</Title>
					<Badge variant="filled" color="gray">
						0
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
				page={page}
				totalRecords={0}
				recordsPerPage={limit}
				records={[]}
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
						sortable: true
					},
					{
						accessor: 'type',
						title: t('components.project.allocations.index.columns.resource_type'),
						width: 200,
						render: member => member.userInfo.name,
						sortable: true
					},
					{
						accessor: 'information',
						title: t('components.project.allocations.index.columns.information'),
						render: member => member.userInfo.username,
						sortable: true
					},
					{
						accessor: 'status',
						title: t('components.project.allocations.index.columns.status'),
						width: 150,
						sortable: true,
						render: member => {
							if (member.status === 'active') {
								return (
									<Group gap={4} c="green">
										<IconCheck size={14} />
										<Text size="sm">Active</Text>
									</Group>
								);
							}
							if (member.status === 'pending') {
								return (
									<Group gap={4} c="orange">
										<IconClock size={14} />
										<Text size="sm">Pending</Text>
									</Group>
								);
							}
							return (
								<Group gap={4} c="red">
									<IconForbid size={14} />
									<Text size="sm">Inactive</Text>
								</Group>
							);
						}
					},
					{
						accessor: 'end_date',
						title: t('components.project.allocations.index.columns.end_date'),
						render: member => member.userInfo.username,
						width: 150,
						sortable: true
					},
					{
						accessor: 'actions',
						title: t('components.project.allocations.index.columns.actions'),
						textAlign: 'center',
						width: 120,
						render: member => (
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
