import 'reflect-metadata';

import { initTRPC, TRPCError } from '@trpc/server';
import SuperJSON from 'superjson';
import { z } from 'zod';

import { container } from '$containers/inversify.container';
import { linkSchema } from '$entities/link.entity';
import type { ILinkService } from '$services/link.service';
import { TYPES } from '$types/inversify.type';

import type { Context } from './context';

const linkService = container.get<ILinkService>(TYPES.ILinkService);

export const t = initTRPC.context<Context>().create({
	transformer: SuperJSON,
});

export const router = t.router({
	getAllLinks: t.procedure.query(async ({ ctx }) => {
		const [links, err] = await linkService.getAllLinks(ctx.session?.user?.email as string);
		if (err instanceof Error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch all links',
				cause: err,
			});
		}

		return links;
	}),
	createLink: t.procedure.input(linkSchema).mutation(async ({ input, ctx }) => {
		const { link, customName } = input;
		const { session } = ctx;

		if (customName) {
			if (!session?.user) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You should sign in first',
				});
			}

			const err = await linkService.verifySlugAvailability(customName);
			if (err instanceof Error) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: err.message,
					cause: err,
				});
			}
		}

		const [addedLink, err] = await linkService.createLink({
			link,
			slug: customName,
			email: session?.user?.email,
		});
		if (err instanceof Error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
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
