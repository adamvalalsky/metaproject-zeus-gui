import { ADMIN_KEY } from '@/modules/auth/constants';
import { AdminAccess } from '@/modules/auth/model';
import { isAuthenticated } from '@/modules/auth/methods/isAuthenticated';

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
