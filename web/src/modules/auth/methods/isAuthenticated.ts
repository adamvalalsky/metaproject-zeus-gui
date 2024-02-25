import { USER_ID } from '../constants.ts';

export const isAuthenticated = () => {
	// TODO probably will call something with OAuth, for now we just store ID in local storage
	return localStorage.getItem(USER_ID) != null;
};
