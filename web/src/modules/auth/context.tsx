import { createContext, type ReactElement, useContext, useState } from 'react';

import { getAdminAccess } from '@/modules/auth/methods/getAdminAccess';
import { type AdminAccess } from '@/modules/auth/model';
import { removeAdminAccess } from '@/modules/auth/methods/removeAdminAccess';
import { setAdminAccess } from '@/modules/auth/methods/setAdminAccess';

const getDefaultContext = (): AdminContextValue => ({
	getAdminAccess: () => getAdminAccess(),
	removeAdminAccess: () => removeAdminAccess(),
	setAdminAccess: (key: string) => setAdminAccess(key)
});

export type AdminContextValue = {
	getAdminAccess: () => AdminAccess;
	removeAdminAccess: () => AdminAccess;
	setAdminAccess: (key: string) => void;
};

export const AdminContext = createContext<AdminContextValue>({
	...getDefaultContext()
});

export const AdminDispatchContext = createContext<(context: AdminContextValue) => void>(() => {});

export const AdminContextProvider = ({ children }: { children: ReactElement }) => {
	const [context, setContext] = useState<AdminContextValue>({
		...getDefaultContext()
	});

	return (
		<AdminContext.Provider value={context}>
			<AdminDispatchContext.Provider value={setContext}>{children}</AdminDispatchContext.Provider>
		</AdminContext.Provider>
	);
};

export const useAdminContext = () => useContext(AdminContext);
