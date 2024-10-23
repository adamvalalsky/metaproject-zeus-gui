import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import React from 'react';
import { Box, Flex } from '@mantine/core';

import Loading from '@/components/global/loading';
import { getStepUpAccess } from '@/modules/auth/methods/getStepUpAccess';
import { StepUpAccess } from '@/modules/auth/model';

const AdminRouteGuard = () => {
	const { isAuthenticated, isLoading } = useAuth();
	const stepUpAccess = getStepUpAccess();

	if (isLoading) {
		return <Loading />;
	}

	if (!isAuthenticated || stepUpAccess !== StepUpAccess.LOGGED) {
		return <Navigate to="/" replace />;
	}

	return (
		<Flex mt={15} direction="column" align="center">
			<Box w="80%" mt={20}>
				<Outlet />
			</Box>
		</Flex>
	);
};

export default AdminRouteGuard;
