import type { Link, Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';

import type { CreateLinkRequest } from '$dto/link.dto';
import BaseError from '$exceptions/BaseError';
import UnauthenticatedError from '$exceptions/UnauthenticatedError';
import type { LinkRepository } from '$repositories';
import { TYPES } from '$types/inversify.type';

export interface ILinkService {
	createLink(payload: CreateLinkRequest): Promise<[Link | null, BaseError | null]>;
	getAllLinks(email: string): Promise<[Link[], BaseError | null]>;
	getLinkBySlug(slug: string): Promise<[Link | null, Error | null]>;
	updateLinkBySlug(oldSlug: string, newSlug: string, email: string): Promise<Error | null>;
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

	async getAllLinks(email: string): Promise<[Link[], BaseError | null]> {
		const [links, err] = await this.linkRepo.getAllLinks(email);

		return [links, err];
	}

	async getLinkBySlug(slug: string): Promise<[Link | null, Error | null]> {
		const [link, err] = await this.linkRepo.getLinkBySlug(slug);

		return [link, err];
	}

	async updateLinkBySlug(oldSlug: string, newSlug: string, email: string): Promise<Error | null> {
		const err = await this.linkRepo.verifySlugOwnership(oldSlug, email);
		if (err instanceof Error) {
			return err;
		}

		const err2 = await this.linkRepo.updateLinkBySlug(oldSlug, newSlug);
		if (err2 instanceof Error) {
			return err2;
		}

		return null;
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
