import { TRPCError } from '@trpc/server';

import { container } from '$containers/inversify.container';
import {
	deleteLinkSchema,
	getLinkSchema,
	linkSchema,
	updateLinkSchema,
} from '$entities/link.entity';
import type { ILinkService } from '$services/link.service';
import { TYPES } from '$types/inversify.type';

import { auth } from './middleware';
import { t } from './t';

const linkService = container.get<ILinkService>(TYPES.ILinkService);

export const router = t.router({
	getAllLinks: t.procedure.use(auth).query(async ({ ctx }) => {
		const links = await linkService.getAllLinks(ctx.userEmail);
		if (links.isErr) {
			throw new TRPCError({
				code: links.error.statusCode,
				message: links.error.message,
				cause: links.error,
			});
		}

		return links.value;
	}),

	getLinkBySlug: t.procedure.input(getLinkSchema).query(async ({ input }) => {
		const link = await linkService.getLinkBySlug(input.slug);
		if (link.isErr) {
			throw new TRPCError({
				code: link.error.statusCode,
				message: link.error.message,
				cause: link.error,
			});
		}

		return link.value;
	}),

	createLink: t.procedure.input(linkSchema).mutation(async ({ input, ctx }) => {
		const { link, customName } = input;
		const { session } = ctx;

		const addedLink = await linkService.createLink({
			link,
			slug: customName,
			email: session?.user?.email,
		});
		if (addedLink.isErr) {
			throw new TRPCError({
				code: addedLink.error.statusCode,
				message: addedLink.error.message,
				cause: addedLink.error,
			});
		}

		return addedLink.value;
	}),

	updateLink: t.procedure
		.use(auth)
		.input(updateLinkSchema)
		.mutation(async ({ input, ctx }) => {
			const { oldSlug, customName } = input;
			const { userEmail } = ctx;

			const err = await linkService.updateLinkBySlug(oldSlug, customName, userEmail);
			if (err.isJust) {
				throw new TRPCError({
					code: err.value.statusCode,
					message: err.value.message,
					cause: err.value,
				});
			}
		}),

	deleteLink: t.procedure
		.use(auth)
		.input(deleteLinkSchema)
		.mutation(async ({ input, ctx }) => {
			const { slug } = input;
			const { userEmail } = ctx;

			const err = await linkService.deleteLinkBySlug(slug, userEmail);
			if (err.isJust)
				throw new TRPCError({
					code: err.value.statusCode,
					message: err.value.message,
					cause: err.value,
				});
		}),
});

export type Router = typeof router;
