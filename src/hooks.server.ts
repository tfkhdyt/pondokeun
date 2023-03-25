import type { Provider } from '@auth/core/providers';
import GitHub from '@auth/core/providers/github';
import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { Handle } from '@sveltejs/kit';

import { db } from '$db/prisma';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';

export const handle = SvelteKitAuth({
	adapter: PrismaAdapter(db),
	providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })] as Provider[],
}) satisfies Handle;
