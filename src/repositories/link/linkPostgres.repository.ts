import type { Link, Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Maybe, Result } from 'true-myth';

import type { LinkWithVisitorsNumber } from '$entities/link.entity';
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

	async createLink(
		payload: Prisma.LinkCreateInput
	): Promise<Result<LinkWithVisitorsNumber, BaseError>> {
		try {
			const addedLink = await this.db.link.create({
				data: payload,
				include: {
					visitorsNumber: true,
				},
			});
			return Result.ok(addedLink);
		} catch (error) {
			console.error({ error });
			return Result.err(new InternalServerError('Failed to create new link'));
		}
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

	async verifySlugOwnership(slug: string, email: string): Promise<Maybe<BaseError>> {
		const link = await this.db.link.findFirst({
			where: {
				slug,
				user: {
					email,
				},
			},
		});

		if (!link) {
			return Maybe.just(new UnauthorizedError("You don't have access to this resource"));
		}

		return Maybe.nothing();
	}

	async getAllLinks(email: string): Promise<Result<LinkWithVisitorsNumber[], BaseError>> {
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
				include: {
					visitorsNumber: true,
				},
			});
			return Result.ok(links);
		} catch (error) {
			console.error({ error });
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

	async updateLinkBySlug(oldSlug: string, newSlug: string): Promise<Maybe<BaseError>> {
		try {
			await this.db.link.update({
				where: {
					slug: oldSlug,
				},
				data: {
					slug: newSlug,
				},
			});
			return Maybe.nothing();
		} catch (error) {
			console.error({ error });
			return Maybe.just(new InternalServerError(`Failed to update /${oldSlug}`));
		}
	}

	async deleteLinkBySlug(slug: string): Promise<Maybe<BaseError>> {
		try {
			await this.db.link.delete({
				where: {
					slug,
				},
			});
			return Maybe.nothing();
		} catch (error) {
			console.error({ error });
			return Maybe.just(new InternalServerError(`Failed to delete /${slug}`));
		}
	}
}
