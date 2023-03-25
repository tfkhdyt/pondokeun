import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, type Actions } from '@sveltejs/kit';

import { db } from '../lib/database/prisma';
import type { PageServerLoad } from './$types';
import LinkRepositoryPostgres from '../repositories/link/postgres';
import LinkService from '../services/link.service';

const schema = z.object({
	link: z
		.string({ required_error: 'Link is required!', invalid_type_error: 'Invalid type' })
		.url({ message: 'Invalid url' }),
	customName: z.string().optional()
});

const linkRepo = new LinkRepositoryPostgres(db);
const linkService = new LinkService(linkRepo);

export const load = (async (event) => {
	event.depends('links');

	const form = await superValidate(event, schema);
	const { session } = await event.parent();
	// const session = await event.locals.getSession();

	if (session?.user) {
		const links = await db.link.findMany({
			where: {
				user: {
					email: session.user.email
				}
			},
			orderBy: {
				updated_at: 'desc'
			}
		});

		return { form, links };
	}

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const session = await event.locals.getSession();
		const form = await superValidate(event, schema);

		if (!form.valid) {
			return fail(400, { form, message: 'Invalid input' });
		}

		const { link, customName } = form.data;

		if (customName) {
			if (!session) {
				return fail(401, {
					message: 'You should sign in first',
					form
				});
			}

			const isExist = await db.link.findFirst({
				where: {
					slug: customName
				}
			});

			if (isExist) {
				return fail(400, {
					message: 'Custom slug has been used',
					form
				});
			}
		}

		const [addedLink, err] = await linkService.createLink({
			link,
			slug: customName,
			email: session?.user?.email
		});
		if (err) {
			if (err instanceof Error) {
				return fail(400, {
					message: err.message,
					form
				});
			}
		}

		return { form, addedLink, success: true };
	}
};
