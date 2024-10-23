import { IS_USER_STEP_UP } from '@/modules/auth/constants';

export const userStepUp = () => {
	localStorage.setItem(IS_USER_STEP_UP, 'true');
};
