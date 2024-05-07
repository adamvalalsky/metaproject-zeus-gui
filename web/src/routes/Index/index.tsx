import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import React, { useContext, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MuniIcon from '../../components/Icons/MuniIcon';
import { AuthContext } from '../../modules/auth/context.tsx';

const Index: React.FC = () => {
	const { signInRedirect, isAuthenticated } = useContext(AuthContext);
	const { t } = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated()) {
			navigate('/project', { replace: true });
		}
	}, []);

	// TODO just temporary real OIDC will be implemented by callbacks
	const signIn = () => {
		signInRedirect();
		navigate('/project', { replace: true });
	};

	return (
		<>
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
					{t('routes.Index.title')}
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
						{t('routes.Index.buttons.MUNI')}
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default Index;
