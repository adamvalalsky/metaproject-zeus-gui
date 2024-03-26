import { Button, Dialog, DialogTitle, FormControlLabel, Switch, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { FormEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminAccess } from '../../modules/auth/model.ts';
import { AuthContext } from '../../modules/auth/context.tsx';

type AdministratorToggleProps = {
	adminAccess: AdminAccess;
	setAdminMenu: (adminAccess: AdminAccess) => void;
};

const AdministratorToggle = ({ adminAccess, setAdminMenu }: AdministratorToggleProps) => {
	const { removeAdminAccess, setAdminAccess } = useContext(AuthContext);
	const { t } = useTranslation();

	if (adminAccess === AdminAccess.NONE) {
		return null;
	}

	const [isOpen, setIsOpen] = useState(false);
	const [checked, setChecked] = useState(adminAccess === AdminAccess.LOGGED);

	const onChange = () => {
		if (checked) {
			const defaultAccess = removeAdminAccess();
			setChecked(false);
			setAdminMenu(defaultAccess);
		} else {
			setIsOpen(true);
		}
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// TODO: authorize via backend
		const key = 'test';

		setAdminAccess(key);
		setAdminMenu(AdminAccess.LOGGED);
		setChecked(true);
		setIsOpen(false);
	};

	const closeDialog = () => {
		setIsOpen(false);
	};

	return (
		<Box>
			<FormControlLabel
				control={<Switch size="small" color="secondary" checked={checked} onChange={onChange} />}
				label={t('components.AdministratorToggle.switchLabel')}
			/>
			<Dialog onClose={closeDialog} open={isOpen}>
				<Box sx={{ padding: 3 }}>
					<DialogTitle>{t('components.AdministratorToggle.dialog.title')}</DialogTitle>
					<form method="post" onSubmit={onSubmit}>
						<TextField
							fullWidth
							type="password"
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
					</form>
				</Box>
			</Dialog>
		</Box>
	);
};

export default AdministratorToggle;
