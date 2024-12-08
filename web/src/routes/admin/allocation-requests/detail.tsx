import { useParams } from 'react-router';
import React from 'react';
import { Badge, Box, Divider, Group, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

import notFound from '@/components/global/not-found';
import { useAllocationDetailQuery } from '@/modules/allocation/api/allocation-detail';
import ErrorPage from '@/components/global/error-page';
import Loading from '@/components/global/loading';
import AllocationInfo from '@/components/project/allocations/allocation-info';

const AllocationRequestDetail = () => {
	const navigate = useNavigate();
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

	return (
		<Box>
			<Group justify="space-between">
				<Title>Allocation request detail</Title>
				<Group>
					<Badge variant="light" size="lg">
						{allocation.status}
					</Badge>
				</Group>
			</Group>
			<Divider my={10} />
			<AllocationInfo
				allocation={allocation}
				isApprovePage
				onSuccess={() => {
					notifications.show({
						message: 'Allocation request changed'
					});
					navigate('/admin/allocation-requests');
				}}
			/>
		</Box>
	);
};

export default AllocationRequestDetail;
