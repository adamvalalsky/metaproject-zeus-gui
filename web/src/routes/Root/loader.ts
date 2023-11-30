import { IUser } from '../../modules/user/model.ts';

const fetchUser = (): IUser => {
	// TODO this will call endpoint which will return currently logged in user
	return {
		id: 1,
		username: 'testUser'
	};
};

export default fetchUser;
