import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

import { useAdminContext } from '@/modules/auth/context';
import { AdminAccess } from '@/modules/auth/model';

const AdminRouteGuard = () => {
	const { isAuthenticated } = useAuth();
	const { getAdminAccess } = useAdminContext();

	if (!isAuthenticated || getAdminAccess() !== AdminAccess.LOGGED) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default AdminRouteGuard;
