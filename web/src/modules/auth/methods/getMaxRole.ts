import { MAX_ROLE } from '@/modules/auth/constants';
import { Role } from '@/modules/user/role';

export const getMaxRole = () => {
	const maxRole = localStorage.getItem(MAX_ROLE);
	switch (maxRole) {
		case 'admin':
			return Role.ADMIN;
		case 'director':
			return Role.DIRECTOR;
		default:
			return Role.USER;
	}
};
