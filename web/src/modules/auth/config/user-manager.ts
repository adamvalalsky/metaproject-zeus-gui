import { UserManager } from 'oidc-client-ts';

import { IDENTITY_CONFIG } from '@/modules/auth/config/identity-config';
import { METADATA_OIDC } from '@/modules/auth/config/metadata-oidc-config';

const userManager = new UserManager({
	...IDENTITY_CONFIG,
	metadata: {
		...METADATA_OIDC
	}
});

export default userManager;
