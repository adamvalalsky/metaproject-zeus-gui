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
import { useAdminContext } from '@/modules/auth/admin-context';

type StepUpToggleProps = {
	stepUpAccess: StepUpAccess;
};

const StepUpToggle = ({ stepUpAccess }: StepUpToggleProps) => {
	const { setCurrentRole } = useAdminContext();
	const maxRole = getMaxRole();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [checked, setChecked] = useState(stepUpAccess === StepUpAccess.LOGGED);

	const openModal = () => {
		if (checked) {
			userStepDown();
			setCurrentRole(Role.USER);
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
				setCurrentRole(maxRole);
				setChecked(true);
			}
		});
	};

	if (stepUpAccess === StepUpAccess.NONE || maxRole === Role.USER) {
		return null;
	}

	return (
		<Box>
			<Tooltip
				refProp="rootRef"
				label={t(`components.global.stepUpToggle.${maxRole}.switchDescription`)}
				zIndex={600}
			>
				<Switch
					color={maxRole === Role.ADMIN ? 'yellow' : 'lime'}
					checked={checked}
					onChange={openModal}
					size="md"
					onLabel={t(`components.global.stepUpToggle.${maxRole}.switchLabel`)}
					offLabel={t(`components.global.stepUpToggle.${maxRole}.switchLabel`)}
				/>
			</Tooltip>
		</Box>
	);
};

export default StepUpToggle;
