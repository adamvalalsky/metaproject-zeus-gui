import { ADMIN_KEY } from '../constants';

export const setAdminAccess = (key: string) => {
	localStorage.setItem(ADMIN_KEY, key);
};
