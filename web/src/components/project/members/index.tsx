import { ActionIcon, Box, Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconTrash } from '@tabler/icons-react';

import { useProjectMembersQuery } from '@/modules/project/queries';
import ErrorAlert from '@/components/global/error-alert';
import AddButton from '@/components/project/members/add-button';

type ProjectMembersProps = {
	id: number;
};

const ProjectMembers = ({ id }: ProjectMembersProps) => {
	const { data: response, isPending, isError } = useProjectMembersQuery(id);

	if (isPending) {
		return <Skeleton w={300} />;
	}

	if (isError) {
		return <ErrorAlert />;
	}

	const members = response.data.members;

	return (
		<Box mt={30}>
			<Group justify="space-between">
				<Title order={3}>Project members</Title>
				{members.length > 0 && <AddButton id={id} />}
			</Group>
			{members.length === 0 && (
				<Stack mt={20} align="center" gap={5}>
					<Text>No members added yet.</Text>
					<AddButton id={id} />
				</Stack>
			)}
			{members.length > 0 && (
				<DataTable
					height={500}
					withTableBorder
					records={members}
					columns={[
						{
							accessor: 'id',
							title: 'ID',
							width: 150
						},
						{
							accessor: 'fullName',
							title: 'Full name',
							render: member => `${member.userInfo.firstName} ${member.userInfo.lastName}`
						},
						{
							accessor: 'username',
							title: 'Username',
							render: member => member.userInfo.username
						},
						{
							accessor: 'role',
							title: 'Role',
							render: member => member.role
						},
						{
							accessor: 'actions',
							title: '',
							textAlign: 'center',
							width: 120,
							render: () => (
								<Group gap={4} justify="space-between" wrap="nowrap">
									<ActionIcon size="sm" variant="subtle" color="red">
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
