import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../modules/auth/context.tsx';

// eslint-disable-next-line
const PrivateRoute = ({ component: Component, ...children }: any) => {
	const { isAuthenticated } = useContext(AuthContext);

	if (isAuthenticated()) {
		return <Component {...children} />;
	}

	return <Navigate to="/" replace />;
};

export default PrivateRoute;
