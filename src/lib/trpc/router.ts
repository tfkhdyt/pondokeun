import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { container } from '$containers/inversify.container';
import { linkSchema } from '$entities/link.entity';
import BaseError from '$exceptions/BaseError';
import type { ILinkService } from '$services/link.service';
import { TYPES } from '$types/inversify.type';

import { auth } from './middleware';
import { t } from './t';

const linkService = container.get<ILinkService>(TYPES.ILinkService);

export const router = t.router({
	getAllLinks: t.procedure.use(auth).query(async ({ ctx }) => {
		const [links, err] = await linkService.getAllLinks(ctx.userEmail);
		if (err instanceof BaseError) {
			throw new TRPCError({
				code: err.statusCode,
				message: err.message,
				cause: err,
			});
		}

		return links;
	}),
	createLink: t.procedure.input(linkSchema).mutation(async ({ input, ctx }) => {
		const { link, customName } = input;
		const { session } = ctx;

		const [addedLink, err] = await linkService.createLink({
			link,
			slug: customName,
			email: session?.user?.email,
		});
		if (err instanceof Error) {
			throw new TRPCError({
				code: err.statusCode,
				message: err.message,
				cause: err,
			});
		}

		return addedLink;
	}),
	deleteLink: t.procedure
		.input(
			z.object({
				slug: z.string({
					invalid_type_error: 'Slug should be string',
					required_error: 'Slug is required',
				}),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { slug } = input;
			const { session } = ctx;

			if (!session?.user?.email) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You should sign in first',
				});
			}

			const err = await linkService.deleteLinkBySlug(slug, session.user.email);
			if (err instanceof Error)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: err.message,
					cause: err,
				});

			return true;
		}),
});

export type Router = typeof router;
