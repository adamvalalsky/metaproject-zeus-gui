import React from 'react';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Root: React.FC = () => {
	return (
		<>
			<CssBaseline />
			<AppBar position="absolute" color="primary" elevation={0}>
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						Resource manager
					</Typography>
				</Toolbar>
			</AppBar>
			<Outlet />
		</>
	);
};

export default Root;
