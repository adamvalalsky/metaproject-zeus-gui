import { Anchor, Box, Divider, Flex, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { type AllocationDetail } from '@/modules/allocation/model';
import { getCurrentRole } from '@/modules/auth/methods/getCurrentRole';
import { Role } from '@/modules/user/role';
import { type ApproveAllocationSchema, approveAllocationSchema } from '@/modules/allocation/form';

type AllocationInfoProps = {
	allocation: AllocationDetail;
	isApprovePage: boolean;
};

const AllocationInfo = ({ allocation, isApprovePage }: AllocationInfoProps) => {
	const role = getCurrentRole();
	const showAdminPage = role === Role.ADMIN && isApprovePage;
	const { control, register } = useForm<ApproveAllocationSchema>({
		resolver: zodResolver(approveAllocationSchema)
	});

	return (
		<Box>
			<Stack mt={15}>
				<Stack gap={2}>
					<Group justify="space-between">
						<Group gap={10}>
							<Title order={4}>Resource:</Title>
							{!showAdminPage && (
								<Text size="lg">
									{allocation.resource.name} ({allocation.resource.type})
								</Text>
							)}
							{showAdminPage && (
								<Anchor component={Link} to={`/admin/resources/${allocation.resource.id}`}>
									{allocation.resource.name} ({allocation.resource.type})
								</Anchor>
							)}
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
						{!showAdminPage && <Text>{allocation.startDate ? allocation.startDate : '-not defined-'}</Text>}
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

export default AllocationInfo;
