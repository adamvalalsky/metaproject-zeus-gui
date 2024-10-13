import { createContext, type Dispatch, type ReactElement, type SetStateAction, useContext, useState } from 'react';

import { getCurrentRole } from '@/modules/auth/methods/getCurrentRole';

import { Role } from '../user/role';

export type AdminContextType = {
	currentRole: Role;
	setCurrentRole: Dispatch<SetStateAction<Role>>;
};

export const AdminContext = createContext<AdminContextType>({
	currentRole: Role.USER,
	setCurrentRole: () => {}
});

export const AdminContextProvider = ({ children }: { children: ReactElement }) => {
	const [currentRole, setCurrentRole] = useState(getCurrentRole());

	return <AdminContext.Provider value={{ currentRole, setCurrentRole }}>{children}</AdminContext.Provider>;
};

export const useAdminContext = () => useContext(AdminContext);
