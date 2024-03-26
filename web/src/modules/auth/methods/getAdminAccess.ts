import { ADMIN_KEY } from '../constants.ts';
import { AdminAccess } from '../model.ts';
import { isAuthenticated } from './isAuthenticated.ts';

export const getAdminAccess = (): AdminAccess => {
	if (!isAuthenticated()) {
		return AdminAccess.NONE;
	}

	// TODO this will be implemented by real admin access logic
	if (localStorage.getItem(ADMIN_KEY)) {
		return AdminAccess.LOGGED;
	}

	return AdminAccess.ALLOWED;
};
