import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Switch, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useLocation, useNavigate } from 'react-router-dom';

import { StepUpAccess } from '@/modules/auth/model';
import { userStepDown } from '@/modules/auth/methods/userStepDown';
import { userStepUp } from '@/modules/auth/methods/userStepUp';

type AdministratorToggleProps = {
	stepUpAccess: StepUpAccess;
};

const AdministratorToggle = ({ stepUpAccess }: AdministratorToggleProps) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation();

	if (stepUpAccess === StepUpAccess.NONE) {
		return null;
	}

	const openModal = () => {
		if (checked) {
			userStepDown();
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
				userStepUp();
				setChecked(true);
			}
		});
	};

	const [checked, setChecked] = useState(stepUpAccess === StepUpAccess.LOGGED);

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
