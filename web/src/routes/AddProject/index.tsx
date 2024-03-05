import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

const AddProject: React.FC = () => {
	return (
		<Box
			sx={{
				marginTop: 15,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'left'
			}}
		>
			<Typography component="h1" variant="h4">
				Add project
			</Typography>
			<form method="post">
				<TextField id="outlined-basic" label="Outlined" variant="outlined" />
			</form>
		</Box>
	);
};

export default AddProject;
