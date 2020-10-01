import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import { configureDIContainer } from '~api/startup/inversify';
import { loggerInstance } from '~common/logger';
import { BLStartup } from '~integration/startup';

import { configureExpress, configureErrors } from './express';

import '../modules';

export class Startup {
    private static readonly container: Container = new Container();

    public static async configure() {
        await this.configureLayers();
        configureDIContainer(this.container);

        return this.configureServer().build();
    }

    private static configureServer() {
        const server = new InversifyExpressServer(this.container, null, {
            rootPath: '/api'
        });
        server.setConfig(configureExpress);
        server.setErrorConfig(configureErrors);

        return server;
    }

    private static async configureLayers() {
        const blStartup = new BLStartup(loggerInstance);
        await blStartup.configure(this.container);
    }
}
