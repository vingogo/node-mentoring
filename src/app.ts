import 'reflect-metadata';
import { Server } from 'http';

import { Startup } from '~api/startup';
import { loggerInstance } from '~common/logger';

import config from './config';

class App {
    private server: Server | undefined;

    public async run() {
        const application = await Startup.configure();

        this.server = application.listen(config.port, (err) => {
            if (err) {
                loggerInstance.error(err);
                return;
            }
            loggerInstance.info(`Server listening on port: ${config.port}`);
        });
    }
}

const app = new App();

app.run();
