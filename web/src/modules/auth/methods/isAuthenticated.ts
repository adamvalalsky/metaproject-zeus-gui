import { USER_ID } from '@/modules/auth/constants';

export const isAuthenticated = () =>
	// TODO probably will call something with OAuth, for now we just store ID in local storage
	localStorage.getItem(USER_ID) !== null;
