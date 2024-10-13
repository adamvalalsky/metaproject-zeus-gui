import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Switch, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useLocation, useNavigate } from 'react-router-dom';

import { StepUpAccess } from '@/modules/auth/model';
import { userStepDown } from '@/modules/auth/methods/userStepDown';
import { userStepUp } from '@/modules/auth/methods/userStepUp';
import { getMaxRole } from '@/modules/auth/methods/getMaxRole';
import { Role } from '@/modules/user/role';

type StepUpToggleProps = {
	stepUpAccess: StepUpAccess;
};

const StepUpToggle = ({ stepUpAccess }: StepUpToggleProps) => {
	const maxRole = getMaxRole();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation();

	if (stepUpAccess === StepUpAccess.NONE || maxRole === Role.USER) {
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
			title: t(`components.global.stepUpToggle.${maxRole}.dialog.title`),
			centered: true,
			children: t(`components.global.stepUpToggle.${maxRole}.dialog.description`),
			labels: {
				confirm: t(`components.global.stepUpToggle.${maxRole}.dialog.confirm`),
				cancel: t(`components.global.stepUpToggle.${maxRole}.dialog.cancel`)
			},
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

export default StepUpToggle;
