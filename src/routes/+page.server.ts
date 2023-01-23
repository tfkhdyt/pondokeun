import { fail, type Actions } from '@sveltejs/kit';
import { Prisma } from '@prisma/client';
import { db } from '../lib/database/prisma';

export const actions: Actions = {
	default: async (event) => {
		const session = await event.locals.getSession();
		const data = await event.request.formData();
		const link = data.get('link') as string;
		const customName = data.get('customName') as string;

		if (!link) {
			return fail(400, { link, missing: true });
		}

		if (customName) {
			if (!session) {
				return fail(401, {
					status: 'fail',
					message: 'You should sign in first'
				});
			}

			const isExist = await db.link.findFirst({
				where: {
					slug: customName
				}
			});

			if (isExist) {
				return fail(404, {
					status: 'fail',
					message: 'Custom name is already used'
				});
			}
		}

		console.log(session);

		let newLink: Prisma.LinkCreateInput = {
			slug: customName ?? crypto.randomUUID().slice(0, 8),
			link
		};

		if (session?.user?.email) {
			newLink = {
				...newLink,
				user: {
					connect: {
						email: session.user.email
					}
				}
			};
		}

		try {
			const addedLink = await db.link.create({
				data: newLink
			});

			return { addedLink, status: 'success' };
		} catch (err) {
			console.error(err);
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				return fail(500, {
					status: 'error',
					message: err.message
				});
			}
		}
	}
};
