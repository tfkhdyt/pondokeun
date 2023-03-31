import { TRPCError } from '@trpc/server';

import { t } from './t';

export const auth = t.middleware(async ({ ctx, next }) => {
	if (!ctx.session?.user?.email) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'You should sign in first',
		});
	}

	return next({
		ctx: {
			userEmail: ctx.session.user.email,
		},
	});
});
