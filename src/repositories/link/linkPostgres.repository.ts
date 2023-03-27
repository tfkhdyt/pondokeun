import type { Link, Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import type { LinkRepository } from '$repositories';
import { TYPES } from '$types/inversify.type';

@injectable()
export default class LinkRepositoryPostgres implements LinkRepository {
	private db: PrismaClient;

	constructor(@inject(TYPES.PrismaClient) db: PrismaClient) {
		this.db = db;
	}

	async createLink(payload: Prisma.LinkCreateInput): Promise<[Link, Error | null]> {
		const addedLink = await this.db.link.create({
			data: payload,
		});

		if (!addedLink) {
			return [addedLink, new Error('Failed to create new link')];
		}

		return [addedLink, null];
	}

	async verifySlugAvailability(slug: string): Promise<Error | null> {
		const link = await this.db.link.findFirst({
			where: {
				slug,
			},
		});

		if (link) {
			return new Error(`/${slug} has been used`);
		}

		return null;
	}

	async getAllLinks(email: string): Promise<[Link[], Error | null]> {
		let links: Link[] = [];

		try {
			links = await this.db.link.findMany({
				where: {
					user: {
						email,
					},
				},
				orderBy: {
					updatedAt: 'desc',
				},
			});
		} catch (error) {
			return [links, new Error('Failed to fetch all links')];
		}

		return [links, null];
	}

	async getLinkBySlug(slug: string): Promise<[Link | null, Error | null]> {
		let link: Link | null = null;

		try {
			link = await this.db.link.findFirst({
				where: {
					slug,
				},
			});
		} catch (error) {
			return [link, new Error('Link is not found')];
		}

		return [link, null];
	}
}
