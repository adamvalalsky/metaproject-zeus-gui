import { AdminAccess } from '@/modules/auth/model';

export const isAdminLoggedIn = (adminAccess: AdminAccess) => adminAccess === AdminAccess.LOGGED;
