import { json } from '@sveltejs/kit';

import { db } from '$db/prisma';

import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async (event) => {
	const session = await event.locals.getSession();
	const { slug } = event.params;

	if (!session?.user) {
		return json(
			{
				status: 'fail',
				message: 'You should login first'
			},
			{
				status: 401
			}
		);
	}

	try {
		await verifyLinkAvailability(slug);
	} catch (error) {
		if (error instanceof Error) {
			return json(
				{
					status: 'fail',
					message: error.message
				},
				{
					status: 404
				}
			);
		}
	}

	try {
		await verifyLinkOwner(slug, session.user.email as string);
	} catch (error) {
		if (error instanceof Error) {
			return json(
				{
					status: 'fail',
					message: error.message
				},
				{
					status: 403
				}
			);
		}
	}

	const result = await db.link.delete({
		where: {
			slug
		}
	});

	if (!result) {
		return json(
			{
				status: 'fail',
				message: `Failed to delete /${slug} link`
			},
			{
				status: 500
			}
		);
	}

	return json({
		status: 'success',
		message: `/${slug} link has been deleted`,
		deletedLink: result
	});
};

async function verifyLinkOwner(slug: string, userEmail: string) {
	const result = await db.link.findFirst({
		where: {
			slug,
			user: {
				email: userEmail
			}
		}
	});

	if (!result) {
		throw new Error("You don't have access to this data");
	}
}

async function verifyLinkAvailability(slug: string) {
	const result = await db.link.findUnique({
		where: {
			slug
		}
	});

	if (!result) {
		throw new Error('Link not found');
	}
}
