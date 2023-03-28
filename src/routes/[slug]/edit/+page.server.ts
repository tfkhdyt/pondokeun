import { type Actions, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { container } from '$containers/inversify.container';
import { getUpdateLinkSchema, updateLinkSchema } from '$entities/link.entity';
import type { ILinkService } from '$services/link.service';
import { TYPES } from '$types/inversify.type';

import type { PageServerLoad } from './$types';

const linkService = container.get<ILinkService>(TYPES.ILinkService);

export const load = (async (event) => {
	const { session } = await event.parent();
	if (!session?.user) {
		throw redirect(301, '/signin');
	}

	const { slug } = event.params;
	const [link, err] = await linkService.getLinkBySlug(slug);
	const form = await superValidate(event, getUpdateLinkSchema(link?.slug));
	if (err instanceof Error) {
		return fail(404, {
			form,
			message: `/${slug} is not found`,
			success: false,
		});
	}

	return { form, link };
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, updateLinkSchema);
		if (!form.valid) {
			return fail(400, {
				form,
				message: 'Invalid input',
			});
		}

		const { customName } = form.data;
		const { slug } = event.params;
		const session = await event.locals.getSession();
		if (!session?.user) {
			return fail(401, { form, message: 'You should sign in first' });
		}

		let err = await linkService.verifySlugAvailability(customName);
		if (err instanceof Error) {
			return fail(400, {
				message: err.message,
				form,
			});
		}

		err = await linkService.updateLinkBySlug(
			slug as string,
			customName,
			session.user.email as string
		);
		if (err instanceof Error) {
			return fail(400, {
				form,
				message: err.message,
			});
		}

		return { form, success: true };
	},
} satisfies Actions;
