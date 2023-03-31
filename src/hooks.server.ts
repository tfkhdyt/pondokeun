import type { Provider } from '@auth/core/providers';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';

import { db } from '$db/prisma';
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

export const handle = sequence(
	SvelteKitAuth({
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
		] as Provider[],
	}),
	createTRPCHandle({ router, createContext, url: '/api/trpc' })
);
