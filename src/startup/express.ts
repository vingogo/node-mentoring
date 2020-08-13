import { Application, json } from 'express';
import { Api } from '../api';
import { Logger } from 'winston';

export default (app: Application, logger: Logger) => {
    logger.info('register json bodyParser');
    app.use(json());

    logger.info('registering api routes');
    app.use('/api', Api.init());
};
