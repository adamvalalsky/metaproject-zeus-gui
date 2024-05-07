import { USER_ID } from '../constants.ts';
import { User } from '../../user/model.ts';

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
