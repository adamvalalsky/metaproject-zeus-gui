import { METADATA_OIDC } from '@/modules/auth/config/metadata-oidc-config';
import { onSigninCallback } from '@/modules/auth/methods/onSigninCallback';

export const IDENTITY_CONFIG = {
	authority: import.meta.env.VITE_IDENTITY_AUTH_URL,
	client_id: import.meta.env.VITE_IDENTITY_CLIENT_ID,
	redirect_uri: `${import.meta.env.VITE_CLIENT_BASE_URL}/project`,
	automaticSilentRenew: false,
	loadUserInfo: false,
	post_logout_redirect_uri: `${import.meta.env.VITE_CLIENT_BASE_URL}/logout`,
	scope: 'openid profile email',
	metadata: {
		...METADATA_OIDC
	},
	onSigninCallback
};
