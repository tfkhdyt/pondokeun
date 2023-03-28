import { type Actions, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { container } from '$containers/inversify.container';
import { linkSchema } from '$entities/link.entity';
import type { ILinkService } from '$services/link.service';
import { TYPES } from '$types/inversify.type';

import type { PageServerLoad } from './$types';

const linkService = container.get<ILinkService>(TYPES.ILinkService);

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
		const form = await superValidate(event, linkSchema);

		if (!form.valid) {
			return fail(400, { form, message: 'Invalid input' });
		}

		const { link, customName } = form.data;
		const session = await event.locals.getSession();

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
