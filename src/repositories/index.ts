import type { Link, Prisma } from '@prisma/client';
import type { Result } from 'true-myth';

import type BaseError from '$exceptions/BaseError';

export interface LinkRepository {
	createLink(payload: Prisma.LinkCreateInput): Promise<[Link, BaseError | null]>;
	verifySlugAvailability(slug: string): Promise<BaseError | null>;
	verifySlugOwnership(slug: string, email: string): Promise<BaseError | null>;
	getAllLinks(email: string): Promise<Result<Link[], BaseError>>;
	getLinkBySlug(slug: string): Promise<[Link | null, BaseError | null]>;
	updateLinkBySlug(oldSlug: string, newSlug: string): Promise<BaseError | null>;
	deleteLinkBySlug(slug: string): Promise<BaseError | null>;
}
