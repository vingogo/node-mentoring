import { Container } from 'inversify';

import { ILogger } from '~common/logger';
import { configureContainer } from '~data-access/startup/inversify';
import { configureSequelize } from '~data-access/startup/sequelize';

export class DALStartup {
    constructor(private readonly logger: ILogger) {}

    async configure(container: Container) {
        const sq = await configureSequelize();
        configureContainer(container, sq);
    }
}
