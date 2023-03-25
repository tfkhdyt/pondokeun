import type { Link, Prisma } from '@prisma/client';

export interface LinkRepository {
	createLink(payload: Prisma.LinkCreateInput): Promise<[Link, Error | null]>;
}
