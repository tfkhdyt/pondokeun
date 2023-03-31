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

	async verifySlugOwnership(slug: string, email: string): Promise<Error | null> {
		const link = await this.db.link.findFirst({
			where: {
				slug,
				user: {
					email,
				},
			},
		});

		if (!link) {
			return new Error("You don't have access to this resource");
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
		const link = await this.db.link.findFirst({
			where: {
				slug,
			},
		});

		if (!link) {
			return [link, new Error('Link is not found')];
		}

		return [link, null];
	}

	async updateLinkBySlug(oldSlug: string, newSlug: string): Promise<Error | null> {
		const updatedLink = await this.db.link.update({
			where: {
				slug: oldSlug,
			},
			data: {
				slug: newSlug,
			},
		});

		if (!updatedLink) {
			return new Error(`Failed to update /${oldSlug}`);
		}

		return null;
	}

	async deleteLinkBySlug(slug: string): Promise<Error | null> {
		const deletedLink = await this.db.link.delete({
			where: {
				slug,
			},
		});

		if (!deletedLink) {
			return new Error(`Failed to delete /${slug}`);
		}

		return null;
	}
}
