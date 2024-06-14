import { ActionIcon, Badge, Box, Group, Text, Title } from '@mantine/core';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconCheck, IconClock, IconForbid, IconTrash, IconUser, IconUserUp } from '@tabler/icons-react';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

import { useProjectMembersQuery } from '@/modules/project/queries';
import ErrorAlert from '@/components/global/error-alert';
import AddButton from '@/components/project/members/add-button';
import { useRemoveProjectMemberMutation } from '@/modules/project/mutations';
import { useProjectOutletContext } from '@/routes/project/detail/guard';
import { PAGE_SIZES } from '@/modules/api/pagination/constants';
import { type ProjectMember } from '@/modules/project/model';
import { getSortQuery } from '@/modules/api/sorting/utils';

type ProjectMembersProps = {
	id: number;
};

const ProjectMembers = ({ id }: ProjectMembersProps) => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(PAGE_SIZES[0]);
	const [currentMember, setCurrentMember] = useState<number | null>(null);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<ProjectMember>>({
		columnAccessor: 'id',
		direction: 'asc'
	});

	const { permissions } = useProjectOutletContext();
	const { mutate, isPending: isRemovePending } = useRemoveProjectMemberMutation();
	const {
		data: response,
		isPending,
		isError,
		refetch
	} = useProjectMembersQuery(
		id,
		{
			page,
			limit
		},
		getSortQuery(sortStatus.columnAccessor, sortStatus.direction)
	);

	if (isError) {
		return <ErrorAlert />;
	}

	const metadata = response?.data?.metadata;
	const members = response?.data?.members ?? [];

	const onPageChange = async (newPage: number) => {
		setPage(newPage);
		await refetch();
	};

	const onRecordsPerPageChange = async (newRecordsPerPage: number) => {
		setLimit(newRecordsPerPage);
		await refetch();
	};

	const onSortStatusChange = async (sortStatus: DataTableSortStatus<ProjectMember>) => {
		setSortStatus(sortStatus);
		await refetch();
	};

	const removeUser = (memberId: number) => {
		setCurrentMember(memberId);
		mutate(
			{ projectId: id, memberId },
			{
				onSuccess: () => {
					refetch().then(() => {
						notifications.show({
							title: 'Success',
							message: 'Member removed successfully',
							color: 'blue'
						});
					});
				},
				onSettled: () => {
					setCurrentMember(null);
				}
			}
		);
	};

	return (
		<Box mt={30}>
			<Group justify="space-between" mb={5}>
				<Group>
					<Title order={3}>Project members</Title>
					{metadata && (
						<Badge variant="filled" color="orange">
							{metadata.totalRecords}
						</Badge>
					)}
				</Group>
				{permissions.includes('edit_members') && <AddButton id={id} />}
			</Group>
			<DataTable
				height={300}
				withTableBorder
				textSelectionDisabled
				fetching={isPending}
				page={page}
				totalRecords={metadata?.totalRecords ?? 0}
				recordsPerPage={limit}
				records={members}
				noRecordsText="No members added yet."
				onPageChange={onPageChange}
				recordsPerPageOptions={PAGE_SIZES}
				onRecordsPerPageChange={onRecordsPerPageChange}
				sortStatus={sortStatus}
				onSortStatusChange={onSortStatusChange}
				columns={[
					{
						accessor: 'id',
						title: 'ID',
						width: 150,
						sortable: true
					},
					{
						accessor: 'name',
						title: 'Full name',
						render: member => member.userInfo.name,
						sortable: true
					},
					{
						accessor: 'username',
						title: 'Username',
						render: member => member.userInfo.username,
						sortable: true
					},
					{
						accessor: 'role',
						title: 'Role',
						render: member => {
							if (member.role === 'manager') {
								return (
									<Group gap={4}>
										<IconUserUp size={16} />
										<Text>Manager</Text>
									</Group>
								);
							}
							return (
								<Group gap={4}>
									<IconUser size={16} />
									<Text>User</Text>
								</Group>
							);
						}
					},
					{
						accessor: 'status',
						title: 'Status',
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
						accessor: 'actions',
						title: '',
						textAlign: 'center',
						width: 120,
						render: member => (
							<Group gap={4} justify="space-between" wrap="nowrap">
								<ActionIcon
									size="sm"
									variant="subtle"
									color="red"
									loading={isRemovePending && currentMember === member.id}
									onClick={() => removeUser(member.id)}
								>
									<IconTrash size={24} />
								</ActionIcon>
							</Group>
						)
					}
				]}
			/>
		</Box>
	);
};

export default ProjectMembers;
