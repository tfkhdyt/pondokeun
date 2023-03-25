import type { Link, Prisma, PrismaClient } from '@prisma/client';
import type { LinkRepository } from '..';

export default class LinkRepositoryPostgres implements LinkRepository {
	constructor(private readonly db: PrismaClient) {}

	async createLink(payload: Prisma.LinkCreateInput): Promise<[Link, Error | null]> {
		const addedLink = await this.db.link.create({
			data: payload
		});

		if (!addedLink) {
			return [addedLink, new Error('Failed to create new link')];
		}

		return [addedLink, null];
	}
}
