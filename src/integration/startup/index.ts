import { Container } from 'inversify';

import { ILogger } from '~common/logger';
import { DALStartup } from '~data-access/startup';
import { configureContainer } from '~integration/startup/inversify';

export class BLStartup {
    constructor(private readonly logger: ILogger) {}

    async configure(container: Container) {
        const dalStartup = new DALStartup(this.logger);
        await dalStartup.configure(container);

        configureContainer(container);
    }
}
