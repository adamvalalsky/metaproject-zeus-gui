import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

const PrivateRouteGuard = () => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default PrivateRouteGuard;
