import type { Link, Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Maybe, Result } from 'true-myth';

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

	async createLink(payload: Prisma.LinkCreateInput): Promise<Result<Link, BaseError>> {
		const addedLink = await this.db.link.create({
			data: payload,
		});

		if (!addedLink) {
			return Result.err(new InternalServerError('Failed to create new link'));
		}

		return Result.ok(addedLink);
	}

	async verifySlugAvailability(slug: string): Promise<Maybe<BaseError>> {
		const link = await this.db.link.findFirst({
			where: {
				slug,
			},
		});

		if (link) {
			return Maybe.just(new BadRequestError(`/${slug} has been used`));
		}

		return Maybe.nothing();
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

	async getAllLinks(email: string): Promise<Result<Link[], BaseError>> {
		try {
			const links = await this.db.link.findMany({
				where: {
					user: {
						email,
					},
				},
				orderBy: {
					updatedAt: 'desc',
				},
			});
			return Result.ok(links);
		} catch (error) {
			return Result.err(new InternalServerError('Failed to fetch all links'));
		}
	}

	async getLinkBySlug(slug: string): Promise<Result<Link, BaseError>> {
		const link = await this.db.link.findFirst({
			where: {
				slug,
			},
		});

		if (!link) {
			return Result.err(new NotFoundError('Link is not found'));
		}

		return Result.ok(link);
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
