import type { Provider } from '@auth/core/providers';
import Facebook from '@auth/core/providers/facebook';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { Handle } from '@sveltejs/kit';

import { db } from '$db/prisma';
import {
	FACEBOOK_ID,
	FACEBOOK_SECRET,
	GITHUB_ID,
	GITHUB_SECRET,
	GOOGLE_ID,
	GOOGLE_SECRET,
} from '$env/static/private';

export const handle = SvelteKitAuth({
	adapter: PrismaAdapter(db),
	providers: [
		GitHub({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET,
		}),
		Google({
			clientId: GOOGLE_ID,
			clientSecret: GOOGLE_SECRET,
		}),
		Facebook({
			clientId: FACEBOOK_ID,
			clientSecret: FACEBOOK_SECRET,
		}),
	] as Provider[],
}) satisfies Handle;
