import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '@/modules/auth/context';
import { AdminAccess } from '@/modules/auth/model';

const AdminRouteGuard = () => {
	const { isAuthenticated, getAdminAccess } = useContext(AuthContext);

	if (!isAuthenticated() || getAdminAccess() !== AdminAccess.LOGGED) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default AdminRouteGuard;
