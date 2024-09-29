import { useAuth } from 'react-oidc-context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '@/components/global/loading';

const AuthLogin = () => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/project');
		}
	}, [isAuthenticated]);

	return <Loading text="Logging in..." />;
};

export default AuthLogin;
