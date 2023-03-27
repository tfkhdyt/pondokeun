import { fail, redirect } from '@sveltejs/kit';

import { container } from '$containers/inversify.container';
import type { ILinkService } from '$services/link.service';
import { TYPES } from '$types/inversify.type';

import type { PageServerLoad } from './$types';

const linkService = container.get<ILinkService>(TYPES.ILinkService);

export const load = (async ({ parent, params }) => {
	const { session } = await parent();
	if (!session?.user) {
		throw redirect(301, '/signin');
	}

	const { slug } = params;
	const [link, err] = await linkService.getLinkBySlug(slug);
	if (err instanceof Error) {
		return fail(404, {
			message: `/${slug} is not found`,
			success: false,
		});
	}

	return { link };
}) satisfies PageServerLoad;
