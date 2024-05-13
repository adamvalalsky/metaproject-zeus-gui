import { USER_ID } from '@/modules/auth/constants';

export const logout = async () => {
	localStorage.removeItem(USER_ID);
};
