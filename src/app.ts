import express, { Application } from 'express';
import config from './config';
import { Startup } from './startup';
import logger from './startup/logger';
import { Server } from 'http';

class App {
    private readonly app: Application;
    private server: Server | undefined;

    constructor() {
        this.app = express();
        this.configure();
    }

    private configure() {
        Startup.configure(this.app);
    }

    public run() {
        this.server = this.app.listen(config.port, (err) => {
            if (err) {
                logger.error(err);
                return;
            }
            logger.info(`Server listening on port: ${config.port}`);
        });
    }
}

const app = new App();
app.run();
