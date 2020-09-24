import { Sequelize } from 'sequelize';
import { initModules } from './modules';
import config from '../config';
import { getLogger } from '~common/logger';

export function init(): void {
    const logger = getLogger('Sequelize init');
    const sq = new Sequelize({
        dialect: 'postgres',
        username: config.db.username,
        password: config.db.password,
        database: config.db.database,
        host: config.db.host
    });

    sq.authenticate()
        .then(() => {
            logger.info('authenticate completed');
        })
        .catch(() => {
            logger.error('authenticate error');
        });

    sq.sync();

    initModules(sq);
}
