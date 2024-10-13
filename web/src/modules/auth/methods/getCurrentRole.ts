import { getMaxRole } from '@/modules/auth/methods/getMaxRole';
import { getStepUpAccess } from '@/modules/auth/methods/getStepUpAccess';
import { StepUpAccess } from '@/modules/auth/model';
import { Role } from '@/modules/user/role';

export const getCurrentRole = () => {
	const maxRole = getMaxRole();
	const stepUpAccess = getStepUpAccess();

	if (stepUpAccess === StepUpAccess.LOGGED) {
		return maxRole;
	}

	return Role.USER;
};
