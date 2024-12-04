import { useAuth } from 'react-oidc-context';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Loading from '@/components/global/loading';

const AuthLogin = () => {
	const [params] = useSearchParams();
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/project');
		}
	}, [isAuthenticated]);

	if (params.has('error')) {
		navigate('/');
	}

	return <Loading text="Logging in..." />;
};

export default AuthLogin;
