import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { db } from '$db/prisma';

export const handle = SvelteKitAuth({
	adapter: PrismaAdapter(db),
	providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
	// session: {
	// 	generateSessionToken: () => {
	// 		return crypto.randomUUID();
	// 	}
	// }
});
