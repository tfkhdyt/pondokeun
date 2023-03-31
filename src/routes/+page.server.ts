import { superValidate } from 'sveltekit-superforms/server';

import { linkSchema } from '$entities/link.entity';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	event.depends('links');

	const form = await superValidate(event, linkSchema);
	const { session } = await event.parent();

	if (session?.user?.email) {
		return { form, links: router.createCaller(await createContext(event)).getAllLinks() };
	}

	return { form };
}) satisfies PageServerLoad;
