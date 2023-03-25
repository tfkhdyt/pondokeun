import type { Link, Prisma, PrismaClient } from '@prisma/client';

import type { LinkRepository } from '$repositories';

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

	async verifySlugAvailability(slug: string): Promise<Error | null> {
		const link = await this.db.link.findFirst({
			where: {
				slug
			}
		});

		if (link) {
			return new Error(`/${slug} has been used`);
		}

		return null;
	}
}
