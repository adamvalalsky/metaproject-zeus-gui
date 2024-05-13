import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '@/modules/auth/context';

const PrivateRoute = () => {
	const { isAuthenticated } = useContext(AuthContext);

	if (!isAuthenticated()) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
