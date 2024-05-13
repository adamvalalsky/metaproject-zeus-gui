import { ADMIN_KEY } from '@/modules/auth/constants';

export const setAdminAccess = (key: string) => {
	localStorage.setItem(ADMIN_KEY, key);
};
