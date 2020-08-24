import { Sequelize } from 'sequelize';
import { initUserModel } from './users';

export function initModules(sq: Sequelize): void {
    initUserModel(sq);
}

export * from './users';
