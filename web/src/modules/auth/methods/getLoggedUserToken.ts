import { USER_ID } from '@/modules/auth/constants';

export const getLoggedUserToken = () => localStorage.getItem(USER_ID);
