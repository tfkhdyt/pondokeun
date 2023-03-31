import { trpc } from '$lib/trpc/client';

import type { PageLoad } from './$types';

export const load: PageLoad = (event) => {
	event.depends('links');

	return {
		links: trpc(event).getAllLinks.query(),
	};
};
