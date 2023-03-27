import type { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { db } from '$db/prisma';
import type { LinkRepository } from '$repositories';
import LinkRepositoryPostgres from '$repositories/link/linkPostgres.repository';
import type { ILinkService } from '$services/link.service';
import LinkService from '$services/link.service';
import { TYPES } from '$types/inversify.type';

const container = new Container();

container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(db);
container.bind<LinkRepository>(TYPES.LinkRepository).to(LinkRepositoryPostgres);
container.bind<ILinkService>(TYPES.ILinkService).to(LinkService);

export { container };
