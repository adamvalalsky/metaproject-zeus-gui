import { USER_ID } from '../constants.ts';

export const signInRedirect = async (userId: number) => {
	localStorage.setItem(USER_ID, userId.toString());
};
