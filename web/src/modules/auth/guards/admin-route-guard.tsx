import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import React from 'react';
import { Box, Flex } from '@mantine/core';

import { useAdminContext } from '@/modules/auth/context';
import { AdminAccess } from '@/modules/auth/model';

const AdminRouteGuard = () => {
	const { isAuthenticated } = useAuth();
	const { getAdminAccess } = useAdminContext();

	if (!isAuthenticated || getAdminAccess() !== AdminAccess.LOGGED) {
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
