export const METADATA_OIDC = {
	issuer: import.meta.env.VITE_IDENTITY_ISSUER,
	jwks_uri: `${import.meta.env.VITE_IDENTITY_ISSUER}/.well-known/openid-configuration`,
	authorization_endpoint: `${import.meta.env.VITE_IDENTITY_ISSUER}/authorize`,
	token_endpoint: `${import.meta.env.VITE_IDENTITY_ISSUER}/token`,
	userinfo_endpoint: `${import.meta.env.VITE_IDENTITY_ISSUER}/userinfo`,
	end_session_endpoint: `${import.meta.env.VITE_IDENTITY_ISSUER}/endsession`,
	check_session_iframe: `${import.meta.env.VITE_IDENTITY_ISSUER}/checksession`,
	revocation_endpoint: `${import.meta.env.VITE_IDENTITY_ISSUER}/revoke`,
	introspection_endpoint: `${import.meta.env.VITE_IDENTITY_ISSUER}/introspect`
};
