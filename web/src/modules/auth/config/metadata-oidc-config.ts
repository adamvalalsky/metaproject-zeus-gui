export const METADATA_OIDC = {
	issuer: window.Config.VITE_IDENTITY_ISSUER,
	jwks_uri: `${window.Config.VITE_IDENTITY_ISSUER}/.well-known/openid-configuration`,
	authorization_endpoint: `${window.Config.VITE_IDENTITY_ISSUER}/authorize`,
	token_endpoint: `${window.Config.VITE_IDENTITY_ISSUER}/token`,
	userinfo_endpoint: `${window.Config.VITE_IDENTITY_ISSUER}/userinfo`,
	end_session_endpoint: `${window.Config.VITE_IDENTITY_ISSUER}/endsession`,
	check_session_iframe: `${window.Config.VITE_IDENTITY_ISSUER}/checksession`,
	revocation_endpoint: `${window.Config.VITE_IDENTITY_ISSUER}/revoke`,
	introspection_endpoint: `${window.Config.VITE_IDENTITY_ISSUER}/introspect`
};
