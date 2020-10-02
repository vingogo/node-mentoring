import express, { Application } from 'express';
import config from './config';
import { Startup } from './startup';
import { getLogger } from './startup/logger';
import { Server } from 'http';
import { Logger } from 'winston';

class App {
    private readonly app: Application;
    private server: Server | undefined;
    private logger: Logger;

    constructor() {
        this.logger = getLogger('App');
        this.app = express();
        this.configure();
    }

    private configure() {
        Startup.configure(this.app, this.logger);
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

const app = new App();
app.run();
