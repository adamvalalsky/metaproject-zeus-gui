import { IS_USER_STEP_UP } from '@/modules/auth/constants';

export const userStepDown = () => {
	localStorage.removeItem(IS_USER_STEP_UP);
};
