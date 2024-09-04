import { createContext, type ReactElement, useState } from 'react';

import { type User } from '@/modules/user/model';
import { isAuthenticated } from '@/modules/auth/methods/isAuthenticated';
import { signInRedirect } from '@/modules/auth/methods/signInRedirect';
import { logout } from '@/modules/auth/methods/logout';
import { getAdminAccess } from '@/modules/auth/methods/getAdminAccess';
import { type AdminAccess } from '@/modules/auth/model';
import { removeAdminAccess } from '@/modules/auth/methods/removeAdminAccess';
import { setAdminAccess } from '@/modules/auth/methods/setAdminAccess';
import { getLoggedUserInfo } from '@/modules/auth/methods/getLoggedUserInfo';

const getDefaultContext = (): AuthContextValue => ({
	signInRedirectCallback: () => {
		throw new Error('Sign in redirect callback not used');
	},
	logout: async () => logout(),
	signOutRedirectCallback: async () => {},
	isAuthenticated: () => isAuthenticated(),
	signInRedirect: async () => signInRedirect(),
	signInSilentCallback: async () => {},
	createSignInRequest: async () => {},
	getAdminAccess: () => getAdminAccess(),
	removeAdminAccess: () => removeAdminAccess(),
	setAdminAccess: (key: string) => setAdminAccess(key),
	getLoggedUserInfo: () => getLoggedUserInfo()
});

export type AuthContextValue = {
	signInRedirectCallback: () => void;
	logout: () => Promise<void>;
	signOutRedirectCallback: () => Promise<void>;
	isAuthenticated: () => boolean;
	signInRedirect: () => Promise<void>;
	signInSilentCallback: () => Promise<void>;
	createSignInRequest: () => Promise<void>;
	getAdminAccess: () => AdminAccess;
	removeAdminAccess: () => AdminAccess;
	setAdminAccess: (key: string) => void;
	getLoggedUserInfo: () => User | null;
};

export const AuthContext = createContext<AuthContextValue>({
	...getDefaultContext()
});

export const AuthDispatchContext = createContext<(context: AuthContextValue) => void>(() => {});

export const AuthContextProvider = ({ children }: { children: ReactElement }) => {
	const [context, setContext] = useState<AuthContextValue>({
		...getDefaultContext()
	});

	return (
		<AuthContext.Provider value={context}>
			<AuthDispatchContext.Provider value={setContext}>{children}</AuthDispatchContext.Provider>
		</AuthContext.Provider>
	);
};
