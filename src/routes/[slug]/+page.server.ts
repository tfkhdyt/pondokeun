import { redirect } from '@sveltejs/kit';
import { TRPCError } from '@trpc/server';

import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { slug } = event.params;

	try {
		const link = await router.createCaller(await createContext(event)).redirect({ slug });
		throw redirect(301, link);
	} catch (error) {
		if (error instanceof TRPCError) {
			return {
				message: error.message,
			};
		}
		throw error;
	}
}) satisfies PageServerLoad;
