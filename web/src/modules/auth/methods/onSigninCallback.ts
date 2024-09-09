import { User } from 'oidc-client-ts';

import { signInUser } from '@/modules/auth/api/sign-in-user';

export const onSigninCallback = async (user: User | void): Promise<void> => {
	if (user instanceof User) {
		await signInUser(user.access_token);
	}

	window.history.replaceState({}, document.title, `${import.meta.env.VITE_CLIENT_BASE_URL}/project`);
};
