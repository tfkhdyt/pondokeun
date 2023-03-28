import type { Link, Prisma } from '@prisma/client';

export interface LinkRepository {
	createLink(payload: Prisma.LinkCreateInput): Promise<[Link, Error | null]>;
	verifySlugAvailability(slug: string): Promise<Error | null>;
	verifySlugOwnership(slug: string, email: string): Promise<Error | null>;
	getAllLinks(email: string): Promise<[Link[], Error | null]>;
	getLinkBySlug(slug: string): Promise<[Link | null, Error | null]>;
	updateLinkBySlug(oldSlug: string, newSlug: string): Promise<Error | null>;
}
