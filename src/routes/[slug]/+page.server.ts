import { db } from '$lib/database/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { slug } = params;

	const link = await db.link.findFirst({
		where: {
			slug
		}
	});

	if (!link) {
		return {
			message: 'Page not found'
		};
	}

	throw redirect(301, link.link);
}) satisfies PageServerLoad;
