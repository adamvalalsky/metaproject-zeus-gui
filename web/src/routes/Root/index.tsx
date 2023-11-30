import React from 'react';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';

const Root: React.FC = () => {
	return (
		<>
			<AppBar position="absolute" color="primary" elevation={0}>
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						Resource manager
					</Typography>
				</Toolbar>
			</AppBar>
			<CssBaseline />
			<div>Hello from index</div>
		</>
	);
};

export default Root;
