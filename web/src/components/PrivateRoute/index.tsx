import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../modules/auth/context.tsx';

const PrivateRoute = ({ component: Component, ...children }) => {
	const { isAuthenticated } = useContext(AuthContext);

	if (isAuthenticated()) {
		return <Component {...children} />;
	}

	return <Navigate to="/" replace />;
};

export default PrivateRoute;
