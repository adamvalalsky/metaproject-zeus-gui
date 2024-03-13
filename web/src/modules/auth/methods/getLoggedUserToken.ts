import { USER_ID } from '../constants.ts';

export const getLoggedUserToken = () => {
	return localStorage.getItem(USER_ID);
};
