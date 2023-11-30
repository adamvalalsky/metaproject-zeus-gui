import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import React from 'react';
import { Button, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import MuniIcon from '../../components/Icons/MuniIcon';

const Index: React.FC = () => {
	return (
		<Box
			sx={{
				marginTop: 15,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<Box>
				<Button
					variant="contained"
					size="large"
					startIcon={<MuniIcon />}
					sx={{
						marginTop: 3,
						width: 300
					}}
				>
					MUNI
				</Button>
			</Box>
		</Box>
	);
};

export default Index;
