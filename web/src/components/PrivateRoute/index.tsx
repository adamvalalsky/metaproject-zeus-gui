import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../modules/auth/context.tsx';
import AppMenu from '../AppMenu';

// eslint-disable-next-line
const PrivateRoute = ({ component: Component, ...children }: any) => {
	const { isAuthenticated } = useContext(AuthContext);

	if (!isAuthenticated()) {
		return <Navigate to="/" replace />;
	}

	return (
		<>
			<AppMenu open={false} />
			<Component {...children} />
		</>
	);
};

export default PrivateRoute;
