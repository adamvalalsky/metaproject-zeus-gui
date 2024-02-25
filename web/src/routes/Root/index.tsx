import React from 'react';
import { CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Root: React.FC = () => {
	return (
		<>
			<CssBaseline />
			<Outlet />
		</>
	);
};

export default Root;
