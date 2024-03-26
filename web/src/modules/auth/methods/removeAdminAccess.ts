import { ADMIN_KEY } from '../constants';
import { getAdminAccess } from './getAdminAccess.ts';

export const removeAdminAccess = () => {
	localStorage.removeItem(ADMIN_KEY);
	return getAdminAccess();
};
