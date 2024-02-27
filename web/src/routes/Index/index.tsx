import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import React, { useContext, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import MuniIcon from '../../components/Icons/MuniIcon';
import { AuthContext } from '../../modules/auth/context.tsx';
import AppMenu from '../../components/AppMenu';

const Index: React.FC = () => {
	const { signInRedirect, isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated()) {
			navigate('/dashboard', { replace: true });
		}
	}, []);

	// TODO just temporary real OIDC will be implemented by callbacks
	const signIn = () => {
		signInRedirect();
		navigate('/dashboard', { replace: true });
	};

	return (
		<>
			<AppMenu toggleDrawer={null} />
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
						onClick={signIn}
						sx={{
							marginTop: 3,
							width: 300
						}}
					>
						MUNI
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default Index;
