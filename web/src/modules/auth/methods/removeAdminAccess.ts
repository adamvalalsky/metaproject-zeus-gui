import { ADMIN_KEY } from '@/modules/auth/constants';
import { getAdminAccess } from '@/modules/auth/methods/getAdminAccess';

export const removeAdminAccess = () => {
	localStorage.removeItem(ADMIN_KEY);
	return getAdminAccess();
};
