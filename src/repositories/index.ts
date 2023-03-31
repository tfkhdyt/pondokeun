import type { Link, Prisma } from '@prisma/client';

import type BaseError from '$exceptions/BaseError';

export interface LinkRepository {
	createLink(payload: Prisma.LinkCreateInput): Promise<[Link, BaseError | null]>;
	verifySlugAvailability(slug: string): Promise<BaseError | null>;
	verifySlugOwnership(slug: string, email: string): Promise<BaseError | null>;
	getAllLinks(email: string): Promise<[Link[], BaseError | null]>;
	getLinkBySlug(slug: string): Promise<[Link | null, Error | null]>;
	updateLinkBySlug(oldSlug: string, newSlug: string): Promise<Error | null>;
	deleteLinkBySlug(slug: string): Promise<BaseError | null>;
}
