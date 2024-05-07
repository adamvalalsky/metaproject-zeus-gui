import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/global/navbar';

const Root: React.FC = () => {
	return (
		<>
			<Navbar>
				<Outlet />
			</Navbar>
		</>
	);
};

export default Root;
