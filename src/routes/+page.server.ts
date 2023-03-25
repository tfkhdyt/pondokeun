import { type Actions, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { db } from '$db/prisma';
import { linkSchema } from '$entities/link.entity';
import LinkRepositoryPostgres from '$repositories/link/linkPostgres.repository';
import LinkService from '$services/link.service';

import type { PageServerLoad } from './$types';

const linkRepo = new LinkRepositoryPostgres(db);
const linkService = new LinkService(linkRepo);

export const load = (async (event) => {
	event.depends('links');

	const form = await superValidate(event, linkSchema);
	const { session } = await event.parent();

	if (session?.user?.email) {
		const [links, err] = await linkService.getAllLinks(session.user.email);
		if (err instanceof Error) {
			return fail(500, {
				form,
				message: err.message,
			});
		}

		return { form, links };
	}

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const session = await event.locals.getSession();
		const form = await superValidate(event, linkSchema);

		if (!form.valid) {
			return fail(400, { form, message: 'Invalid input' });
		}

		const { link, customName } = form.data;

		if (customName) {
			if (!session?.user) {
				return fail(401, {
					message: 'You should sign in first',
					form,
				});
			}

			const err = await linkService.verifySlugAvailability(customName);
			if (err instanceof Error) {
				return fail(400, {
					message: err.message,
					form,
				});
			}
		}

		const [addedLink, err] = await linkService.createLink({
			link,
			slug: customName,
			email: session?.user?.email,
		});
		if (err instanceof Error) {
			return fail(400, {
				message: err.message,
				form,
			});
		}

		return { form, addedLink, success: true };
	},
} satisfies Actions;
