import { Application, json } from 'express';
import { Api } from '../api';
import { Logger } from 'winston';
import { appErrorHandler } from '../common/middlewares/handleError';

export default (app: Application, logger: Logger) => {
    logger.debug('register json bodyParser');
    app.use(json());

    logger.debug('registering api routes');
    app.use('/api', Api.init());

    logger.debug('registering app error handler');
    app.use(appErrorHandler);
};
