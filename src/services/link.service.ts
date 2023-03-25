import type { Link, Prisma } from '@prisma/client';
import type { CreateLinkRequest } from '../dto/link.dto';
import type { LinkRepository } from '../repositories';

interface ILinkService {
	createLink(payload: CreateLinkRequest): Promise<[Link, Error | null]>;
}

export default class LinkService implements ILinkService {
	constructor(private readonly linkRepo: LinkRepository) {}

	async createLink(payload: CreateLinkRequest): Promise<[Link, Error | null]> {
		payload.slug = payload.slug ?? crypto.randomUUID().slice(0, 5);

		let newLink: Prisma.LinkCreateInput = {
			link: payload.link,
			slug: payload.slug
		};

		if (payload.email) {
			newLink = {
				...newLink,
				user: {
					connect: {
						email: payload.email
					}
				}
			};
		}

		const [addedLink, err] = await this.linkRepo.createLink(newLink);
		if (err) {
			return [addedLink, err];
		}

		return [addedLink, null];
	}
}
