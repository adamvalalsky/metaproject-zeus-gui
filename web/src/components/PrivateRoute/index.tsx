import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../modules/auth/context.tsx';
import AppMenu from '../global/navbar';
import useWindowSize from '../../hooks/useWindowSize.ts';
import { MainContainer } from './styled.tsx';

// eslint-disable-next-line
const PrivateRoute = ({ component: Component, ...children }: any) => {
	const { isAuthenticated } = useContext(AuthContext);
	const windowSize = useWindowSize();
	const [isOpen, setIsOpen] = useState(windowSize > 1000);

	useEffect(() => {
		setIsOpen(windowSize > 1000);
	}, [windowSize]);

	if (!isAuthenticated()) {
		return <Navigate to="/" replace />;
	}

	return (
		<>
			<AppMenu isOpen={isOpen} setIsOpen={setIsOpen} shouldHaveDrawer={true} />
			<MainContainer isOpen={isOpen}>
				<Component {...children} />
			</MainContainer>
		</>
	);
};

export default PrivateRoute;
