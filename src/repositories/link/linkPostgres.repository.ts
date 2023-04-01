import type { Link, Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import BadRequestError from '$exceptions/BadRequestError';
import type BaseError from '$exceptions/BaseError';
import InternalServerError from '$exceptions/InternalServerError';
import NotFoundError from '$exceptions/NotFoundError';
import UnauthorizedError from '$exceptions/UnauthorizedError';
import type { LinkRepository } from '$repositories';
import { TYPES } from '$types/inversify.type';

@injectable()
export default class LinkRepositoryPostgres implements LinkRepository {
	private db: PrismaClient;

	constructor(@inject(TYPES.PrismaClient) db: PrismaClient) {
		this.db = db;
	}

	async createLink(payload: Prisma.LinkCreateInput): Promise<[Link, BaseError | null]> {
		const addedLink = await this.db.link.create({
			data: payload,
		});

		if (!addedLink) {
			return [addedLink, new InternalServerError('Failed to create new link')];
		}

		return [addedLink, null];
	}

	async verifySlugAvailability(slug: string): Promise<BaseError | null> {
		const link = await this.db.link.findFirst({
			where: {
				slug,
			},
		});

		if (link) {
			return new BadRequestError(`/${slug} has been used`);
		}

		return null;
	}

	async verifySlugOwnership(slug: string, email: string): Promise<BaseError | null> {
		const link = await this.db.link.findFirst({
			where: {
				slug,
				user: {
					email,
				},
			},
		});

		if (!link) {
			return new UnauthorizedError("You don't have access to this resource");
		}

		return null;
	}

	async getAllLinks(email: string): Promise<[Link[], BaseError | null]> {
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
			return [links, new InternalServerError('Failed to fetch all links')];
		}

		return [links, null];
	}

	async getLinkBySlug(slug: string): Promise<[Link | null, BaseError | null]> {
		const link = await this.db.link.findFirst({
			where: {
				slug,
			},
		});

		if (!link) {
			return [link, new NotFoundError('Link is not found')];
		}

		return [link, null];
	}

	async updateLinkBySlug(oldSlug: string, newSlug: string): Promise<BaseError | null> {
		const updatedLink = await this.db.link.update({
			where: {
				slug: oldSlug,
			},
			data: {
				slug: newSlug,
			},
		});

		if (!updatedLink) {
			return new InternalServerError(`Failed to update /${oldSlug}`);
		}

		return null;
	}

	async deleteLinkBySlug(slug: string): Promise<BaseError | null> {
		const deletedLink = await this.db.link.delete({
			where: {
				slug,
			},
		});

		if (!deletedLink) {
			return new InternalServerError(`Failed to delete /${slug}`);
		}

		return null;
	}
}
