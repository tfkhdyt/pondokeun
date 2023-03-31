import 'reflect-metadata';

import { initTRPC, TRPCError } from '@trpc/server';

import { container } from '$containers/inversify.container';
import type { ILinkService } from '$services/link.service';
import { TYPES } from '$types/inversify.type';

import type { Context } from './context';

const linkService = container.get<ILinkService>(TYPES.ILinkService);

export const t = initTRPC.context<Context>().create();

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
});

export type Router = typeof router;
