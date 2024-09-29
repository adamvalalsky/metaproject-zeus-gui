import { useAuth } from 'react-oidc-context';

import { ADMIN_KEY } from '@/modules/auth/constants';
import { AdminAccess } from '@/modules/auth/model';

export const getAdminAccess = (): AdminAccess => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return AdminAccess.NONE;
	}

	// TODO this will be implemented by real admin access logic
	if (localStorage.getItem(ADMIN_KEY)) {
		return AdminAccess.LOGGED;
	}

	return AdminAccess.ALLOWED;
};
