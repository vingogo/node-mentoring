import { Application, json } from 'express';

import { loggerInstance } from '~common/logger';

import { appErrorHandler } from '../common/middlewares/handleError';

export function configureExpress(app: Application) {
    app.use(json());
}

export function configureErrors(app: Application) {
    app.use(appErrorHandler);

    process.on('uncaughtException', (err) => {
        loggerInstance.info('uncaughtException');
        loggerInstance.error(err);
    });

    process.on('unhandledRejection', (reason, p) => {
        loggerInstance.info(
            `Unhandled Rejection at: ${p.toString()}, reason: ${reason?.toString()}`
        );
        p.catch(loggerInstance.error);
    });
}
