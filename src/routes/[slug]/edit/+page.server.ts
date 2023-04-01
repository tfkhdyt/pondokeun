import { redirect } from '@sveltejs/kit';
import { TRPCError } from '@trpc/server';

import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session } = await event.parent();
	if (!session?.user?.email) {
		throw redirect(301, '/signin');
	}

	const { slug } = event.params;

	try {
		return {
			link: await router.createCaller(await createContext(event)).getLinkBySlug({ slug }),
		};
	} catch (error) {
		if (error instanceof TRPCError) {
			throw redirect(301, `/${slug}`);
		}
	}
}) satisfies PageServerLoad;
