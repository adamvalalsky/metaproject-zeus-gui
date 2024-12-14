import { Anchor, Box, Button, Divider, Flex, Group, Select, Stack, Text, Textarea, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import React from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateInput } from '@mantine/dates';

import { type AllocationDetail } from '@/modules/allocation/model';
import { getCurrentRole } from '@/modules/auth/methods/getCurrentRole';
import { Role } from '@/modules/user/role';
import { type ApproveAllocationSchema, approveAllocationSchema } from '@/modules/allocation/form';
import { useApproveAllocationMutation } from '@/modules/allocation/api/set-allocation-status';

type AllocationInfoProps = {
	allocation: AllocationDetail;
	isApprovePage: boolean;
	onSuccess?: () => void;
};

const AllocationInfo = ({ allocation, isApprovePage, onSuccess }: AllocationInfoProps) => {
	const role = getCurrentRole();
	const showAdminPage = role === Role.ADMIN && isApprovePage;
	const {
		control,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ApproveAllocationSchema>({
		resolver: zodResolver(approveAllocationSchema)
	});

	const { mutate, isPending } = useApproveAllocationMutation();

	const onApprove = (data: ApproveAllocationSchema) => {
		mutate(
			{
				...data,
				allocationId: allocation.id
			},
			{
				onSuccess: () => {
					onSuccess?.();
				}
			}
		);
	};

	const onDeny = () => {
		mutate(
			{
				allocationId: allocation.id,
				status: 'denied'
			},
			{
				onSuccess: () => {
					onSuccess?.();
				}
			}
		);
	};

	return (
		<form onSubmit={handleSubmit(onApprove)}>
			<Stack mt={15}>
				<Text c="dimmed" size="sm" hiddenFrom="sm">
					Last modified: {dayjs(allocation.updatedAt).format('DD.MM.YYYY')}
				</Text>
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
						<Text c="dimmed" size="sm" visibleFrom="sm">
							Last modified: {dayjs(allocation.updatedAt).format('DD.MM.YYYY')}
						</Text>
					</Group>
					<Group my={5}>
						<Title order={4}>Quantity:</Title>
						<Text>{allocation.quantity}</Text>
					</Group>
					<Group my={5}>
						{!showAdminPage && (
							<>
								<Title order={4}>Start date:</Title>
								<Text>
									{allocation.startDate
										? dayjs(allocation.startDate).format('DD.MM.YYYY')
										: '-not defined-'}
								</Text>
							</>
						)}
						{showAdminPage && (
							<Controller
								control={control}
								name="startDate"
								defaultValue={allocation.startDate ? new Date(allocation.startDate) : undefined}
								render={({ field }) => (
									<DateInput
										label="Start date"
										name={field.name}
										value={field.value}
										error={errors.startDate?.message}
										onChange={value => {
											field.onChange(value);
										}}
									/>
								)}
							/>
						)}
					</Group>
					<Group my={5}>
						{!showAdminPage && (
							<>
								<Title order={4}>End date:</Title>
								<Text>
									{allocation.endDate
										? dayjs(allocation.endDate).format('DD.MM.YYYY')
										: '-not defined-'}
								</Text>
							</>
						)}
						{showAdminPage && (
							<Controller
								control={control}
								name="endDate"
								defaultValue={allocation.endDate ? new Date(allocation.endDate) : undefined}
								render={({ field }) => (
									<DateInput
										withAsterisk
										label="End date"
										name={field.name}
										error={errors.endDate?.message}
										value={field.value}
										onChange={value => {
											field.onChange(value);
										}}
									/>
								)}
							/>
						)}
					</Group>
					{showAdminPage && (
						<Group my={5}>
							<Controller
								control={control}
								name="status"
								defaultValue={allocation.status}
								render={({ field }) => (
									<Select
										label="Status"
										name={field.name}
										error={errors.status?.message}
										value={field.value}
										data={[
											{ value: 'new', label: 'New' },
											{ value: 'active', label: 'Active' },
											{ value: 'expired', label: 'Expired' },
											{ value: 'denied', label: 'Denied' },
											{ value: 'revoked', label: 'Revoked' }
										]}
										onChange={value => {
											if (value) {
												field.onChange(value);
											}
										}}
									/>
								)}
							/>
						</Group>
					)}
				</Stack>
				<Divider />
				<Flex direction="column">
					<Box>
						<Text fw="bold">Justification:</Text>
						{allocation.justification}
					</Box>
					<Box mt={10}>
						<Text fw="bold">Description:</Text>
						{!showAdminPage && (
							<Text>{allocation.description ? allocation.description : '-not defined-'}</Text>
						)}
						{showAdminPage && (
							<Textarea
								placeholder="Provide optional description..."
								minRows={5}
								autosize
								{...register('description')}
							/>
						)}
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

			{showAdminPage && (
				<Group mt={15} justify="end">
					<Button type="submit" color="green" loading={isPending}>
						Approve
					</Button>
					<Button color="red" loading={isPending} onClick={onDeny}>
						Deny
					</Button>
				</Group>
			)}
		</form>
	);
};

export default AllocationInfo;
