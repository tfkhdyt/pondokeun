import type { Link, Prisma } from '@prisma/client';

import type { CreateLinkRequest } from '$dto/link.dto';
import type { LinkRepository } from '$repositories';

interface ILinkService {
	createLink(payload: CreateLinkRequest): Promise<[Link, Error | null]>;
	verifySlugAvailability(slug: string): Promise<Error | null>;
	getAllLinks(email: string): Promise<[Link[], Error | null]>;
}

export default class LinkService implements ILinkService {
	constructor(private readonly linkRepo: LinkRepository) {}

	async createLink(payload: CreateLinkRequest): Promise<[Link, Error | null]> {
		payload.slug = payload.slug ?? crypto.randomUUID().slice(0, 5);

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
}
