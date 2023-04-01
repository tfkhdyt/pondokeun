import type { Link, Prisma } from '@prisma/client';
import type { Maybe, Result } from 'true-myth';

import type BaseError from '$exceptions/BaseError';

export interface LinkRepository {
	createLink(payload: Prisma.LinkCreateInput): Promise<Result<Link, BaseError>>;
	verifySlugAvailability(slug: string): Promise<Maybe<BaseError>>;
	verifySlugOwnership(slug: string, email: string): Promise<BaseError | null>;
	getAllLinks(email: string): Promise<Result<Link[], BaseError>>;
	getLinkBySlug(slug: string): Promise<Result<Link, BaseError>>;
	updateLinkBySlug(oldSlug: string, newSlug: string): Promise<BaseError | null>;
	deleteLinkBySlug(slug: string): Promise<BaseError | null>;
}
