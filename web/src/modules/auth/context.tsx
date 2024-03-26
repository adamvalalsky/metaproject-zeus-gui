import { createContext, ReactElement, useState } from 'react';
import { isAuthenticated } from './methods/isAuthenticated.ts';
import { signInRedirect } from './methods/signInRedirect.ts';
import { logout } from './methods/logout.ts';
import { getAdminAccess } from './methods/getAdminAccess.ts';
import { AdminAccess } from './model.ts';
import { removeAdminAccess } from './methods/removeAdminAccess.ts';

const getDefaultContext = (): AuthContextValue => {
	return {
		signInRedirectCallback: () => {
			throw new Error('Sign in redirect callback not used');
		},
		logout: async () => logout(),
		signOutRedirectCallback: async () => {},
		isAuthenticated: () => isAuthenticated(),
		// TODO momentarily it will be ID 1, because it is in the database, change later to real implementation
		signInRedirect: async () => signInRedirect(1),
		signInSilentCallback: async () => {},
		createSignInRequest: async () => {},
		getAdminAccess: () => getAdminAccess(),
		removeAdminAccess: () => removeAdminAccess()
	};
};

export interface AuthContextValue {
	signInRedirectCallback: () => void;
	logout: () => Promise<void>;
	signOutRedirectCallback: () => Promise<void>;
	isAuthenticated: () => boolean;
	signInRedirect: () => Promise<void>;
	signInSilentCallback: () => Promise<void>;
	createSignInRequest: () => Promise<void>;
	getAdminAccess: () => AdminAccess;
	removeAdminAccess: () => void;
}

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
