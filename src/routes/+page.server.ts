import 'reflect-metadata';

import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	event.depends('links');

	return {
		links: router.createCaller(await createContext(event)).getAllLinks(),
	};
};
