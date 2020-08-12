import { Application, json } from 'express';
import { Api } from '../api';
import logger from './logger';

export default (app: Application) => {
    logger.debug('register json bodyParser');
    app.use(json());

    logger.debug('registering api routes');
    app.use('/api', Api.init());
};
