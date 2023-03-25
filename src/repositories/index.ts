import type { PrismaClient, Link, Prisma } from '@prisma/client';

export interface LinkRepository {
	db: PrismaClient;
	createLink(payload: Prisma.LinkCreateInput): Promise<[Link, Error | null]>;
}
