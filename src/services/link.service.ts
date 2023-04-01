import type { Link, Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';
import type { Result } from 'true-myth';

import type { CreateLinkRequest } from '$dto/link.dto';
import BadRequestError from '$exceptions/BadRequestError';
import BaseError from '$exceptions/BaseError';
import UnauthenticatedError from '$exceptions/UnauthenticatedError';
import type { LinkRepository } from '$repositories';
import { TYPES } from '$types/inversify.type';

export interface ILinkService {
	createLink(payload: CreateLinkRequest): Promise<[Link | null, BaseError | null]>;
	getAllLinks(email: string): Promise<Result<Link[], BaseError>>;
	getLinkBySlug(slug: string): Promise<Result<Link, BaseError>>;
	updateLinkBySlug(oldSlug: string, newSlug: string, email: string): Promise<BaseError | null>;
	deleteLinkBySlug(slug: string, email: string): Promise<BaseError | null>;
}

@injectable()
export default class LinkService implements ILinkService {
	private linkRepo: LinkRepository;

	constructor(@inject(TYPES.LinkRepository) linkRepo: LinkRepository) {
		this.linkRepo = linkRepo;
	}

	async createLink(payload: CreateLinkRequest): Promise<[Link | null, BaseError | null]> {
		if (payload.slug) {
			if (!payload.email) {
				throw new UnauthenticatedError('You should sign in first');
			}

			const err = await this.linkRepo.verifySlugAvailability(payload.slug);
			if (err instanceof BaseError) {
				return [null, err];
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
			};
		}

		const [addedLink, err] = await this.linkRepo.createLink(newLink);
		if (err) {
			return [addedLink, err];
		}

		return [addedLink, null];
	}

	getAllLinks(email: string): Promise<Result<Link[], BaseError>> {
		return this.linkRepo.getAllLinks(email);
	}

	getLinkBySlug(slug: string): Promise<Result<Link, BaseError>> {
		return this.linkRepo.getLinkBySlug(slug);
	}

	async updateLinkBySlug(
		oldSlug: string,
		newSlug: string,
		email: string
	): Promise<BaseError | null> {
		let err = await this.linkRepo.verifySlugOwnership(oldSlug, email);
		if (err instanceof BaseError) return err;

		if (oldSlug === newSlug) {
			return new BadRequestError('Old slug and new slug must be different');
		}

		err = await this.linkRepo.verifySlugAvailability(newSlug);
		if (err instanceof BaseError) return err;

		return this.linkRepo.updateLinkBySlug(oldSlug, newSlug);
	}

	async deleteLinkBySlug(slug: string, email: string): Promise<BaseError | null> {
		let err = this.linkRepo.verifySlugOwnership(slug, email);
		if (err instanceof BaseError) {
			return err;
		}

		err = this.linkRepo.deleteLinkBySlug(slug);

		return err;
	}
}
