import { WebStorageStateStore } from 'oidc-client-ts';

export const IDENTITY_CONFIG = {
	authority: window.Config.VITE_IDENTITY_AUTH_URL,
	client_id: window.Config.VITE_IDENTITY_CLIENT_ID,
	redirect_uri: `${window.Config.VITE_CLIENT_BASE_URL}/auth/callback`,
	automaticSilentRenew: true,
	loadUserInfo: false,
	post_logout_redirect_uri: `${window.Config.VITE_CLIENT_BASE_URL}/logout`,
	scope: 'openid profile email eduperson_entitlement offline_access',
	userStore: new WebStorageStateStore({ store: window.localStorage })
};
