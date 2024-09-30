import { ADMIN_KEY } from '@/modules/auth/constants';

export const removeAdminAccess = () => {
	localStorage.removeItem(ADMIN_KEY);
};
