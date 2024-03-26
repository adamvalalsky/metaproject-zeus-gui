import { Button, Dialog, DialogTitle, FormControlLabel, Switch, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';
import { AuthContext } from '../../modules/auth/context.tsx';
import { AdminAccess } from '../../modules/auth/model.ts';

const AdministratorToggle = () => {
	const { getAdminAccess, removeAdminAccess } = useContext(AuthContext);
	const adminAccess = getAdminAccess();
	const { t } = useTranslation();

	if (adminAccess === AdminAccess.NONE) {
		return null;
	}

	const [isOpen, setIsOpen] = useState(false);
	const [checked, setChecked] = useState(adminAccess === AdminAccess.LOGGED);

	const onChange = () => {
		if (checked) {
			removeAdminAccess();
			setChecked(false);
		} else {
			setIsOpen(true);
		}
	};

	const closeDialog = () => {
		setIsOpen(false);
	};

	return (
		<Box>
			<FormControlLabel
				control={<Switch size="small" color="default" checked={checked} onChange={onChange} />}
				label={t('components.AdministratorToggle.switchLabel')}
			/>
			<Dialog onClose={closeDialog} open={isOpen}>
				<Box sx={{ padding: 3 }}>
					<DialogTitle>{t('components.AdministratorToggle.dialog.title')}</DialogTitle>
					<Form method="post">
						<TextField
							fullWidth
							id="title"
							name="title"
							label={t('components.AdministratorToggle.dialog.password')}
							variant="outlined"
							margin="normal"
							required
						/>
						<Button
							type="submit"
							variant="contained"
							color="success"
							sx={{
								margin: '0 auto',
								mt: 2,
								display: 'block',
								width: 200,
								color: 'primary.contrastText',
								backgroundColor: 'primary.main',
								'&:hover': {
									backgroundColor: 'primary.dark'
								}
							}}
						>
							{t('components.AdministratorToggle.dialog.submit')}
						</Button>
					</Form>
				</Box>
			</Dialog>
		</Box>
	);
};

export default AdministratorToggle;
