import { AdminAccess } from '../../auth/model.ts';

export const isAdminLoggedIn = (adminAccess: AdminAccess) => {
	return adminAccess === AdminAccess.LOGGED;
};
