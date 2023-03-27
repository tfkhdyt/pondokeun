import { redirect } from '@sveltejs/kit';

import { container } from '$containers/inversify.container';
import type { ILinkService } from '$services/link.service';
import { TYPES } from '$types/inversify.type';

import type { PageServerLoad } from './$types';

const linkService = container.get<ILinkService>(TYPES.ILinkService);

export const load = (async ({ params }) => {
	const { slug } = params;

	const [link, err] = await linkService.getLinkBySlug(slug);
	if (err instanceof Error) {
		return {
			message: err.message,
		};
	}

	throw redirect(301, link?.link as string);
}) satisfies PageServerLoad;
