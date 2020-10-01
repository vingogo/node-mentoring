import { Application, json } from 'express';

import { appErrorHandler } from '../common/middlewares/handleError';

export function configureExpress(app: Application) {
    app.use(json());
}

export function configureErrors(app: Application) {
    app.use(appErrorHandler);
}
