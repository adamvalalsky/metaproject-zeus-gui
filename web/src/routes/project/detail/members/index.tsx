import { ActionIcon, Box, Button, Group, Select, Title } from '@mantine/core';
import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';

import { useProjectOutletContext } from '@/routes/project/detail/guard';
import AddMembersSelect from '@/components/project/members/add-members-select';
import { type UserInfo } from '@/modules/user/model';

const ProjectDetailMembers = () => {
	const { project } = useProjectOutletContext();
	const [pickedMembers, setPickedMembers] = useState<UserInfo[]>([]);
	const [roles, setRoles] = useState<Record<number, string>>({});

	const handleSelect = (member: UserInfo) => {
		// user is picked - remove
		if (pickedMembers.some(pickedMember => pickedMember.id === member.id)) {
			setPickedMembers(pickedMembers.filter(pickedMember => pickedMember.id !== member.id));
			setRoles({ ...roles, [member.id]: 'user' });
		} else {
			setPickedMembers([...pickedMembers, member]);
			setRoles({ ...roles, [member.id]: 'user' });
		}
	};

	return (
		<Box>
			<Title>{project.title}</Title>
			<Title order={3} mt={20}>
				Add members
				<AddMembersSelect pickedMembers={pickedMembers} handleSelect={handleSelect} />
			</Title>
			{pickedMembers.length > 0 && (
				<Box mt={30}>
					<Title order={4}>Picked members</Title>
					<DataTable
						height={500}
						withTableBorder
						striped
						records={pickedMembers}
						columns={[
							{
								accessor: 'id',
								title: 'ID',
								width: 150
							},
							{
								accessor: 'Name',
								title: 'Name',
								render: userInfo => userInfo.name
							},
							{
								accessor: 'username',
								title: 'Username',
								render: userInfo => userInfo.username
							},
							{
								accessor: 'email',
								title: 'E-mail',
								render: userInfo => userInfo.email
							},
							{
								accessor: 'role',
								title: 'Role',
								width: 200,
								render: userInfo => (
									<Select
										allowDeselect={false}
										value={roles[userInfo.id] || 'user'}
										onChange={value => {
											if (value) {
												setRoles({ ...roles, [userInfo.id]: value });
											}
										}}
										data={[
											{ value: 'user', label: 'User' },
											{ value: 'manager', label: 'Manager' }
										]}
									/>
								)
							},
							{
								accessor: 'actions',
								title: '',
								textAlign: 'center',
								width: 120,
								render: userInfo => (
									<Group gap={4} justify="space-between" wrap="nowrap">
										<ActionIcon
											size="sm"
											variant="subtle"
											color="red"
											onClick={() => handleSelect(userInfo)}
										>
											<IconTrash size={24} />
										</ActionIcon>
									</Group>
								)
							}
						]}
					/>
					<Button color="teal" fullWidth mt={10}>
						Add {pickedMembers.length} member{pickedMembers.length > 1 ? 's' : ''}
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default ProjectDetailMembers;
