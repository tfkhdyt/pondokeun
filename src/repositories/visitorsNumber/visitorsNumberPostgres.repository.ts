import type { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Maybe } from 'true-myth';

import type BaseError from '$exceptions/BaseError';
import InternalServerError from '$exceptions/InternalServerError';
import type { VisitorsNumberRepository } from '$repositories';
import { TYPES } from '$types/inversify.type';

@injectable()
export default class VisitorsNumberPostgresRepository implements VisitorsNumberRepository {
	private db: PrismaClient;

	constructor(@inject(TYPES.PrismaClient) db: PrismaClient) {
		this.db = db;
	}

	async increment(linkId: number): Promise<Maybe<BaseError>> {
		try {
			await this.db.visitorsNumber.upsert({
				where: {
					linkId,
				},
				create: {
					value: 1,
					link: {
						connect: {
							id: linkId,
						},
					},
				},
				update: {
					value: {
						increment: 1,
					},
				},
			});
			return Maybe.nothing();
		} catch (error) {
			console.error({ error });
			return Maybe.just(new InternalServerError('Failed to increment visitors number'));
		}
	}
}
