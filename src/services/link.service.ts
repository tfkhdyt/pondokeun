import type { Link, Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Maybe, Result } from 'true-myth';

import type { CreateLinkRequest } from '$dto/link.dto';
import type { LinkWithVisitorsNumber } from '$entities/link.entity';
import BadRequestError from '$exceptions/BadRequestError';
import type BaseError from '$exceptions/BaseError';
import UnauthenticatedError from '$exceptions/UnauthenticatedError';
import type { LinkRepository, VisitorsNumberRepository } from '$repositories';
import { TYPES } from '$types/inversify.type';

export interface ILinkService {
	createLink(payload: CreateLinkRequest): Promise<Result<LinkWithVisitorsNumber, BaseError>>;
	getAllLinks(email: string): Promise<Result<LinkWithVisitorsNumber[], BaseError>>;
	getLinkBySlug(slug: string): Promise<Result<Link, BaseError>>;
	updateLinkBySlug(oldSlug: string, newSlug: string, email: string): Promise<Maybe<BaseError>>;
	deleteLinkBySlug(slug: string, email: string): Promise<Maybe<BaseError>>;
	redirect(slug: string): Promise<Result<string, BaseError>>;
}

@injectable()
export default class LinkService implements ILinkService {
	private linkRepo: LinkRepository;
	private visitorsNumberRepo: VisitorsNumberRepository;

	constructor(
		@inject(TYPES.LinkRepository) linkRepo: LinkRepository,
		@inject(TYPES.VisitorsNumberRepository) visitorsNumberRepo: VisitorsNumberRepository
	) {
		this.linkRepo = linkRepo;
		this.visitorsNumberRepo = visitorsNumberRepo;
	}

	async createLink(payload: CreateLinkRequest): Promise<Result<LinkWithVisitorsNumber, BaseError>> {
		if (payload.slug) {
			if (!payload.email) {
				return Result.err(new UnauthenticatedError('You should sign in first'));
			}

			const err = await this.linkRepo.verifySlugAvailability(payload.slug);
			if (err.isJust) {
				return Result.err(err.value);
			}
		}

		payload.slug = payload.slug || crypto.randomUUID().slice(0, 5);

		let newLink: Prisma.LinkCreateInput = {
			link: payload.link,
			slug: payload.slug,
		};

		if (payload.email) {
			newLink = {
				...newLink,
				user: {
					connect: {
						email: payload.email,
					},
				},
				visitorsNumber: {
					create: {
						value: 0,
					},
				},
			};
		}

		const addedLink = await this.linkRepo.createLink(newLink);
		if (addedLink.isErr) {
			return Result.err(addedLink.error);
		}

		return Result.ok(addedLink.value);
	}

	getAllLinks(email: string): Promise<Result<LinkWithVisitorsNumber[], BaseError>> {
		return this.linkRepo.getAllLinks(email);
	}

	getLinkBySlug(slug: string): Promise<Result<Link, BaseError>> {
		return this.linkRepo.getLinkBySlug(slug);
	}

	async updateLinkBySlug(
		oldSlug: string,
		newSlug: string,
		email: string
	): Promise<Maybe<BaseError>> {
		const link = await this.linkRepo.getLinkBySlug(oldSlug);
		if (link.isErr) {
			return Maybe.just(link.error);
		}

		let err = await this.linkRepo.verifySlugOwnership(oldSlug, email);
		if (err.isJust) return err;

		if (oldSlug === newSlug) {
			return Maybe.just(new BadRequestError('Old slug and new slug must be different'));
		}

		err = await this.linkRepo.verifySlugAvailability(newSlug);
		if (err.isJust) return err;

		return this.linkRepo.updateLinkBySlug(oldSlug, newSlug);
	}

	async deleteLinkBySlug(slug: string, email: string): Promise<Maybe<BaseError>> {
		const err = await this.linkRepo.verifySlugOwnership(slug, email);
		if (err.isJust) {
			return err;
		}

		return this.linkRepo.deleteLinkBySlug(slug);
	}

	async redirect(slug: string): Promise<Result<string, BaseError>> {
		const link = await this.linkRepo.getLinkBySlug(slug);
		if (link.isErr) return Result.err(link.error);

		const err = await this.visitorsNumberRepo.increment(link.value.id);
		if (err.isJust) return Result.err(err.value);

		return Result.ok(link.value.link);
	}
}
