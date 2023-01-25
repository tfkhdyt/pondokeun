import { db } from '$lib/database/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async (event) => {
	const session = await event.locals.getSession();
	const { id } = event.params;
	const linkId = parseInt(id, 10);

	if (isNaN(linkId)) {
		return json(
			{
				status: 'fail',
				message: 'Id should be number'
			},
			{
				status: 400
			}
		);
	}

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
		await verifyLinkAvailability(linkId);
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
		await verifyLinkOwner(linkId, session.user.email as string);
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
			id: linkId
		}
	});

	if (!result) {
		return json(
			{
				status: 'fail',
				message: 'Failed to delete link'
			},
			{
				status: 500
			}
		);
	}

	return json({
		status: 'success',
		deletedLink: result
	});
};

async function verifyLinkOwner(linkId: number, userEmail: string) {
	const result = await db.link.findFirst({
		where: {
			id: linkId,
			user: {
				email: userEmail
			}
		}
	});

	if (!result) {
		throw new Error("You don't have access to this data");
	}
}

async function verifyLinkAvailability(linkId: number) {
	const result = await db.link.findUnique({
		where: {
			id: linkId
		}
	});

	if (!result) {
		throw new Error('Link not found');
	}
}
