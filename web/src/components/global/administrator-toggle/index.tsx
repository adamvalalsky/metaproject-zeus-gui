import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Switch, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useLocation, useNavigate } from 'react-router-dom';

import { AdminAccess } from '@/modules/auth/model';
import { useAdminContext } from '@/modules/auth/context';
import { isAdminLoggedIn } from '@/modules/user/utils/admin';

type AdministratorToggleProps = {
	adminAccess: AdminAccess;
};

const AdministratorToggle = ({ adminAccess }: AdministratorToggleProps) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { removeAdminAccess, setAdminAccess } = useAdminContext();
	const { t } = useTranslation();

	if (adminAccess === AdminAccess.NONE) {
		return null;
	}

	const openModal = () => {
		if (checked) {
			removeAdminAccess();
			setChecked(false);

			if (pathname.includes('/admin')) {
				navigate('/project');
			}
			return;
		}

		modals.openConfirmModal({
			title: t('components.global.administratorToggle.dialog.title'),
			centered: true,
			children: 'Do you want to gain administrator access?',
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			onConfirm: () => {
				// TODO: authorize via backend
				const key = 'test';

				setAdminAccess(key);
				setChecked(true);
			}
		});
	};

	const [checked, setChecked] = useState(isAdminLoggedIn(adminAccess));

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
					onChange={openModal}
					size="md"
					onLabel={t('components.global.administratorToggle.switchLabel')}
					offLabel={t('components.global.administratorToggle.switchLabel')}
				/>
			</Tooltip>
		</Box>
	);
};

export default AdministratorToggle;
