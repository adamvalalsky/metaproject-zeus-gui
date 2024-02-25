import Box from '@mui/material/Box';
import React from 'react';
import { Typography } from '@mui/material';

const Dashboard: React.FC = () => {
	return (
		<Box
			sx={{
				marginTop: 15,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<Typography component="h1" variant="h5">
				Dashboard
			</Typography>
		</Box>
	);
};

export default Dashboard;
