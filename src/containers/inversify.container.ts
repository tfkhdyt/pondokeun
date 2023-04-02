import 'reflect-metadata';

import type { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { db } from '$db/prisma';
import type { LinkRepository, VisitorsNumberRepository } from '$repositories';
import LinkRepositoryPostgres from '$repositories/link/linkPostgres.repository';
import VisitorsNumberPostgresRepository from '$repositories/visitorsNumber/visitorsNumberPostgres.repository';
import type { ILinkService } from '$services/link.service';
import LinkService from '$services/link.service';
import { TYPES } from '$types/inversify.type';

const container = new Container();

container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(db);
container.bind<LinkRepository>(TYPES.LinkRepository).to(LinkRepositoryPostgres);
container.bind<ILinkService>(TYPES.ILinkService).to(LinkService);
container
	.bind<VisitorsNumberRepository>(TYPES.VisitorsNumberRepository)
	.to(VisitorsNumberPostgresRepository);

export { container };
