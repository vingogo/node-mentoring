import { Sequelize } from 'sequelize';

import { initModules } from '~data-access/modules';

import config from '../../config';

export async function configureSequelize() {
    const sq = new Sequelize({
        dialect: 'postgres',
        username: config.db.username,
        password: config.db.password,
        database: config.db.database,
        host: config.db.host
    });

    initModules(sq);

    await sq.authenticate();
    await sq.sync();

    return sq;
}
