import { type FormEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Modal, Switch, TextInput, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { AdminAccess } from '@/modules/auth/model';
import { AuthContext } from '@/modules/auth/context';
import { isAdminLoggedIn } from '@/modules/user/utils/admin';

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

	const [isOpen, { open, close }] = useDisclosure(false);
	const [checked, setChecked] = useState(isAdminLoggedIn(adminAccess));

	const onChange = () => {
		if (checked) {
			const defaultAccess = removeAdminAccess();
			setChecked(false);
			setAdminMenu(defaultAccess);
		} else {
			open();
		}
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// TODO: authorize via backend
		const key = 'test';

		setAdminAccess(key);
		setAdminMenu(AdminAccess.LOGGED);
		setChecked(true);
		close();
	};

	return (
		<Box>
			<Tooltip
				refProp="rootRef"
				label={t('components.global.administratorToggle.switchDescription')}
				zIndex={600}
			>
				<Switch
					color="yellow"
					checked={checked}
					onChange={onChange}
					size="md"
					onLabel={t('components.global.administratorToggle.switchLabel')}
					offLabel={t('components.global.administratorToggle.switchLabel')}
				/>
			</Tooltip>
			<Modal
				opened={isOpen}
				onClose={close}
				centered
				title={t('components.global.administratorToggle.dialog.title')}
			>
				<form method="post" onSubmit={onSubmit}>
					<TextInput
						type="password"
						id="title"
						name="title"
						label={t('components.global.administratorToggle.dialog.password')}
						placeholder={t('components.global.administratorToggle.dialog.password')}
						withAsterisk
					/>
					<Flex mt={10} justify="center">
						<Button type="submit" variant="contained" color="success">
							{t('components.global.administratorToggle.dialog.submit')}
						</Button>
					</Flex>
				</form>
			</Modal>
		</Box>
	);
};

export default AdministratorToggle;
