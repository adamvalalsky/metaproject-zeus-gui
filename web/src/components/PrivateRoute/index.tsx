import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Drawer } from '@mui/material';
import { AuthContext } from '../../modules/auth/context.tsx';
import AppMenu from '../AppMenu';
import DrawerList from '../DrawerList';

// eslint-disable-next-line
const PrivateRoute = ({ component: Component, ...children }: any) => {
	const [open, setOpen] = useState(false);
	const { isAuthenticated } = useContext(AuthContext);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	if (!isAuthenticated()) {
		return <Navigate to="/" replace />;
	}

	return (
		<>
			<AppMenu open={open} toggleDrawer={toggleDrawer(true)} />
			<Drawer open={open} onClose={toggleDrawer(false)}>
				<DrawerList toggleDrawer={toggleDrawer(false)} />
			</Drawer>
			<Component {...children} />
		</>
	);
};

export default PrivateRoute;
