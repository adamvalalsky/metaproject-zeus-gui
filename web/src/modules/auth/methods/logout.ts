import { USER_ID } from '../constants.ts';

export const logout = async () => {
	localStorage.removeItem(USER_ID);
};
