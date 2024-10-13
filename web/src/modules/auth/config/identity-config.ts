import { WebStorageStateStore } from 'oidc-client-ts';

export const IDENTITY_CONFIG = {
	authority: import.meta.env.VITE_IDENTITY_AUTH_URL,
	client_id: import.meta.env.VITE_IDENTITY_CLIENT_ID,
	redirect_uri: `${import.meta.env.VITE_CLIENT_BASE_URL}/auth/callback`,
	automaticSilentRenew: true,
	loadUserInfo: false,
	post_logout_redirect_uri: `${import.meta.env.VITE_CLIENT_BASE_URL}/logout`,
	scope: 'openid profile email eduperson_entitlement offline_access',
	stateStore: new WebStorageStateStore({ store: window.sessionStorage })
};
