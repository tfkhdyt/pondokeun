import type { Link, Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';

import type { CreateLinkRequest } from '$dto/link.dto';
import type { LinkRepository } from '$repositories';
import { TYPES } from '$types/inversify.type';

export interface ILinkService {
	createLink(payload: CreateLinkRequest): Promise<[Link, Error | null]>;
	verifySlugAvailability(slug: string): Promise<Error | null>;
	getAllLinks(email: string): Promise<[Link[], Error | null]>;
	getLinkBySlug(slug: string): Promise<[Link | null, Error | null]>;
	updateLinkBySlug(oldSlug: string, newSlug: string, email: string): Promise<Error | null>;
}

@injectable()
export default class LinkService implements ILinkService {
	private linkRepo: LinkRepository;

	constructor(@inject(TYPES.LinkRepository) linkRepo: LinkRepository) {
		this.linkRepo = linkRepo;
	}

	async createLink(payload: CreateLinkRequest): Promise<[Link, Error | null]> {
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

	async verifySlugAvailability(slug: string): Promise<Error | null> {
		const err = await this.linkRepo.verifySlugAvailability(slug);

		return err;
	}

	async getAllLinks(email: string): Promise<[Link[], Error | null]> {
		const [links, err] = await this.linkRepo.getAllLinks(email);

		return [links, err];
	}

	async getLinkBySlug(slug: string): Promise<[Link | null, Error | null]> {
		const [link, err] = await this.linkRepo.getLinkBySlug(slug);

		return [link, err];
	}

	async updateLinkBySlug(oldSlug: string, newSlug: string, email: string): Promise<Error | null> {
		let err = await this.linkRepo.verifySlugOwnership(oldSlug, email);
		if (err instanceof Error) {
			return err;
		}

		err = await this.linkRepo.updateLinkBySlug(oldSlug, newSlug);

		return err;
	}
}
