import { ADMIN_KEY } from '../constants';

export const removeAdminAccess = () => {
	localStorage.removeItem(ADMIN_KEY);
};
