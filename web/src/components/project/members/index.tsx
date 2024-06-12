import { ActionIcon, Box, Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconCheck, IconClock, IconForbid, IconTrash, IconUser, IconUserUp } from '@tabler/icons-react';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

import { useProjectMembersQuery } from '@/modules/project/queries';
import ErrorAlert from '@/components/global/error-alert';
import AddButton from '@/components/project/members/add-button';
import { useRemoveProjectMemberMutation } from '@/modules/project/mutations';
import { useProjectOutletContext } from '@/routes/project/detail/guard';

type ProjectMembersProps = {
	id: number;
};

const ProjectMembers = ({ id }: ProjectMembersProps) => {
	const { permissions } = useProjectOutletContext();
	const { mutate, isPending: isRemovePending } = useRemoveProjectMemberMutation();
	const { data: response, isPending, isError, refetch } = useProjectMembersQuery(id);

	const [currentMember, setCurrentMember] = useState<number | null>(null);

	if (isPending) {
		return <Skeleton w={300} />;
	}

	if (isError) {
		return <ErrorAlert />;
	}

	const members = response.data.members;

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
				<Title order={3}>Project members</Title>
				{members.length > 0 && permissions.includes('edit_members') && <AddButton id={id} />}
			</Group>
			{members.length === 0 && (
				<Stack mt={20} align="center" gap={5}>
					<Text>No members added yet.</Text>
					{permissions.includes('edit_members') && <AddButton id={id} />}
				</Stack>
			)}
			{members.length > 0 && (
				<DataTable
					height={300}
					withTableBorder
					records={members}
					columns={[
						{
							accessor: 'id',
							title: 'ID',
							width: 150
						},
						{
							accessor: 'name',
							title: 'Full name',
							render: member => member.userInfo.name
						},
						{
							accessor: 'username',
							title: 'Username',
							render: member => member.userInfo.username
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
			)}
		</Box>
	);
};

export default ProjectMembers;
