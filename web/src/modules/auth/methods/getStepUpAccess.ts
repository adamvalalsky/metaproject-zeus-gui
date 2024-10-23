import { IS_USER_STEP_UP, MAX_ROLE } from '@/modules/auth/constants';
import { StepUpAccess } from '@/modules/auth/model';

export const getStepUpAccess = (): StepUpAccess => {
	const maxRole = localStorage.getItem(MAX_ROLE);

	if (!maxRole || maxRole === 'user') {
		return StepUpAccess.NONE;
	}

	const isStepUp = localStorage.getItem(IS_USER_STEP_UP);
	if (isStepUp === 'true') {
		return StepUpAccess.LOGGED;
	}

	return StepUpAccess.ALLOWED;
};
