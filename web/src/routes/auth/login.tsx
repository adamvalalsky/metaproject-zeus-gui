import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthLogin = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const token = searchParams.get('token');
		console.log(token);

		if (!token) {
			navigate('/', { replace: true });
			return;
		}

		Cookies.set('token', token, { expires: 1 });
	}, []);

	return <Navigate to="/project" replace />;
};

export default AuthLogin;
