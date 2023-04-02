import type { Link, Prisma } from '@prisma/client';
import type { Maybe, Result } from 'true-myth';

import type { LinkWithVisitorsNumber } from '$entities/link.entity';
import type BaseError from '$exceptions/BaseError';

export interface LinkRepository {
	createLink(payload: Prisma.LinkCreateInput): Promise<Result<LinkWithVisitorsNumber, BaseError>>;
	verifySlugAvailability(slug: string): Promise<Maybe<BaseError>>;
	verifySlugOwnership(slug: string, email: string): Promise<Maybe<BaseError>>;
	getAllLinks(email: string): Promise<Result<LinkWithVisitorsNumber[], BaseError>>;
	getLinkBySlug(slug: string): Promise<Result<Link, BaseError>>;
	updateLinkBySlug(oldSlug: string, newSlug: string): Promise<Maybe<BaseError>>;
	deleteLinkBySlug(slug: string): Promise<Maybe<BaseError>>;
}

export interface VisitorsNumberRepository {
	increment(linkId: number): Promise<Maybe<BaseError>>;
}
