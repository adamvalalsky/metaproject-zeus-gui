import { USER_ID } from '@/modules/auth/constants';
import { type User } from '@/modules/user/model';

export const getLoggedUserInfo = (): User | null => {
	const userId = localStorage.getItem(USER_ID);

	if (!userId) {
		return null;
	}

	return {
		id: +userId,
		username: 'testUser',
		firstName: 'Adam',
		lastName: 'Valalsky'
	};
};
