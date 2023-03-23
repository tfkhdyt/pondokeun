import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

import { db } from '../lib/database/prisma';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';

const schema = z.object({
	link: z
		.string({ required_error: 'Link is required!', invalid_type_error: 'Invalid type' })
		.url('Invalid link'),
	customName: z.string().optional()
});

export const load = (async (event) => {
	const form = await superValidate(event, schema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, schema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, { form, success: false });
		}

		const { link, customName } = form.data;

		if (customName) {
			const isExist = await db.link.findFirst({
				where: {
					slug: customName
				}
			});

			if (isExist) {
				return fail(400, {
					message: 'Custom name is already used',
					form,
					success: false
				});
			}
		}

		const addedLink = await db.link.create({
			data: {
				link,
				slug: customName ?? crypto.randomUUID().slice(0, 8)
			}
		});

		console.log({ addedLink });

		return { form, addedLink, success: true };
	}
} satisfies Actions;

// export const actions: Actions = {
// 	default: async ({ request }) => {
// 		// const session = await event.locals.getSession();
// 		const data = await request.formData();
// 		const link = data.get('link') as string;
// 		const customName = data.get('customName') as string;
//
// 		if (!link) {
// 			return fail(400, { status: 'fail', message: "Link shouldn't be empty" });
// 		}
//
// 		if (customName) {
// 			// if (!session) {
// 			// 	return fail(401, {
// 			// 		status: 'fail',
// 			// 		message: 'You should sign in first'
// 			// 	});
// 			// }
//
// 			const isExist = await db.link.findFirst({
// 				where: {
// 					slug: customName
// 				}
// 			});
//
// 			if (isExist) {
// 				return fail(404, {
// 					status: 'fail',
// 					message: 'Custom name is already used'
// 				});
// 			}
// 		}
//
// 		const newLink: Prisma.LinkCreateInput = {
// 			slug: customName ?? crypto.randomUUID().slice(0, 8),
// 			link
// 		};
//
// 		// if (session?.user?.email) {
// 		// 	newLink = {
// 		// 		...newLink,
// 		// 		user: {
// 		// 			connect: {
// 		// 				email: session.user.email
// 		// 			}
// 		// 		}
// 		// 	};
// 		// }
//
// 		try {
// 			const addedLink = await db.link.create({
// 				data: newLink
// 			});
//
// 			return { addedLink, status: 'success' };
// 		} catch (err) {
// 			console.error(err);
// 			if (err instanceof Prisma.PrismaClientKnownRequestError) {
// 				return fail(500, {
// 					status: 'error',
// 					message: err.message
// 				});
// 			}
// 		}
// 	}
// };
