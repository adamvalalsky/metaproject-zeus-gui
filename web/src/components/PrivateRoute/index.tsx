import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../modules/auth/context.tsx';
import AppMenu from '../AppMenu';
import { MainContainer } from './styled.tsx';

// eslint-disable-next-line
const PrivateRoute = ({ component: Component, ...children }: any) => {
	const { isAuthenticated } = useContext(AuthContext);
	const [isOpen, setIsOpen] = useState(true);

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
