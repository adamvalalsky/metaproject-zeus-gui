import { USER_ID } from '@/modules/auth/constants';

export const signInRedirect = async (userId: number) => {
	localStorage.setItem(USER_ID, userId.toString());
};
