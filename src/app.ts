import express, { Application } from 'express';
import config from './config';
import { Server } from 'http';
import { Logger } from 'winston';
import { Startup } from '~api/startup';
import { getLogger } from '~common/logger';
import { init } from '~data-access/index';

class App {
    private readonly app: Application;
    private server: Server | undefined;

    constructor(private logger: Logger) {
        this.app = express();
        this.configure();
    }

    private configure() {
        Startup.configure(this.app, this.logger);
        init();
    }

    public run() {
        this.server = this.app.listen(config.port, (err) => {
            if (err) {
                this.logger.error(err);
                return;
            }
            this.logger.info(`Server listening on port: ${config.port}`);
        });
    }
}

const app = new App(getLogger('App'));
app.run();
